declare type LoginData = {
  email: string;
  password: string;
};

declare type ShowDetailJSONResponse = {
  id: number;
  title: string;
  genre: string;
  nation: string;
  prodYear: string;
  rating: string;
  duration: number | null;
  directedBy: string | null;
  abstract: string;
  imageURL: string;
  hasSeasons: boolean;
  totalSeason: number | null;
  url: string | null;
  minAge: number | null;
  seasons: SeasonJSONResponse[];
};

declare type SeasonJSONResponse = {
  seasonNumber: number;
  id: number;
  episodes: EpisodeJSONResponse[];
};

declare type EpisodeJSONResponse = {
  id: number;
  title: string;
  duration: number;
  url: string;
};

declare type Filter = {
  nation?: string;
  genre?: string;
  has_seasons?: boolean;
};
