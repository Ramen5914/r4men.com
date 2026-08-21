import { Dialog } from "@base-ui/react/dialog";
import { DownloadIcon, XIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { userAgentFromString } from "next/server";
import { ModInstallButtons } from "@/components/ModInstallButtons";

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

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl border bg-fd-card p-4 font-normal text-fd-card-foreground text-sm leading-none transition-colors hover:bg-fd-accent/80">
        <div
          className={
            "w-fit rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground shadow-md"
          }
        >
          <DownloadIcon className={"size-4 text-fd-primary"} />
        </div>
        <span className={"font-medium text-sm"}>Download</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-100 min-h-dvh bg-black/20 backdrop-blur-xs transition-[opacity,backdrop-filter] duration-150 supports-[-webkit-touch-callout:none]:absolute dark:bg-black/40" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-101 -mt-8 flex max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border bg-fd-card transition-[scale,opacity] duration-100 ease-out">
          <div className={"flex flex-row justify-between gap-4 border-b p-6"}>
            <div className={"flex flex-row items-center gap-3"}>
              <Image
                className={"rounded-sm"}
                src={`/mods/${modId}/mod-icon.png`}
                alt={`${modName} icon`}
                height={32}
                width={32}
              />
              <Dialog.Title
                className={"font-extrabold text-lg"}
              >{`Download ${modName}`}</Dialog.Title>
            </div>
            <div>
              <Dialog.Close className="select-none gap-2 rounded-full border bg-fd-muted p-2 transition-colors hover:bg-fd-accent/80">
                <XIcon className={"size-5 stroke-[2.5]"} />
              </Dialog.Close>
            </div>
          </div>
          <div className={"min-h-0 overflow-y-auto p-6"}>
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
                        "flex h-0.5 w-full grow rounded-2xl bg-fd-border"
                      }
                    ></div>
                    <span
                      className={
                        "shrink-0 font-medium text-fd-muted-foreground text-sm"
                      }
                    >
                      <Dialog.Description>Download manually</Dialog.Description>
                    </span>
                    <div
                      className={
                        "flex h-0.5 w-full grow rounded-2xl bg-fd-border"
                      }
                    ></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
