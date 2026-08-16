import Link from "next/link";

import "./styles.css";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <div className="grid grid-cols-2">
        <div className="mod-card">1</div>
        <div className="mod-card">2</div>
        <div className="mod-card">3</div>
        <div className="mod-card">4</div>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        Hello World (from /mods this time)
      </h1>
      <p>
        You can open{" "}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{" "}
        and see the documentation.
      </p>
      <p>
        You can open{" "}
        <Link href="/mods/game-knight" className="font-medium underline">
          /mods-game-knight
        </Link>{" "}
        and see the documentation for GAME KNIGHT.
      </p>
    </div>
  );
}
