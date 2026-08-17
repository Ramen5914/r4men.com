import ModCard from "@/components/ModCard";

export default function HomePage() {
  return (
    <div className="flex flex-row text-center justify-center">
      <div className="flex flex-col justify-center text-center flex-1 max-w-7xl">
        <h1>My Mod Wikis</h1>
        <div className="grid grid-cols-2 gap-4">
          <ModCard
            name="Game Knight"
            iconLink="https://raw.githubusercontent.com/Ramen5914/Game-Knight/refs/heads/26.2/src/main/resources/modIcon.png"
          />
          <ModCard
            name="Create: Cobblemon Manufactory"
            iconLink="https://raw.githubusercontent.com/Ramen5914/Cobblemon-Manufactory/refs/heads/1.21.1/src/main/resources/icon.png"
          />
          <ModCard
            name="Ramen's Additions"
            iconLink="https://raw.githubusercontent.com/Ramen5914/Game-Knight/refs/heads/26.2/src/main/resources/modIcon.png"
          />
        </div>
      </div>
    </div>
  );
}
