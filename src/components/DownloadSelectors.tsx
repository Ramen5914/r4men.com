"use client";

import { Combobox, Select } from "@base-ui/react";
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import React from "react";
import ModDownloadOptions from "./ModDownloadOptions";

type SelectOption = {
  label: string;
  value: string;
};

export function DownloadSelectors({
  modId,
  modName,
  mcVersions,
  modLoaders,
  supportedLoadersByVersion,
  supportedVersionsByLoader,
}: {
  modId: string;
  modName: string;
  mcVersions: SelectOption[];
  modLoaders: SelectOption[];
  supportedLoadersByVersion: Record<string, string[]>;
  supportedVersionsByLoader: Record<string, string[]>;
}): React.JSX.Element {
  const [selectedVersion, setSelectedVersion] = React.useState(
    mcVersions.length === 1 ? mcVersions[0].value : "",
  );
  const [selectedLoader, setSelectedLoader] = React.useState(
    modLoaders.length === 1 ? modLoaders[0].value : "",
  );

  const hasCompleteSelection = selectedVersion !== "" && selectedLoader !== "";
  const selectedLoaderLabel =
    modLoaders.find((loader) => loader.value === selectedLoader)?.label ??
    selectedLoader;

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
    const compatibleLoaders = supportedLoadersByVersion[version] ?? [];
    if (!selectedLoader && compatibleLoaders.length === 1) {
      setSelectedLoader(compatibleLoaders[0]);
    }
  };

  const handleLoaderChange = (loader: string) => {
    setSelectedLoader(loader);
    const compatibleVersions = supportedVersionsByLoader[loader] ?? [];
    if (!selectedVersion && compatibleVersions.length === 1) {
      setSelectedVersion(compatibleVersions[0]);
    }
  };

  return (
    <>
      <div className={"flex w-full gap-2 max-sm:flex-wrap"}>
        <SearchableSelectBox
          list={mcVersions}
          placeholder="Select game version"
          value={selectedVersion}
          onValueChange={handleVersionChange}
          modName={modName}
          selectedLoader={selectedLoader}
          supportedValues={supportedVersionsByLoader}
        />
        <SelectBox
          list={modLoaders}
          placeholder="Select platform"
          value={selectedLoader}
          onValueChange={handleLoaderChange}
          modName={modName}
          selectedVersion={selectedVersion}
          supportedValues={supportedLoadersByVersion}
        />
      </div>
      {hasCompleteSelection && (
        <ModDownloadOptions
          modId={modId}
          version={selectedVersion}
          loader={selectedLoader}
          loaderLabel={selectedLoaderLabel}
        />
      )}
    </>
  );
}

