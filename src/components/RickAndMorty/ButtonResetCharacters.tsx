"use client";
import { useRamContext } from "@/context/rickAndMortyContext/ramContext";
import { Sections } from "@/types/rickMorty.types";
import React, { FC } from "react";
type Props = {
  sectionName: Sections;
};

const ButtonResetCharacters: FC<Props> = ({ sectionName }) => {
  const { charactersSelected, resetSelection } = useRamContext();
  const characterSelected = charactersSelected[sectionName];
  if (!characterSelected) return null;

  return (
    <button
      className="btn btn-error p-2 cursor-pointer rounded-md border-1 border-red-500 text-red-500"
      onClick={()=>resetSelection(sectionName)}
    >
      <p className="text-sm">Remove selection ❌</p>
    </button>
  );
};

export default ButtonResetCharacters;
