import { Dialog } from "@base-ui/react/dialog";
import { DownloadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { ModInstallButtons } from "@/components/ModInstallButtons";

export default function DownloadModal({
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
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex items-center justify-center gap-2 border rounded-xl transition-colors bg-fd-card hover:bg-fd-accent/80 text-fd-card-foreground p-4 text-sm leading-none whitespace-nowrap font-normal select-none">
        <div
          className={
            "w-fit shadow-md rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground"
          }
        >
          <DownloadIcon className={"text-fd-primary size-4"} />
        </div>
        <span className={"text-sm font-medium"}>Download</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="z-100 fixed inset-0 min-h-dvh bg-black/20 dark:bg-black/40 backdrop-blur-xs transition-[opacity,backdrop-filter] duration-150 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Popup className="z-101 fixed top-1/2 left-1/2 rounded-2xl -mt-8 flex max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col bg-fd-card border transition-[scale,opacity] duration-100 ease-out">
          <div className={"flex flex-row p-6 justify-between border-b"}>
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
            <Dialog.Close className="rounded-full p-2 gap-2 border bg-fd-muted transition-colors hover:bg-fd-accent/80 select-none">
              <XIcon className={"size-5 stroke-[2.5]"} />
            </Dialog.Close>
          </div>
          <div className={"min-h-0 overflow-y-auto p-6"}>
            <div className={"mx-auto flex w-full flex-col gap-4"}>
              <ModInstallButtons
                curseforgeId={curseforgeId}
                modrinthId={modrinthId}
              />
              <div className={"flex items-center gap-4"}>
                <div
                  className={"flex grow h-0.5 rounded-2xl bg-fd-border w-full"}
                ></div>
                <span
                  className={
                    "shrink-0 text-sm font-medium text-fd-muted-foreground"
                  }
                >
                  Download manually
                </span>
                <div
                  className={"flex grow h-0.5 rounded-2xl bg-fd-border w-full"}
                ></div>
              </div>
            </div>
          </div>
          <div className={"relative"}>
            <div className="flex flex-col gap-1">
              <Dialog.Title className="text-base font-bold">Test</Dialog.Title>
              <Dialog.Description className="text-sm">
                Paragraph
              </Dialog.Description>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
