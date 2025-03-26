"use client";
import React from "react";
import CharacterEpisodesList from "./CharacterEpisodesList";
import { useRamContext } from "@/context/rickAndMortyContext/ramContext";

const CharacterEpisodes = () => {
  const {
    charactersSelected: { character1, character2 },
  } = useRamContext();

  const episodesCharacter1 = character1?.episode || [];
  const episodesCharacter2 = character2?.episode || [];

  const onlyCharacter1 = episodesCharacter1.filter(
    (episode) => !episodesCharacter2.includes(episode)
  );
  const onlyCharacter2 = episodesCharacter2.filter(
    (episode) => !episodesCharacter1.includes(episode)
  );
  const sharedEpisodes = episodesCharacter1.filter((episode) =>
    episodesCharacter2.includes(episode)
  );
  const getEpisodeId = (url: string): string => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="flex flex-wrap">
      <section className=" w-full md:w-4/12 p-2">
        <CharacterEpisodesList
          episodesIds={onlyCharacter1.map((episode) => getEpisodeId(episode))}
          title="Character #1 - Only Episodes"
          avatars={character1 ? [character1?.image] : []}
          isCharactersSelected={!!character1 && !!character2}
        />
      </section>

      <section className=" w-full md:w-4/12 p-2">
        <CharacterEpisodesList
          episodesIds={sharedEpisodes.map((episode) => getEpisodeId(episode))}
          title="Character #1 & #2 - Shared Episodes"
          avatars={
            character2 && character1
              ? [character1?.image, character2?.image]
              : []
          }
          isCharactersSelected={!!character1 && !!character2}
        />
      </section>

      <section className=" w-full md:w-4/12 p-2">
        <CharacterEpisodesList
          episodesIds={onlyCharacter2.map((episode) => getEpisodeId(episode))}
          title="Character #2 - Only Episodes"
          avatars={character2 ? [character2?.image] : []}
          isCharactersSelected={!!character1 && !!character2}
        />
      </section>
    </div>
  );
};

export default CharacterEpisodes;
