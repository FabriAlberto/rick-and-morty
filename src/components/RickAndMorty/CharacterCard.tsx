"use client";
import Image from "next/image";
import React, { FC } from "react";
import CustomCard from "../common/CustomCard";
import { motion } from "framer-motion";
import { Specie, Status } from "@/utils/enums";
import { useRamContext } from "../../context/rickAndMortyContext/ramContext";
import { Character, Sections } from "@/types/rickMorty.types";

type Props = {
  character: Character;
  sectionName: Sections;
  otherSections: number[];
};

const CharacterCard: FC<Props> = ({
  character,
  sectionName,
  otherSections,
}) => {
  const { selectCharacter, charactersSelected } = useRamContext();
  const { id, image, name, status, species } = character;

  const cardSelectedSection = charactersSelected[sectionName]?.id || null;
  const isSelected = cardSelectedSection === id;

  const cardsSelecteds: number[] = [];
  otherSections.forEach((section) => {
    const cardSelectedSection =
      charactersSelected[
        `character${section}` as keyof typeof charactersSelected
      ]?.id;
    if (cardSelectedSection) cardsSelecteds.push(cardSelectedSection);
  });
  const cardIsAlreadySelected = cardsSelecteds.includes(id);

  return (
    <CustomCard
      onClick={
        !cardIsAlreadySelected
          ? () => selectCharacter(character, sectionName)
          : undefined
      }
      image={
        <Image
          width={300}
          height={300}
          src={image}
          alt={name}
          className="rounded-lg w-full"
          loading="lazy"
        />
      }
      disabled={cardIsAlreadySelected}
      title={`${name} ${isSelected ? "✅" : ""}`}
      className={`${!cardIsAlreadySelected && "cursor-pointer"} ${
        isSelected ? "border-3 border-[#C076FF] saturate-150" : "border-none"
      }`}
      content={
        <>
          <motion.p className="text-white mt-3">
            Status: {Status[status as keyof typeof Status]}
            {status}
          </motion.p>
          <motion.p className="text-white">
            Specie: {Specie[species as keyof typeof Specie]} {species}
          </motion.p>
        </>
      }
    ></CustomCard>
  );
};

export default CharacterCard;
