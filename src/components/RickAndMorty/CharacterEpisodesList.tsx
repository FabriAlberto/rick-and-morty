import { api } from "@/services/api.service";
import { Avatar } from "antd";
import React, { FC } from "react";
type Props = {
  episodesIds: string[];
  title: string;
  avatars?: string[];
  isCharactersSelected?: boolean;
};
const CharacterEpisodesList: FC<Props> = async ({
  episodesIds,
  title,
  avatars,
  isCharactersSelected,
}) => {
  const episodes =
    episodesIds.length > 0
      ? (await api.getMultipleEpisodes(episodesIds)) || []
      : [];
  return (
    <div className="border-r-1 border-zinc-500 ">
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
          episodes.length > 0 ? "" : "justify-center"
        }`}
      >
        {episodes?.map((episode) => (
          <div className="flex gap-2 text-white " key={episode.id}>
            🎞️ <p>{episode.episode}</p> - <p>{episode.name}</p> -{" "}
            <p>{episode.air_date}</p>
          </div>
        ))}
        {episodes.length === 0 &&isCharactersSelected &&  (
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
