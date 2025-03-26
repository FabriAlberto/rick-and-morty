import { Character, Episode, ResponseRamApi } from "@/types/rickMorty.types";
import axios from "axios";
import { URLS } from "./apiUrls.service";

function createApiClient() {
  const axiosConfig = {
    withCredentials: false,
  };
  const acxiosClient = axios.create(axiosConfig);
  return acxiosClient;
}

export const api = {
  async getCharacters(query?: string) {
    try {
      const { data } = await createApiClient().get<ResponseRamApi>(
        URLS.rickAndMortyUrl(`/character?${query}`)
      );
      if (data) return data;
      throw new Error("No characters found");
    } catch (error) {
      console.error("error fetching characters", error);
      return null;
    }
  },
  async getMultipleCharacters(ids: string[]) {
    try {
      const { data } = await createApiClient().get<Character[]>(
        URLS.rickAndMortyUrl(`/character/${ids.join(",")}`)
      );
      if (data) return data;
      throw new Error("No characters found");
    } catch (error) {
      console.error("error fetching characters", error);
      return null;
    }
  },
  async getMultipleEpisodes(ids: string[]) {
    try {
      const { data } = await createApiClient().get<Episode[]>(
        URLS.rickAndMortyUrl(`/episode/[${ids.join()}]`)
      );
      if (data) return data;
      throw new Error("No episodes found");
    } catch (error) {
      console.error("error fetching episodes", error);
      return null;
    }
  },
};
