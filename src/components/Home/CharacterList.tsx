
import { ResponseRamApi } from "@/types/rickMorty.types";
import React, { FC } from "react";
type Props = {
  charactersResponse: ResponseRamApi ;
};
const CharacterList: FC<Props> = ({ charactersResponse }) => {
  return (
    <section>
      <ul>
        {charactersResponse?.results?.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default CharacterList;