function SelectBox({
  list,
  placeholder,
  value,
  onValueChange,
  modName,
  selectedVersion,
  supportedValues,
}: {
  list: SelectOption[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  modName: string;
  selectedVersion: string;
  supportedValues: Record<string, string[]>;
}): React.JSX.Element {
  const isUnsupported =
    selectedVersion !== "" &&
    !supportedValues[selectedVersion]?.includes(value);
  const warning = isUnsupported
    ? `${modName} does not support ${value} for ${selectedVersion}`
    : undefined;

  return (
    <div className={"relative inline-block w-full"}>
      <Select.Root
        items={list}
        value={value || null}
        onValueChange={(value) => onValueChange(value ?? "")}
      >
        <Select.Trigger
          title={warning}
          className="bg-fd-muted text-fd-foreground focus-visible:border-fd-primary border-fd-border focus-visible:ring-fd-primary/40 flex h-12 w-full min-w-40 items-center justify-between gap-3 rounded-2xl border px-4 text-base leading-none font-normal whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2"
        >
          <Select.Value
            className="data-placeholder:text-fd-muted-foreground"
            placeholder={value ? undefined : placeholder}
          />
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
            <Select.Popup className="bg-fd-muted text-fd-foreground group border-fd-border min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-2xl border bg-clip-padding shadow-lg outline-hidden transition-[scale,opacity] duration-200 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1.75rem)] data-[side=none]:translate-y-px data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none">
              <Select.ScrollUpArrow className="top-0 z-51 flex h-4 w-full cursor-default items-center justify-center text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] dark:bg-neutral-950">
                <ChevronUpIcon />
              </Select.ScrollUpArrow>
              <Select.List className="relative max-h-(--available-height) scroll-py-6 overflow-y-auto">
                {list.map(({ label, value: itemValue }) => (
                  <Select.Item
                    key={itemValue}
                    value={itemValue}
                    title={
                      selectedVersion &&
                      !supportedValues[selectedVersion]?.includes(itemValue)
                        ? `${modName} does not support ${label} for ${selectedVersion}`
                        : undefined
                    }
                    className={`data-selected:bg-fd-primary/20 data-selected:text-fd-primary data-highlighted:bg-fd-accent data-highlighted:text-fd-accent-foreground flex cursor-default items-center justify-between gap-3 px-3 py-3 text-base outline-hidden transition-colors duration-150 select-none first:rounded-t-2xl last:rounded-b-2xl ${
                      selectedVersion &&
                      !supportedValues[selectedVersion]?.includes(itemValue)
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                    {selectedVersion !== "" &&
                    itemValue === value &&
                    !supportedValues[selectedVersion]?.includes(itemValue) ? (
                      <AlertTriangleIcon
                        aria-hidden="true"
                        className="text-red-500"
                        size={18}
                      />
                    ) : null}
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

function SearchableSelectBox({
  list,
  placeholder,
  value,
  onValueChange,
  modName,
  selectedLoader,
  supportedValues,
}: {
  list: SelectOption[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  modName: string;
  selectedLoader: string;
  supportedValues: Record<string, string[]>;
}): React.JSX.Element {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const filteredList = query
    ? list.filter(({ label, value }) =>
        `${label} ${value}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
      )
    : list;
  const isUnsupported =
    selectedLoader !== "" && !supportedValues[selectedLoader]?.includes(value);
  const warning = isUnsupported
    ? `${modName} does not support ${selectedLoader} for ${value}`
    : undefined;

  return (
    <div className={"relative inline-block w-full"}>
      <Combobox.Root
        items={list.map((item) => item.value)}
        value={value || null}
        onValueChange={(nextValue) => onValueChange(nextValue ?? "")}
        filteredItems={filteredList.map((item) => item.value)}
        filter={null}
        onInputValueChange={setQuery}
        onOpenChange={(open) => {
          if (open) setQuery("");
        }}
        autoHighlight
      >
        <Combobox.InputGroup className="relative w-full">
          <Combobox.Input
            ref={inputRef}
            placeholder={placeholder}
            title={warning}
            onFocus={(event) => event.currentTarget.select()}
            onClick={(event) => event.currentTarget.select()}
            className="bg-fd-muted text-fd-foreground focus-visible:border-fd-primary border-fd-border focus-visible:ring-fd-primary/40 flex h-12 w-full min-w-40 items-center justify-between gap-3 rounded-2xl border px-4 pr-20 text-base leading-none font-normal whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2"
          />
          <Combobox.Icon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
            <ChevronDownIcon />
          </Combobox.Icon>
        </Combobox.InputGroup>
        <Combobox.Portal>
          <Combobox.Positioner
            className="z-50 outline-hidden select-none"
            sideOffset={4}
          >
            <Combobox.Popup className="bg-fd-muted text-fd-foreground group border-fd-border min-h-0 min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-2xl border bg-clip-padding shadow-lg outline-hidden transition-[scale,opacity] duration-200 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
              <Combobox.List className="relative h-auto max-h-60 min-h-0 scroll-py-6 overflow-y-auto">
                {filteredList.map(({ label, value: itemValue }) => (
                  <Combobox.Item
                    key={itemValue}
                    value={itemValue}
                    title={
                      selectedLoader &&
                      !supportedValues[selectedLoader]?.includes(itemValue)
                        ? `${modName} does not support ${selectedLoader} for ${itemValue}`
                        : undefined
                    }
                    className={`data-selected:bg-fd-primary/20 data-selected:text-fd-primary data-highlighted:bg-fd-accent data-highlighted:text-fd-accent-foreground flex cursor-default items-center justify-between gap-3 px-3 py-3 text-base outline-hidden transition-colors duration-150 select-none first:rounded-t-2xl last:rounded-b-2xl ${
                      selectedLoader &&
                      !supportedValues[selectedLoader]?.includes(itemValue)
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {label}
                    {selectedLoader !== "" &&
                    itemValue === value &&
                    !supportedValues[selectedLoader]?.includes(itemValue) ? (
                      <AlertTriangleIcon
                        aria-hidden="true"
                        className="text-red-500"
                        size={18}
                      />
                    ) : null}
                  </Combobox.Item>
                ))}
              </Combobox.List>
              {filteredList.length === 0 ? (
                <div className="text-fd-muted-foreground px-3 py-3 text-center text-sm">
                  No game versions found
                </div>
              ) : null}
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </div>
  );
}
