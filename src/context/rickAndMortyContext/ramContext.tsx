"use client";

import { Character, Sections } from "@/types/rickMorty.types";
import { createContext, useContext } from "react";

type RamContext = {
  characters: Character[];
  charactersSelected:{
    character1:Character|null;
    character2:Character|null
  };
  selectCharacter:(character:Character,section:'character1'|'character2')=>void;
  setCharacters:(characters:Character[])=>void;
  resetSelection:(section:Sections)=>void;
};

export const RamContext = createContext<RamContext>({} as RamContext);
export const useRamContext = () => useContext(RamContext);
