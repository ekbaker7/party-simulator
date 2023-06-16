import { DisplayedCharacterModel } from "@/data/database-models/characterModels";

function CharacterList({
  generatedCharacters,
  character,
  onCharacterSelect,
}: {
  generatedCharacters: DisplayedCharacterModel[];
  character: DisplayedCharacterModel | null;
  onCharacterSelect: (character: DisplayedCharacterModel) => void;
}) {
  return (
    <div className="flex-grow">
      <h1 className="text-white my-5 ml-4">Generated Characters:</h1>
      <div className="text-white border-b border-t border-white py-4 pl-4 h-[calc(100vh-300px)] max-h-[calc(100vh-300px)] overflow-auto mx-4">
        <ul>
          {generatedCharacters.map((char, index) => (
            <li
              className={`cursor-pointer my-2 ${
                character && character._id === char._id ? "font-bold" : ""
              }`}
              key={`char-${index}`}
              onClick={() => onCharacterSelect(char)}
            >
              &gt; {char.firstName} {char.surname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterList;
