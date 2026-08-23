import type { Metadata } from "next";
import ModCard from "@/components/ModCard";

export const metadata: Metadata = {
  title: "All mods",
};

export default function HomePage() {
  return (
    <div className="flex flex-row justify-center p-4 text-center">
      <div className="flex max-w-7xl flex-1 flex-col justify-center gap-4 text-center">
        <h1 className="">Modlist:</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ModCard
            name="Game Knight"
            location="game-knight"
            gitRepo="Ramen5914/Game-Knight"
          />
          <ModCard
            name="Create: Cobblemon Manufactory"
            location="cobblemon-manufactory"
            gitRepo="Ramen5914/Cobblemon-Manufactory"
          />
          <ModCard
            name="Ramen's Additions"
            location="ramens-additions"
            gitRepo="Ramen5914/Ramens-Additions"
          />
        </div>
      </div>
    </div>
  );
}
