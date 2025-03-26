"use client";
import { useState } from "react";
import { RamContext } from "./ramContext";
import { Character, Sections } from "@/types/rickMorty.types";

type Props = {
  children: React.ReactNode;
};
export const RamProvider = ({ children }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const [charactersSelected, setCharacterSelected] = useState<{
    character1: Character | null;
    character2: Character | null;
  }>({ character1: null, character2: null });
  const selectCharacter = (character: Character, section: Sections) => {
    setCharacterSelected((prev) => ({
      ...prev,
      [section]: prev[section]?.id === character.id ? null : character,
    }));
  };
  const resetSelection = (section: Sections) => {
    setCharacterSelected((prev) => ({
      ...prev,
      [section]: null,
    }));
  };
  return (
    <RamContext.Provider
      value={{ characters, charactersSelected, selectCharacter, setCharacters ,resetSelection}}
    >
      {children}
    </RamContext.Provider>
  );
};
