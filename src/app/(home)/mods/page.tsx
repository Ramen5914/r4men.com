import ModCard from "@/components/ModCard";

export default function HomePage() {
  return (
    <div className="flex flex-row text-center justify-center p-4">
      <div className="flex flex-col justify-center text-center flex-1 gap-4 max-w-7xl">
        <h1 className="">Modlist:</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ModCard name="Game Knight" location="game-knight" />
          <ModCard
            name="Create: Cobblemon Manufactory"
            location="cobblemon-manufactory"
          />
          <ModCard name="Ramen's Additions" location="ramens-additions" />
        </div>
      </div>
    </div>
  );
}
