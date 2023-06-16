import { DisplayedCharacterModel } from "@/data/database-models/characterModels";
import NewCharacterStats from "./NewCharacterStats";

function NewCharacterDisplay({
  character,
}: {
  character: DisplayedCharacterModel | null;
}) {
  return (
    <div className="p-4">
      {character && (
        <div className="text-white">
          <h1 className="text-4xl">
            {character.firstName} &quot;{character.nickname}&quot;{" "}
            {character.surname}
          </h1>
          <h2 className="text-xl">Aged: {character.age}</h2>
          <h2>&quot;{character.quote}&quot;</h2>
          <div>
            {character.pronouns}, interested in{" "}
            {character.interestedIn.join(", ")}
          </div>
          <div className="text-2xl">
            {character.class}, {character.profession}
          </div>
          <NewCharacterStats stats={character.stats} />
          <div>
            <h2>Equipment</h2>
            {character.equipment.map((item, index) => (
              <div key={`equip-${item.id}-${index}`}>{item.name}</div>
            ))}
          </div>
          <div>
            <h2>Personalities</h2>
            {character.personality.map((per) => (
              <div key={`personality-${per.Id}`}>{per.Personality}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewCharacterDisplay;
