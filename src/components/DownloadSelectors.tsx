"use client";

import { Select } from "@base-ui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React from "react";

type SelectOption = {
  label: string;
  value: string;
};

export function DownloadSelectors({
  mcVersions,
  modLoaders,
}: {
  mcVersions: SelectOption[];
  modLoaders: SelectOption[];
}): React.JSX.Element {
  const [selectedVersion, setSelectedVersion] = React.useState(
    mcVersions.length === 1 ? mcVersions[0].value : "",
  );
  const [selectedLoader, setSelectedLoader] = React.useState(
    modLoaders.length === 1 ? modLoaders[0].value : "",
  );

  const hasCompleteSelection = selectedVersion !== "" && selectedLoader !== "";

  return (
    <>
      <div className={"flex w-full gap-2 max-sm:flex-wrap"}>
        <SelectBox
          title={"Minecraft Version:"}
          list={mcVersions}
          placeholder="Select game version"
          value={selectedVersion}
          onValueChange={setSelectedVersion}
        />
        <SelectBox
          title={"Mod Loader:"}
          list={modLoaders}
          placeholder="Select platform"
          value={selectedLoader}
          onValueChange={setSelectedLoader}
        />
      </div>
      {hasCompleteSelection && (
        <div className="rounded border p-4">
          Both selections have been chosen.
        </div>
      )}
    </>
  );
}

function SelectBox({
  list,
  title,
  placeholder,
  value,
  onValueChange,
}: {
  title: string;
  list: SelectOption[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
}): React.JSX.Element {
  return (
    <div className={"relative inline-block w-full"}>
      <Select.Root
        items={list}
        value={value || null}
        onValueChange={(value) => onValueChange(value ?? "")}
      >
        <Select.Label className="cursor-default text-sm font-bold">
          {title}
        </Select.Label>
        <Select.Trigger className="flex h-8 w-full min-w-40 items-center justify-between gap-3 border pr-1 pl-2 text-sm leading-none font-normal whitespace-nowrap select-none">
          <Select.Value placeholder={value ? undefined : placeholder} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            className="z-50 outline-hidden select-none"
            sideOffset={4}
            alignItemWithTrigger={false}
          >
            <Select.Popup className="group min-w-(--anchor-width) origin-(--transform-origin) border bg-clip-padding shadow-[0.25rem_0.25rem_0] shadow-black/12 outline-hidden transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] data-[side=none]:translate-y-px data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none dark:border-white dark:bg-neutral-950 dark:text-white dark:shadow-none">
              <Select.ScrollUpArrow className="top-0 z-51 flex h-4 w-full cursor-default items-center justify-center text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950">
                <ChevronUpIcon />
              </Select.ScrollUpArrow>
              <Select.List className="relative max-h-(--available-height) scroll-py-6 overflow-y-auto py-1">
                {list.map(({ label, value }) => (
                  <Select.Item
                    key={label}
                    value={value}
                    className="grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-4 pl-2.5 text-sm outline-hidden select-none data-highlighted:bg-neutral-950 data-highlighted:text-white dark:data-highlighted:bg-white dark:data-highlighted:text-neutral-950"
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
              <Select.ScrollDownArrow className="bottom-0 z-51 flex h-4 w-full items-center justify-center bg-white text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-bottom-full dark:bg-neutral-950">
                <ChevronDownIcon />
              </Select.ScrollDownArrow>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
