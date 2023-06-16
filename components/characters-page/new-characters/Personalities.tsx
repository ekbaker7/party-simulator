import { PersonalityModel } from "@/data/character-data/personalities";

function Personalities({
  personalities,
}: {
  personalities: PersonalityModel[];
}) {
  return (
    <div className="border-r border-t border-b border-white border-dashed p-5">
      <h2>Personalities</h2>
      - - - - - - - - -
      {personalities.map((per, index) => (
        <div key={`personality-${per.Id}`}>{per.Personality}</div>
      ))}
    </div>
  );
}

export default Personalities;
