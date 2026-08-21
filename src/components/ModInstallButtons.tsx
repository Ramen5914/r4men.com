"use client";

import Link from "next/link";

export function ModInstallButtons({
  modrinthId,
  curseforgeId,
}: {
  modrinthId?: string;
  curseforgeId?: number;
}) {
  return (
    <div className="m-auto flex flex-row items-center gap-4">
      {modrinthId ? <ModrinthInstallButton modId={modrinthId} /> : null}
      {curseforgeId ? <CurseforgeInstallButton addonId={curseforgeId} /> : null}
    </div>
  );
}

export function ModrinthInstallButton({ modId }: { modId: string }) {
  return (
    <Link
      onClick={() => {
        window.location.href = `modrinth://mod/${modId}`;
      }}
      href={""}
    >
      <div
        className={
          "relative inline-flex h-9 min-h-10! w-fit min-w-0 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border-0 bg-[#1bd96a] px-2.5 font-semibold text-base text-black leading-5 no-underline transition-[background-color,color,box-shadow,filter,opacity,transform] duration-150 ease-out"
        }
      >
        <svg
          width="512"
          height="514"
          viewBox="0 0 512 514"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Modrinth Logo</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M503.16 323.56C514.55 281.47 515.32 235.91 503.2 190.76C466.57 54.2299 326.04 -26.8001 189.33 9.77991C83.8101 38.0199 11.3899 128.07 0.689941 230.47H43.99C54.29 147.33 113.74 74.7298 199.75 51.7098C306.05 23.2598 415.13 80.6699 453.17 181.38L411.03 192.65C391.64 145.8 352.57 111.45 306.3 96.8198L298.56 140.66C335.09 154.13 364.72 184.5 375.56 224.91C391.36 283.8 361.94 344.14 308.56 369.17L320.09 412.16C390.25 383.21 432.4 310.3 422.43 235.14L464.41 223.91C468.91 252.62 467.35 281.16 460.55 308.07L503.16 323.56Z"
            fill="currentColor"
          />
          <path
            d="M321.99 504.22C185.27 540.8 44.7501 459.77 8.11011 323.24C3.84011 307.31 1.17 291.33 0 275.46H43.27C44.36 287.37 46.4699 299.35 49.6799 311.29C53.0399 323.8 57.45 335.75 62.79 347.07L101.38 323.92C98.1299 316.42 95.39 308.6 93.21 300.47C69.17 210.87 122.41 118.77 212.13 94.7601C229.13 90.2101 246.23 88.4401 262.93 89.1501L255.19 133C244.73 133.05 234.11 134.42 223.53 137.25C157.31 154.98 118.01 222.95 135.75 289.09C136.85 293.16 138.13 297.13 139.59 300.99L188.94 271.38L174.07 231.95L220.67 184.08L279.57 171.39L296.62 192.38L269.47 219.88L245.79 227.33L228.87 244.72L237.16 267.79C237.16 267.79 253.95 285.63 253.98 285.64L277.7 279.33L294.58 260.79L331.44 249.12L342.42 273.82L304.39 320.45L240.66 340.63L212.08 308.81L162.26 338.7C187.8 367.78 226.2 383.93 266.01 380.56L277.54 423.55C218.13 431.41 160.1 406.82 124.05 361.64L85.6399 384.68C136.25 451.17 223.84 484.11 309.61 461.16C371.35 444.64 419.4 402.56 445.42 349.38L488.06 364.88C457.17 431.16 398.22 483.82 321.99 504.22Z"
            fill="currentColor"
          />
        </svg>
        <span>Install with Modrinth App</span>
      </div>
    </Link>
  );
}

export function CurseforgeInstallButton({ addonId }: { addonId: number }) {
  return (
    <Link
      onClick={() => {
        window.location.href = `curseforge://install?addonId=${addonId}&source=r4men.com`;
      }}
      href={""}
    >
      <div
        className={
          "button-frame--colored !min-h-10 relative inline-flex h-9 w-fit min-w-0 shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border-0 bg-[#eb622b] px-2.5 font-semibold text-base text-black leading-5 no-underline transition-[background-color,color,box-shadow,filter,opacity,transform] duration-150 ease-out focus-visible:outline-none enabled:active:scale-[0.97] disabled:opacity-50 [&:not(:disabled):not([aria-disabled=true]):focus-visible]:ring-4 [&:not(:disabled):not([aria-disabled=true]):focus-visible]:ring-brand-shadow [&:not(:disabled):not([aria-disabled=true]):focus-visible]:brightness-[--hover-brightness] [&:not(:disabled):not([aria-disabled=true]):hover]:brightness-[--hover-brightness] [&>svg]:size-5 [&>svg]:min-h-5 [&[aria-disabled=true]]:opacity-50"
        }
      >
        <svg
          version="1.1"
          id="svg81"
          width="30.780212"
          height="20"
          viewBox="0 0 31 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Curseforge Logo</title>
          <path
            d="m 23.503108,6.3347998 c 0,0 6.284576,-1.0167012 7.277104,-3.9819302 H 21.152986 V 0 H 0 l 2.6057945,3.1021001 v 3.1783435 c 0,0 6.5750456,-0.3507616 9.1183875,1.627886 C 15.20558,11.218898 7.8085844,15.693873 7.8085844,15.693873 L 6.540175,20 C 8.523647,18.062348 12.303926,15.555859 19.23505,15.676673 16.597363,16.531921 13.945204,17.867701 11.880549,20 h 14.01117 l -1.31942,-4.306127 c 0,0 -10.154952,-6.1435728 -1.069191,-9.3590732 z"
            fill="currentColor"
          />
        </svg>

        <span>Install with Curseforge App</span>
      </div>
    </Link>
  );
}
