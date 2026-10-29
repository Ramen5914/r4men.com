import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { rcompare, valid } from "semver";

import {
  type ManifestEvent,
  manifestEventSchema,
} from "./modManifestEventSchema";
import {
  type ChannelKey,
  type ModManifest,
  modManifestSchema,
} from "./modManifestSchema";

const globalState = globalThis as typeof globalThis & {
  modManifestUpdateQueue?: Promise<void>;
};

const channelToKey: Record<ManifestEvent["channel"], ChannelKey> = {
  alpha: "alphas",
  beta: "betas",
  release: "releases",
};

function serialize<T>(task: () => Promise<T>): Promise<T> {
  const previous = globalState.modManifestUpdateQueue ?? Promise.resolve();

  const current = previous.then(task);

  globalState.modManifestUpdateQueue = current.then(
    () => undefined,
    () => undefined,
  );

  return current;
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

function newestFirst(a: string, b: string): number {
  if (valid(a) && valid(b)) {
    return rcompare(a, b) || a.localeCompare(b);
  }

  return b.localeCompare(a, undefined, {
    numeric: true,
  });
}

async function readManifest(filePath: string): Promise<ModManifest> {
  let contents: string;

  try {
    contents = await readFile(filePath, "utf8");
  } catch (error) {
    if (!isMissingFile(error)) {
      throw error;
    }

    return {
      schemaVersion: 1,
      lastUpdated: new Date().toISOString(),
      versions: {},
    };
  }

  // Do not silently replace an existing malformed manifest.
  return modManifestSchema.parse(JSON.parse(contents));
}

async function saveManifest(
  filePath: string,
  manifest: ModManifest,
): Promise<void> {
  const validated = modManifestSchema.parse(manifest);

  await mkdir(path.dirname(filePath), {
    recursive: true,
  });

  const temporaryPath = `${filePath}.${randomUUID()}.tmp`;

  try {
    await writeFile(temporaryPath, `${JSON.stringify(validated, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
    });

    await rename(temporaryPath, filePath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
}

export function updateModManifest(directory: string, input: ManifestEvent) {
  // Validate here too, since the mod name becomes a path segment.
  const event = manifestEventSchema.parse(input);

  return serialize(async () => {
    const filePath = path.resolve(directory, event.mod, "manifest.json");

    const manifest = await readManifest(filePath);
    const channel = channelToKey[event.channel];

    if (event.operation === "upsert") {
      manifest.versions[event.minecraftVersion] ??= {};
      const loaders = manifest.versions[event.minecraftVersion];

      loaders[event.loader] ??= {
        alphas: [],
        betas: [],
        releases: [],
      };
      const channels = loaders[event.loader];

      channels[channel] = [
        ...new Set([...channels[channel], event.version]),
      ].sort(newestFirst);
    } else {
      const loaders = manifest.versions[event.minecraftVersion];

      const channels = loaders?.[event.loader];

      if (channels) {
        channels[channel] = channels[channel].filter(
          (version) => version !== event.version,
        );

        const hasVersions =
          channels.alphas.length > 0 ||
          channels.betas.length > 0 ||
          channels.releases.length > 0;

        if (!hasVersions) {
          delete loaders[event.loader];
        }

        if (Object.keys(loaders).length === 0) {
          delete manifest.versions[event.minecraftVersion];
        }
      }
    }

    manifest.lastUpdated = new Date().toISOString();

    await saveManifest(filePath, manifest);

    return {
      mod: event.mod,
      lastUpdated: manifest.lastUpdated,
    };
  });
}
