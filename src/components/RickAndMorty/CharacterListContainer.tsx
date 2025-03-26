export const dynamic = "force-dynamic";
import { ResponseRamApi, Sections } from "@/types/rickMorty.types";
import React from "react";

import { api } from "@/services/api.service";
import CharacterList from "./CharacterList";
import ButtonResetCharacters from "./ButtonResetCharacters";

const fetchCharacters = async (
  query: string
): Promise<ResponseRamApi | null> => {
  const response = await api.getCharacters(query);
  return response;
};

type Props = {
  sectionNumber: number;
  page: number;
  allSections: number[];
};

export default async function CharacterListContainer({
  sectionNumber,
  page,
  allSections,
}: Props) {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  const charactersResponse = await fetchCharacters(params.toString());
  const sectionName = `character${sectionNumber}` as Sections;

  return (
    <section className="p-4 ">
      <div className="flex justify-between items-center">
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #00CBF5 20%, #C076FF 50%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="font-bold text-2xl "
        >
          Character #{sectionNumber}
        </span>
        <ButtonResetCharacters sectionName={sectionName} />
      </div>

      <CharacterList
        charactersResponse={charactersResponse}
        sectionName={sectionName}
        sectionNumber={sectionNumber}
        currentPage={page}
        allSections={allSections}
      />
    </section>
  );
}
