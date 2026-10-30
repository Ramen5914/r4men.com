import { Dialog } from "@base-ui/react/dialog";
import { DownloadIcon, XIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { userAgentFromString } from "next/server";
import { coerce, rcompare } from "semver";
import AnimatedDownloadModalContent from "@/components/AnimatedDownloadModalContent";
import { DownloadSelectors } from "@/components/DownloadSelectors";
import { ModInstallButtons } from "@/components/ModInstallButtons";
import { readModManifest } from "@/lib/readModManifest";

export default async function DownloadModal({
  modId,
  modName,
  curseforgeId,
  modrinthId,
}: {
  modId: string;
  modName: string;
  curseforgeId?: number;
  modrinthId?: string;
}) {
  const headerList = await headers();
  const ua = headerList.get("user-agent") ?? "";

  const { device } = userAgentFromString(ua);

  const _deviceType = device.type ?? "desktop";
  const isMobile = device.type === "mobile";
  const isTablet = device.type === "tablet";

  const manifest = await readModManifest(modId);
  const mcVersions = Object.keys(manifest.versions)
    .sort((a, b) => {
      const aVersion = coerce(a);
      const bVersion = coerce(b);

      if (aVersion && bVersion) return rcompare(aVersion, bVersion);
      if (aVersion) return -1;
      if (bVersion) return 1;
      return b.localeCompare(a, undefined, { numeric: true });
    })
    .map((version) => ({
      label: version,
      value: version,
    }));
  const modLoaders = [
    ...new Set(
      Object.values(manifest.versions).flatMap((loaders) =>
        Object.keys(loaders),
      ),
    ),
  ].map((loader) => ({
    label: loader
      .split(/[-_ ]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    value: loader,
  }));
  const supportedLoadersByVersion = Object.fromEntries(
    Object.entries(manifest.versions).map(([version, loaders]) => [
      version,
      Object.keys(loaders),
    ]),
  );
  const supportedVersionsByLoader: Record<string, string[]> = {};
  for (const [version, loaders] of Object.entries(manifest.versions)) {
    for (const loader of Object.keys(loaders)) {
      supportedVersionsByLoader[loader] ??= [];
      supportedVersionsByLoader[loader].push(version);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-fd-card text-fd-card-foreground hover:bg-fd-accent/80 flex items-center justify-center gap-2 rounded-xl border p-4 text-sm leading-none font-normal whitespace-nowrap transition-colors select-none">
        <div
          className={
            "bg-fd-muted text-fd-muted-foreground w-fit rounded-lg border p-1.5 shadow-md"
          }
        >
          <DownloadIcon className={"text-fd-primary size-4"} />
        </div>
        <span className={"text-sm font-medium"}>Download</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-20 min-h-dvh bg-black/20 backdrop-blur-xs transition-[opacity,backdrop-filter] duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:bg-black/40" />
        <Dialog.Popup className="bg-fd-card fixed top-1/2 left-1/2 z-20 -mt-8 flex w-full max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border transition-[scale,opacity] duration-300 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 md:w-auto">
          <div className={"flex flex-row justify-between gap-4 border-b p-6"}>
            <div className={"flex flex-row items-center gap-3"}>
              <Image
                className={"rounded-sm"}
                src={`https://cdn.ramen.games/mods/${modId}/mod-icon.png`}
                alt={`${modName} icon`}
                height={32}
                width={32}
              />
              <Dialog.Title
                className={"font-extrabold md:text-lg"}
              >{`Download ${modName}`}</Dialog.Title>
            </div>
            <div>
              <Dialog.Close className="bg-fd-muted hover:bg-fd-accent/80 gap-2 rounded-full border p-2 transition-colors select-none">
                <XIcon className={"size-5 stroke-[2.5]"} />
              </Dialog.Close>
            </div>
          </div>
          <AnimatedDownloadModalContent>
            <div
              className={
                "min-h-0 [scrollbar-width:none] overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden"
              }
            >
              <div className={"mx-auto flex w-full flex-col gap-4"}>
                {isMobile || isTablet ? null : (
                  <>
                    <ModInstallButtons
                      curseforgeId={curseforgeId}
                      modrinthId={modrinthId}
                    />
                    <div className={"flex items-center gap-4"}>
                      <div
                        className={
                          "bg-fd-border flex h-0.5 w-full grow rounded-2xl"
                        }
                      ></div>
                      <span
                        className={
                          "text-fd-muted-foreground shrink-0 text-sm font-medium"
                        }
                      >
                        <Dialog.Description>
                          Download manually
                        </Dialog.Description>
                      </span>
                      <div
                        className={
                          "bg-fd-border flex h-0.5 w-full grow rounded-2xl"
                        }
                      ></div>
                    </div>
                  </>
                )}
                <DownloadSelectors
                  modId={modId}
                  modName={modName}
                  mcVersions={mcVersions}
                  modLoaders={modLoaders}
                  supportedLoadersByVersion={supportedLoadersByVersion}
                  supportedVersionsByLoader={supportedVersionsByLoader}
                />
              </div>
            </div>
          </AnimatedDownloadModalContent>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
