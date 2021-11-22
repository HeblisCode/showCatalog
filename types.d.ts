declare type LoginData = {
  email: string;
  password: string;
};

declare type ShowJSONResponse = {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: number;
  imageURL: string;
  minAge: number;
  hasSeasons: boolean;
};

declare type PaginatedShowJSONResponse = {
  list: ShowJSONResponse[];
  total: number;
  page: number | null;
};

declare type ShowDetailJSONResponse = {
  id: number;
  title: string;
  genre: string;
  nation: string;
  prodYear: string;
  rating: number;
  duration: number | null;
  directedBy: string | null;
  abstract: string;
  imageURL: string;
  hasSeasons: boolean;
  totalSeason: number | null;
  imageUrl: string | null;
  minAge: number | null;
  url: string | null;
  seasons: SeasonJSONResponse[] | null;
  isFavorite?: boolean;
  hasVoted?: boolean;
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
