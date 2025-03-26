import React, { FC } from "react";
import CharacterEpisodesList from "./CharacterEpisodesList";
import { api } from "@/services/api.service";
type Props = {
  character1Id?: string;
  character2Id?: string;
};
const CharacterEpisodes: FC<Props> = async ({ character1Id, character2Id }) => {
  const characters =
    character1Id && character2Id
      ? await api.getMultipleCharacters([character1Id, character2Id])
      : [];
  const character1 = characters?.find(
    (character) => character.id === Number(character1Id)
  );
  const character2 = characters?.find(
    (character) => character.id === Number(character2Id)
  );
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
    <>
      <section id="1" className="w-4/12 p-2">
        <CharacterEpisodesList
          episodesIds={onlyCharacter1.map((episode) => getEpisodeId(episode))}
          title="Character #1 - Only Episodes"
          avatars={character1 ? [character1?.image] : []}
          isCharactersSelected={!!character1Id && !!character2Id}
        />
      </section>

      <section id="1and2" className="w-4/12 p-2">
        <CharacterEpisodesList
          episodesIds={sharedEpisodes.map((episode) => getEpisodeId(episode))}
          title="Character #1 & #2 - Shared Episodes"
          avatars={
            character2 && character1
              ? [character1?.image, character2?.image]
              : []
          }
          isCharactersSelected={!!character1Id && !!character2Id}
        />
      </section>

      <section id="2" className="w-4/12 p-2">
        <CharacterEpisodesList
          episodesIds={onlyCharacter2.map((episode) => getEpisodeId(episode))}
          title="Character #2 - Only Episodes"
          avatars={character2 ? [character2?.image] : []}
          isCharactersSelected={!!character1Id && !!character2Id}
        />
      </section>
    </>
  );
};

export default CharacterEpisodes;
