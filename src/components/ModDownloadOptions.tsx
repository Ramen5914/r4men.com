"use client";

import React from "react";
import type {
  ChannelKey,
  ChannelVersion,
  ChannelVersions,
} from "@/lib/modManifestSchema";
import { readModManifestForSelection } from "@/lib/readModManifest";

const channelLabels: Record<ChannelKey, string> = {
  releases: "Release",
  betas: "Beta",
  alphas: "Alpha",
};

const badgeStyles: Record<ChannelKey, string> = {
  releases: "bg-[#1bd96a]/20 text-[#1bd96a]",
  betas: "bg-amber-500/20 text-amber-300",
  alphas: "bg-red-500/20 text-red-400",
};

type CompatibleVersion = ChannelVersion & {
  channel: ChannelKey;
};

export default function ModDownloadOptions({
  modId,
  version,
  loader,
  loaderLabel,
}: {
  modId: string;
  version: string;
  loader: string;
  loaderLabel: string;
}): React.ReactNode {
  const [channelVersions, setChannelVersions] =
    React.useState<ChannelVersions | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isContentVisible, setIsContentVisible] = React.useState(false);
  const hasLoadedContent = React.useRef(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  React.useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    void readModManifestForSelection(modId, version, loader)
      .then((result) => {
        if (!isCurrent) return;
        if (!hasLoadedContent.current) setIsContentVisible(false);
        setChannelVersions(result);
        hasLoadedContent.current = true;
        requestAnimationFrame(() => {
          if (isCurrent) setIsContentVisible(true);
        });
      })
      .catch((error) => {
        if (!isCurrent) return;
        console.error("Failed to read mod manifest", error);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [loader, modId, version]);

  const contentTransition = isContentVisible ? "opacity-100" : "opacity-0";

  const versions = channelVersions
    ? (Object.keys(channelLabels) as ChannelKey[]).flatMap((channel) => {
        const newest = channelVersions[channel].reduce<ChannelVersion | null>(
          (latest, item) => {
            if (!latest?.uploadedAt) return item;
            if (!item.uploadedAt) return latest;

            return new Date(item.uploadedAt) > new Date(latest.uploadedAt)
              ? item
              : latest;
          },
          null,
        );

        return newest ? [{ ...newest, channel }] : [];
      })
    : [];

  return (
    <section
      aria-busy={isLoading}
      className={`relative flex flex-col gap-3 transition-[opacity,transform] duration-[1200ms] ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      {versions.length > 0 ? (
        <h2 className="text-lg font-bold">Compatible versions</h2>
      ) : null}
      {!channelVersions && isLoading ? (
        <LoadingVersionCard />
      ) : versions.length === 0 ? (
        <p className="text-fd-muted-foreground text-sm">
          No versions available for {version} and {loaderLabel}
        </p>
      ) : (
        versions.map((item) => (
          <div
            className={`${contentTransition} transition-opacity duration-[900ms] ease-out`}
            key={`${item.channel}-${item.version}`}
          >
            <VersionCard version={item} />
          </div>
        ))
      )}
    </section>
  );
}

function LoadingVersionCard(): React.JSX.Element {
  return (
    <div
      aria-label="Loading compatible versions"
      className="flex h-[98px] items-center gap-3 rounded-2xl border-2 border-dashed p-4"
      role="status"
    >
      <span className="bg-fd-muted size-5 shrink-0 rounded-full" />
      <div className="flex grow flex-col gap-2">
        <span className="bg-fd-muted h-5 w-28 rounded" />
        <span className="bg-fd-muted h-4 w-40 rounded" />
      </div>
    </div>
  );
}

function VersionCard({
  version,
}: {
  version: CompatibleVersion;
}): React.JSX.Element {
  const [isDatePopoverVisible, setIsDatePopoverVisible] = React.useState(false);
  const [datePopoverPosition, setDatePopoverPosition] = React.useState<{
    left: number;
    pointerLeft: number;
  } | null>(null);
  const dateButtonRef = React.useRef<HTMLButtonElement>(null);
  const datePopoverRef = React.useRef<HTMLSpanElement>(null);
  const datePopoverTimeoutRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const showDatePopover = () => {
    if (datePopoverTimeoutRef.current) {
      clearTimeout(datePopoverTimeoutRef.current);
    }

    datePopoverTimeoutRef.current = setTimeout(() => {
      setIsDatePopoverVisible(true);
      datePopoverTimeoutRef.current = null;
    }, 500);
  };

  const hideDatePopover = () => {
    if (datePopoverTimeoutRef.current) {
      clearTimeout(datePopoverTimeoutRef.current);
      datePopoverTimeoutRef.current = null;
    }

    setIsDatePopoverVisible(false);
  };

  React.useLayoutEffect(() => {
    if (!isDatePopoverVisible) return;

    const updateDatePopoverPosition = () => {
      const button = dateButtonRef.current;
      const popover = datePopoverRef.current;
      const modal = button?.closest<HTMLElement>('[role="dialog"]');
      if (!button || !popover || !modal) return;

      const buttonRect = button.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();
      const minimumEdgePadding = 8;
      const buttonCenter = buttonRect.left + buttonRect.width / 2;
      const minimumLeft = modalRect.left + minimumEdgePadding;
      const maximumLeft =
        modalRect.right - minimumEdgePadding - popoverRect.width;
      const popoverLeft = Math.min(
        Math.max(buttonCenter - popoverRect.width / 2, minimumLeft),
        maximumLeft,
      );

      setDatePopoverPosition({
        left: popoverLeft - buttonRect.left,
        pointerLeft: buttonCenter - popoverLeft,
      });
    };

    updateDatePopoverPosition();
    window.addEventListener("resize", updateDatePopoverPosition);

    return () =>
      window.removeEventListener("resize", updateDatePopoverPosition);
  }, [isDatePopoverVisible]);

  return (
    <article className="bg-fd-muted border-fd-border flex items-center rounded-2xl border p-4">
      <div className="min-w-0 grow">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="text-base">{version.version}</strong>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyles[version.channel]}`}
          >
            {channelLabels[version.channel]}
          </span>
        </div>
        <div className="text-fd-muted-foreground mt-1 text-sm">
          <button
            type="button"
            ref={dateButtonRef}
            className="relative inline-block cursor-help border-0 bg-transparent p-0 text-inherit"
            onBlur={hideDatePopover}
            onFocus={showDatePopover}
            onMouseEnter={showDatePopover}
            onMouseLeave={hideDatePopover}
          >
            {formatUploadedAt(version.uploadedAt)}
            <span
              ref={datePopoverRef}
              style={
                datePopoverPosition
                  ? {
                      left: `${datePopoverPosition.left}px`,
                    }
                  : { left: "0px" }
              }
              className={`bg-fd-card text-fd-foreground border-fd-border pointer-events-none absolute bottom-full z-10 mb-2 rounded-lg border px-2 py-1 text-sm whitespace-nowrap shadow-lg ${
                isDatePopoverVisible ? "block" : "hidden"
              }`}
            >
              {formatAbsoluteDate(version.uploadedAt)}
              <span
                className="bg-fd-card border-fd-border absolute top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b"
                style={{
                  left: datePopoverPosition
                    ? `${datePopoverPosition.pointerLeft}px`
                    : "50%",
                }}
              />
            </span>
          </button>
          {version.size === undefined ? null : (
            <>
              <span
                className="text-fd-muted-foreground/40 mx-1"
                aria-hidden="true"
              >
                •
              </span>
              {formatBytes(version.size)}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function formatUploadedAt(uploadedAt: string | undefined): string {
  if (!uploadedAt) return "Date unavailable";

  const timestamp = new Date(uploadedAt).getTime();
  if (Number.isNaN(timestamp)) return "Date unavailable";

  const elapsedSeconds = Math.round((timestamp - Date.now()) / 1000);
  const units: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let value = elapsedSeconds;
  let unit: Intl.RelativeTimeFormatUnit = "second";
  for (const [threshold, nextUnit] of units) {
    unit = nextUnit;
    if (Math.abs(value) < threshold) break;
    value /= threshold;
  }

  return new Intl.RelativeTimeFormat(undefined, { numeric: "auto" }).format(
    Math.round(value),
    unit,
  );
}

function formatAbsoluteDate(uploadedAt: string | undefined): string {
  if (!uploadedAt) return "Date unavailable";

  const date = new Date(uploadedAt);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const formattedValue =
    unitIndex === 0 ? value.toString() : value.toFixed(2).replace(/\.?0+$/, "");

  return `${formattedValue} ${units[unitIndex]}`;
}
