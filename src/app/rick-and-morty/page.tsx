export const dynamic = "force-dynamic";
import SkeleteonListCards from "@/components/common/SkeleteonListCards";
import CharacterEpisodes from "@/components/RickAndMorty/CharacterEpisodes";
import CharacterListContainer from "@/components/RickAndMorty/CharacterListContainer";
import { Suspense } from "react";

export default async function RickAndMortyPage({
  searchParams,
}: {
  searchParams: Promise<{
    page1?: string;
    page2?: string;
    character1?: string;
    character2?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage1 = params?.page1 || 1;
  const currentPage2 = params?.page2 || 1;
  const character1 = params?.character1;
  const character2 = params?.character2;

  return (
    <div>
      <p className="text-2xl pl-4  text-white ">
        {" "}
        🖱️ Select two characters and see their episodes{" "}
      </p>
      <div className="w-[75%] ml-4 mt-2 h-[2px] bg-gradient-to-l from-[ #00CBF5] to-[#C076FF]" />
      <section className="flex w-full flex-wrap">
        <div className="w-full lg:w-6/12">
          <Suspense key={currentPage1} fallback={<SkeleteonListCards />}>
            <CharacterListContainer
              sectionNumber={1}
              page={Number(currentPage1)}
              allSections={[1, 2]}
            />
          </Suspense>
        </div>
        <div className="w-full lg:w-6/12">
          <Suspense key={currentPage2} fallback={<SkeleteonListCards />}>
            <CharacterListContainer
              sectionNumber={2}
              page={Number(currentPage2)}
              allSections={[1, 2]}
            />
          </Suspense>
        </div>
      </section>
      <p className="text-2xl pl-4 mt-3  text-white "> 🎞️ Compare Episodes </p>
      <div className="w-[75%] ml-4 mt-2 h-[2px] bg-gradient-to-l from-[ #00CBF5] to-[#C076FF]" />
      <section className="flex flex-wrap w-full">
        <CharacterEpisodes
          character1Id={character1}
          character2Id={character2}
        />
      </section>
    </div>
  );
}
