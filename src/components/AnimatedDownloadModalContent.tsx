"use client";

import React from "react";

export default function AnimatedDownloadModalContent({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>();

  React.useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const updateHeight = () => setHeight(element.scrollHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="overflow-hidden transition-[height] duration-400 ease-out"
      style={{ height }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
