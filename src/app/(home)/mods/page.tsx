import ModCard from "@/components/ModCard";

export default function HomePage() {
  return (
    <div className="flex flex-row text-center justify-center p-4">
      <div className="flex flex-col justify-center text-center flex-1 max-w-7xl">
        <h1 className="">Modlist:</h1>
        <div className="grid grid-cols-2 gap-4">
          <ModCard
            name="Game Knight"
            iconLink="https://raw.githubusercontent.com/Ramen5914/Game-Knight/refs/heads/26.2/src/main/resources/modIcon.png"
            location="game-knight"
          />
          <ModCard
            name="Create: Cobblemon Manufactory"
            iconLink="https://raw.githubusercontent.com/Ramen5914/Cobblemon-Manufactory/refs/heads/1.21.1/src/main/resources/icon.png"
            location="cobblemon-manufactory"
          />
          <ModCard
            name="Ramen's Additions"
            iconLink="https://raw.githubusercontent.com/Ramen5914/Game-Knight/refs/heads/26.2/src/main/resources/modIcon.png"
            location="ramens-additions"
          />
        </div>
      </div>
    </div>
  );
}
