"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

function NewCharacterPage() {
  const [character, setCharacter] = useState(null);

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
    await fetchData()
  }

  console.log({ character })

  return (
    <div className="bg-slate-600 h-[calc(100vh-50px)] overflow-hidden">
      {character && <span>{JSON.stringify(character)}</span>}
      <button className="btn bg-green-600" onClick={clickHandler}>Click me</button>
    </div>
  );
}

export default NewCharacterPage;
