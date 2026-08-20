import { Dialog } from "@base-ui/react/dialog";
import {DownloadIcon} from "lucide-react";

export default function DownloadModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex items-center justify-center gap-2 border rounded-xl transition-colors bg-fd-card hover:bg-fd-accent/80 text-fd-card-foreground p-4 text-sm leading-none whitespace-nowrap font-normal select-none">
        <div className={"w-fit shadow-md rounded-lg border bg-fd-muted p-1.5 text-fd-muted-foreground"}>
          <DownloadIcon className={"text-fd-primary size-4"}/>
        </div>
        <span className={"text-sm font-medium"}>
          Download
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className="
    z-100 fixed inset-0 min-h-dvh
    bg-black/20 dark:bg-black/40
    backdrop-blur-xs
    transition-[opacity,backdrop-filter]
    duration-150
    data-ending-style:opacity-0
    data-starting-style:opacity-0
    supports-[-webkit-touch-callout:none]:absolute
  "
        />
        <Dialog.Popup className="z-101 fixed top-1/2 left-1/2 -mt-8 flex w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-white dark:bg-neutral-950 p-4 text-neutral-950 dark:text-white border border-neutral-950 dark:border-white shadow-[0.25rem_0.25rem_0] shadow-black/12 dark:shadow-none transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
          <div className="flex flex-col gap-1">
            <Dialog.Title className="text-base font-bold">
              Test
            </Dialog.Title>
            <Dialog.Description className="text-sm text-neutral-600 dark:text-neutral-400">
              Paragraph
            </Dialog.Description>
          </div>
          <div className="flex justify-end gap-3">
            <Dialog.Close className="flex h-8 items-center justify-center gap-2 border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 px-3 text-sm leading-none whitespace-nowrap font-normal text-neutral-950 dark:text-white select-none hover:not-data-disabled:bg-neutral-100 dark:hover:not-data-disabled:bg-neutral-800 active:not-data-disabled:bg-neutral-200 dark:active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 dark:data-disabled:border-neutral-400 dark:data-disabled:text-neutral-400 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
