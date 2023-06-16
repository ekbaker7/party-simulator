"use client";

import CharacterList from "@/components/characters-page/new-characters/CharacterList";
import NewCharacterDisplay from "@/components/characters-page/new-characters/NewCharacterDisplay";
import SidebarButtons from "@/components/characters-page/new-characters/SidebarButtons";
import { DisplayedCharacterModel } from "@/data/database-models/characterModels";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";

function NewCharacterPage() {
  const [selectedCharacter, setSelectedCharacter] =
    useState<DisplayedCharacterModel | null>(null);
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

    setSelectedCharacter(newCharacter);
    setGeneratedCharacters([newCharacter, ...generatedCharacters]);
  };

  const clickHandler = async () => {
    await fetchData();
  };

  const onCharacterSelect = (character: DisplayedCharacterModel) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="grid grid-cols-[300px_1fr] h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-slate-600 ">
      <div className="flex flex-col bg-slate-900">
        <CharacterList
          generatedCharacters={generatedCharacters}
          character={selectedCharacter}
          onCharacterSelect={onCharacterSelect}
        />
        <SidebarButtons
          generateClickHandler={clickHandler}
          saveClickHandler={clickHandler}
          character={selectedCharacter}
        />
      </div>
      <NewCharacterDisplay character={selectedCharacter} />
    </div>
  );
}

export default NewCharacterPage;
