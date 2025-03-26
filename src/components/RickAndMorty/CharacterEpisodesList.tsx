"use client";
import { api } from "@/services/api.service";
import { Episode } from "@/types/rickMorty.types";
import { Avatar } from "antd";
import React, { FC, useEffect, useState } from "react";
type Props = {
  episodesIds: string[];
  title: string;
  avatars?: string[];
  isCharactersSelected?: boolean;
};
const CharacterEpisodesList: FC<Props> = ({
  episodesIds,
  title,
  avatars,
  isCharactersSelected,
}) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const fetchEpisodes = async () => {
    const data = await api.getMultipleEpisodes(episodesIds);
    setEpisodes(data || []);
  };
  useEffect(() => {
    if (episodesIds.length > 0 && isCharactersSelected) fetchEpisodes();
  }, [episodesIds, isCharactersSelected]);

  return (
    <div className="md:border-r-1 md:border-zinc-500 ">
      <div className="flex items-center">
        <p
          className="font-bold text-xl mr-2 "
          style={{
            backgroundImage: "linear-gradient(90deg, #00CBF5 20%, #C076FF 50%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </p>
        {avatars?.map((avatar) => (
          <Avatar
            key={avatar}
            src={avatar}
            style={{ width: "30px", height: "30px" }}
            size="large"
          />
        ))}
      </div>
      <div
        className={`flex flex-col gap-2 mt-3 h-[400px] overflow-auto ${
          episodes.length > 0  && isCharactersSelected? "" : "justify-center"
        }`}
      >
        {episodes.length > 0 &&
          isCharactersSelected &&
          episodes.map((episode) => (
            <div className="flex gap-2 text-white " key={episode.id}>
              🎞️ <p>{episode.episode}</p> - <p>{episode.name}</p> -{" "}
              <p>{episode.air_date}</p>
            </div>
          ))}
        {episodes.length === 0 && isCharactersSelected && (
          <p className="text-white text-center">No episodes found</p>
        )}
        {!isCharactersSelected && (
          <p className="text-white text-center">
            Select two characters to see their episodes
          </p>
        )}
      </div>
    </div>
  );
};

export default CharacterEpisodesList;
