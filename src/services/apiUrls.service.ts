import appConfig from "@/config";

export const URLS = {
  rickAndMortyUrl: (path: string) => `${appConfig.base_url_rick_morty}${path}`,
};