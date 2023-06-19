import { DisplayedCharacterModel } from "@/data/database-models/characterModels";
import { CircularProgress } from "@mui/material";

function SidebarButtons({
  generateClickHandler,
  saveClickHandler,
  character,
  loading,
  actionType,
}: {
  generateClickHandler: () => void;
  saveClickHandler: () => void;
  character: DisplayedCharacterModel | null;
  loading: boolean;
  actionType: string;
}) {
  return (
    <div className="my-5 mx-2 mt-auto">
      <div className="mb-5">
        {character && (
          <>
            {loading && actionType === "SAVE" ? (
              <div className=" bg-gray-600 h-[56px] flex justify-center mt-auto rounded-md">
                <CircularProgress className="my-auto" />
              </div>
            ) : (
              <button
                className="btn bg-blue-600 mt-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
                onClick={saveClickHandler}
                disabled={loading}
              >
                Save This Character
              </button>
            )}
          </>
        )}
      </div>
      <div className="">
        {loading && actionType === "GENERATE" ? (
          <div className=" bg-gray-600 h-[56px] flex justify-center mt-auto rounded-md">
            <CircularProgress className="my-auto" />
          </div>
        ) : (
          <button
            className="btn bg-green-600 mt-auto disabled:bg-gray-600 disabled:cursor-not-allowed"
            onClick={generateClickHandler}
            disabled={loading}
          >
            Generate
          </button>
        )}
      </div>
    </div>
  );
}

export default SidebarButtons;
