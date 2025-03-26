"use client";
import Image from "next/image";
import React, { FC } from "react";
import CustomCard from "../common/CustomCard";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Specie, Status } from "@/utils/enums";

type Props = {
  name: string;
  id: number;
  image: string;
  paramName: string;
  otherSections: number[];
  status: string;
  specie: string;
};

const CharacterCard: FC<Props> = ({
  id,
  image,
  name,
  paramName,
  otherSections,
  status,
  specie,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cardSelectedSection = searchParams.get(paramName) || null;
  const isSelected = cardSelectedSection === String(id);

  const onSelectCharacter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (cardSelectedSection === String(id)) {
      params.delete(paramName);
    } else {
      params.set(paramName, String(id));
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const cardsSelecteds: string[] = [];
  otherSections.forEach((section) => {
    const cardSelectedSection = searchParams.get(`character${section}`) || null;
    if (cardSelectedSection) cardsSelecteds.push(cardSelectedSection);
  });
  const cardIsAlreadySelected = cardsSelecteds.includes(String(id));

  return (
    <CustomCard
      onClick={!cardIsAlreadySelected ? onSelectCharacter : undefined}
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
      title={`${name} ${isSelected && "✅"}`}
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
            Specie: {Specie[specie as keyof typeof Specie]} {specie}
          </motion.p>
        </>
      }
    ></CustomCard>
  );
};

export default CharacterCard;
