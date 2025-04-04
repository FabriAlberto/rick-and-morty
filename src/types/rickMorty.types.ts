export type ResponseRamApi = {
  info: InfoResponseRamApi;
  results: Character[];
};

export type InfoResponseRamApi = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};
export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};
export type Sections="character1" | "character2"
