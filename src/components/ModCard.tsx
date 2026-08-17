import Image from "next/image";
import Link from "next/link";

export default function ModCard({
  name,
  iconLink,
}: {
  name: string;
  iconLink: string;
}) {
  const iconSize = 48;

  return (
    <Link href="/mods/game-knight">
      <div
        className={
          "min-h-32 border-gray-850 border-2 rounded-[40px] flex-row flex p-4"
        }
      >
        <div>
          <Image
            src={iconLink}
            alt={"Mod icon"}
            width={iconSize}
            height={iconSize}
            className="rounded-full"
            loading="eager"
          />
        </div>
        <div className="flex flex-col grow">
          <span>{name}</span>
          <span>{name}</span>
        </div>
      </div>
    </Link>
  );
}
