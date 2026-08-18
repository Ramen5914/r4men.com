import Image from "next/image";
import Link from "next/link";

export default function ModCard({
  name,
  location,
}: {
  name: string;
  location: string;
}) {
  const iconSize = 96;

  return (
    <Link href={`/mods/${location}`}>
      <div
        className={"min-h-32 border-2 rounded-4xl flex-row flex p-4 space-x-4"}
      >
        <div className="flex flex-col">
          <Image
            src={`/mods/${location}/mod-icon.png`}
            alt={"Mod icon"}
            width={iconSize}
            height={iconSize}
            className="rounded-2xl"
            loading="eager"
          />
        </div>
        <div className="w-0.5 bg-fd-border" />
        <div className="flex flex-col grow">
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  );
}
