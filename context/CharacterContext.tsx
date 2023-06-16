"use client";

import { useState, createContext, useEffect } from "react";
import { DisplayedCharacterModel } from "@/data/database-models/characterModels";

interface State {
  charsLoading: boolean;
  charsError: string | null;
  characters: DisplayedCharacterModel[];
}

interface CharacterState extends State {
  setCharacterState: React.Dispatch<React.SetStateAction<State>>;
}

export const CharactersContext = createContext<CharacterState>({
  charsLoading: true,
  characters: [],
  charsError: null,
  setCharacterState: () => {},
});

function CharacterContext({ children }: { children: React.ReactNode }) {
  const [characterState, setCharacterState] = useState<State>({
    charsLoading: true,
    characters: [],
    charsError: null,
  });

  return (
    <CharactersContext.Provider
      value={{ ...characterState, setCharacterState }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export default CharacterContext;
