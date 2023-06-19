import { DisplayedCharacterModel } from "@/data/database-models/characterModels";
import NewCharacterStats from "./NewCharacterStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import EquipmentList from "./EquipmentList";
import Personalities from "./Personalities";

function NewCharacterDisplay({
  character,
}: {
  character: DisplayedCharacterModel | null;
}) {
  return (
    <div className="m-auto h-full w-2/3 py-2 text-white">
      <div className="bg-[#ddd] bg-opacity-90 z-5 drop-shadow-xl rounded-md px-10 pb-[7rem] pt-10 b-l b-r border-slate-900 h-full">
        <div className="bg-slate-900 h-full w-full rounded-md m-auto p-5">
          {!character && (
            <div className="font-mono mb-5">
              &gt; Waiting on user to GENERATE character data...
              <span>
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="text-white scale-x-[60%] h-[20px] animate-blink inline-block ml-2 relative top-1"
                  />
                </span>
            </div>
          )}
          {character && (
            <div>
              <div className='font-mono mb-5'>
                &gt; Loading {character.firstName}_{character.surname}.txt...
              </div>
              <h1 className="text-4xl text-center mb-2">
                {character.firstName} &quot;{character.nickname}&quot;{" "}
                {character.surname}
              </h1>
              <hr className="border-dashed" />
              <div className="text-2xl mt-2">Class - {character.class}</div>
              <div className="text-xl mt-2">
                Profession - {character.profession}
              </div>
              <h2 className="mt-2">&quot;{character.quote}&quot;</h2>
              <div className="mt-2">
                Pronouns - [{character.pronouns}], Interested in - [
                {character.interestedIn.join(", ")}]
              </div>
              <h2 className="mt-2">Age: {character.age}</h2>
              <div className="grid grid-cols-3 mt-5">
                <NewCharacterStats stats={character.stats} />
                <EquipmentList equipment={character.equipment} />
                <Personalities personalities={character.personality} />
              </div>
              <div className="mt-5 font-mono">
                &gt; Waiting on user to either SAVE THIS CHARACTER or GENERATE another...
                <span>
                  <FontAwesomeIcon
                    icon={faSquare}
                    className="text-white scale-x-[60%] h-[20px] animate-blink inline-block ml-2 relative top-1"
                  />
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="text-center text-gray-800 text-opacity-20 text-5xl mt-5">
          Scientia Systems
        </div>
      </div>
    </div>
  );
}

export default NewCharacterDisplay;
