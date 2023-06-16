"use client";

import NewCharacterDisplay from "@/components/characters-page/new-characters/NewCharacterDisplay";
import { DisplayedCharacterModel } from "@/data/database-models/characterModels";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";

function NewCharacterPage() {
  const [character, setCharacter] = useState<DisplayedCharacterModel | null>(
    null
  );
  const [generatedCharacters, setGeneratedCharacters] = useState<
    DisplayedCharacterModel[]
  >([]);

  const fetchData = async () => {
    const jwt = getCookie("jwt");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/api/characters/new`,
      {
        pronouns: null,
        interestedIn: null,
        job: null,
        profession: null,
      }
    );

    const data = response.data;
    const newCharacter = data.newCharacter;

    setCharacter(newCharacter);
    setGeneratedCharacters([newCharacter, ...generatedCharacters]);
  };

  const clickHandler = async () => {
    await fetchData();
  };

  const onCharacterSelect = (character: DisplayedCharacterModel) => {
    setCharacter(character);
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-slate-600 ">
      <div className="flex flex-col bg-slate-900">
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
        <div className="my-5 mx-2 mt-auto">
          <div className="mb-5">
            {character && (
              <button className="btn bg-blue-600 mt-auto" onClick={clickHandler}>
                Save This Character
              </button>
            )}
          </div>
          <div className="">
            <button className="btn bg-green-600 mt-auto" onClick={clickHandler}>
              Generate
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {character && <NewCharacterDisplay character={character} />}
      </div>
    </div>
  );
}

export default NewCharacterPage;
