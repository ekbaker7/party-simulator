"use client";

import { CharacterModel } from "@/data/database-models/characterModels";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";

function NewCharacterPage() {
  const [character, setCharacter] = useState<CharacterModel | null>(null);

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
  };

  const clickHandler = async () => {
    await fetchData();
  };

  return (
    <div className="bg-slate-600 h-[calc(100vh-50px)] overflow-hidden">
      {character && (
        <div>
          <h1>{character.firstName} "{character.nickname}" {character.surname}, Aged {character.age}</h1>
          <h2>"{character.quote}"</h2>
          <div>
            {character.pronouns}, interested in {character.interestedIn.join(", ")}
          </div>
          <div>
            {character.class} | {character.profession}
          </div>
          <div>
            <h2>Stats</h2>
            <p>
              Physical: {character.stats.physical}
            </p>
            <p>
              Magical: {character.stats.magical}
            </p>
            <p>
              Charisma: {character.stats.charisma}
            </p>
          </div>
          <div>
            <h2>Equipment</h2>
            {character.equipment.map((item) => (
              <div key={`equip-${item.id}`}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="btn bg-green-600" onClick={clickHandler}>
        Generate
      </button>
    </div>
  );
}

export default NewCharacterPage;
