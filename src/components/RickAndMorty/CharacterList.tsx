"use client";
import { ResponseRamApi, Sections } from "@/types/rickMorty.types";
import { Pagination } from "antd";
import React from "react";
import CharacterCard from "./CharacterCard";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  charactersResponse: ResponseRamApi | null;
  sectionName: Sections
  currentPage: number;
  sectionNumber: number;
  allSections: number[];
};
const CharacterList: React.FC<Props> = ({
  charactersResponse,
  sectionName,
  currentPage,
  sectionNumber,
  allSections,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set(`page${sectionNumber}`, String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <section className="w-full flex mt-2  flex-wrap rounded-md max-h-[70vh] overflow-auto">
        {charactersResponse?.results?.map((character) => (
          <div className=" w-full sm:w-6/12 md:w-4/12 p-2" key={character.id}>
            <CharacterCard
              key={character.id}
              character={character}
              sectionName={sectionName}
              otherSections={allSections.filter(
                (section) => section !== sectionNumber
              )}
            />
          </div>
        ))}
      </section>
      <section className="mt-2">
        <Pagination
          align="center"
          defaultCurrent={currentPage}
          defaultPageSize={20}
          size="small"
          showSizeChanger={false}
          total={charactersResponse?.info.count}
          rootClassName="bg-transparent text-white"
          onChange={handleChangePage}
          responsive
        />
      </section>
    </>
  );
};

export default CharacterList;
