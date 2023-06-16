import { CharacterStatsModel } from "@/data/database-models/characterModels";

function NewCharacterStats({ stats }: { stats: CharacterStatsModel }) {
  return (
    <div className="border-t border-l border-b border-white border-dashed p-5">
      <h2>Stats</h2>
      - - - - - - - -
      <p>Physical: {stats.physical}</p>
      <p>Magical: {stats.magical}</p>
      <p>Charisma: {stats.charisma}</p>
    </div>
  );
}

export default NewCharacterStats;
