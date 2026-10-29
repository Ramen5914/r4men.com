import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  type ModManifest,
  modManifestSchema,
  modNameSchema,
} from "./modManifestSchema";

export async function readModManifest(mod: string): Promise<ModManifest> {
  const validatedMod = modNameSchema.parse(mod);

  const directory = process.env.MOD_MANIFEST_DIRECTORY;

  if (!directory) {
    throw new Error("MOD_MANIFEST_DIRECTORY is not configured");
  }

  const filePath = path.resolve(directory, validatedMod, "manifest.json");

  const contents = await readFile(filePath, "utf8");

  return modManifestSchema.parse(JSON.parse(contents));
}
