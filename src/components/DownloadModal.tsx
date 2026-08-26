import { Select } from "@base-ui/react";
import { Dialog } from "@base-ui/react/dialog";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { userAgentFromString } from "next/server";
import type React from "react";
import { ModInstallButtons } from "@/components/ModInstallButtons";

export default async function DownloadModal({
  modId,
  modName,
  curseforgeId,
  modrinthId,
  mcVersions,
  modLoaders,
}: {
  modId: string;
  modName: string;
  curseforgeId?: number;
  modrinthId?: string;
  mcVersions: { label: string; value: string }[];
  modLoaders: { label: string; value: string }[];
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
        <Dialog.Backdrop className="fixed inset-0 z-20 min-h-dvh bg-black/20 backdrop-blur-xs transition-[opacity,backdrop-filter] duration-150 supports-[-webkit-touch-callout:none]:absolute dark:bg-black/40" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-20 -mt-8 flex w-full max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border bg-fd-card transition-[scale,opacity] duration-100 ease-out md:w-auto">
          <div className={"flex flex-row justify-between gap-4 border-b p-6"}>
            <div className={"flex flex-row items-center gap-3"}>
              <Image
                className={"rounded-sm"}
                src={`https://cdn.r4men.com/mods/${modId}/mod-icon.png`}
                alt={`${modName} icon`}
                height={32}
                width={32}
              />
              <Dialog.Title
                className={"font-extrabold md:text-lg"}
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
              <div className={"flex w-full gap-2 max-sm:flex-wrap"}>
                <SelectBox title={"Minecraft Version:"} list={mcVersions} />
                <SelectBox title={"Mod Loader:"} list={modLoaders} />
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SelectBox({
  list,
  title,
}: {
  title: string;
  list: { label: string; value: string }[];
}): React.JSX.Element {
  return (
    <div className={"relative inline-block w-full"}>
      <Select.Root items={list} defaultValue={list[0].value ?? ""}>
        <Select.Label className="cursor-default font-bold text-sm">
          {title}
        </Select.Label>
        <Select.Trigger className="flex h-8 w-full min-w-40 select-none items-center justify-between gap-3 whitespace-nowrap border pr-1 pl-2 font-normal text-sm leading-none">
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            className="z-50 select-none outline-hidden"
            sideOffset={4}
            alignItemWithTrigger={false}
          >
            <Select.Popup className="group min-w-(--anchor-width) origin-(--transform-origin) border bg-clip-padding shadow-[0.25rem_0.25rem_0] shadow-black/12 outline-hidden transition-[scale,opacity] duration-100 ease-out data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:transition-none data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] data-[side=none]:translate-y-px data-ending-style:scale-[0.98] data-starting-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:opacity-0 dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none">
              <Select.ScrollUpArrow className="top-0 z-51 flex h-4 w-full cursor-default items-center justify-center text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950">
                <ChevronUpIcon />
              </Select.ScrollUpArrow>
              <Select.List className="relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1">
                {list.map(({ label, value }) => (
                  <Select.Item
                    key={label}
                    value={value}
                    className="grid cursor-default select-none grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden data-highlighted:bg-neutral-950 data-highlighted:text-white dark:data-highlighted:bg-white dark:data-highlighted:text-neutral-950"
                  >
                    <Select.ItemIndicator className="col-start-1">
                      <CheckIcon />
                    </Select.ItemIndicator>
                    <Select.ItemText className="col-start-2">
                      {label}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
              <Select.ScrollDownArrow className="bottom-0 z-51 flex h-4 w-full cursor-default items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%] dark:bg-neutral-950">
                <ChevronDownIcon />
              </Select.ScrollDownArrow>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
