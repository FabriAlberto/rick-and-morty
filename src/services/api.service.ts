import { ResponseRamApi } from "@/types/rickMorty.types";
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
  async getCharacters() {
    try {
      const { data } = await createApiClient().get<ResponseRamApi>(
        URLS.rickAndMortyUrl("/character")
      );
      if (data) return data;
      throw new Error("No characters found");
    } catch (error) {
      console.error("error fetching characters", error);
      return null;
    }
  }
};
