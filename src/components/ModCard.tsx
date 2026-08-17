import Image from "next/image";

export default function ModCard({
  name,
  iconLink,
}: {
  name: string;
  iconLink: string;
}) {
  const iconSize = 48;

  return (
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
  );
}
