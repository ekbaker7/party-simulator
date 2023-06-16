import { DisplayedCharacterModel } from "@/data/database-models/characterModels";

function SidebarButtons({
  generateClickHandler,
  saveClickHandler,
  character,
}: {
  generateClickHandler: () => void;
  saveClickHandler: () => void;
  character: DisplayedCharacterModel | null;
}) {
  return (
    <div className="my-5 mx-2 mt-auto">
      <div className="mb-5">
        {character && (
          <button
            className="btn bg-blue-600 mt-auto"
            onClick={saveClickHandler}
          >
            Save This Character
          </button>
        )}
      </div>
      <div className="">
        <button
          className="btn bg-green-600 mt-auto"
          onClick={generateClickHandler}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default SidebarButtons;
