export type CommonFeatures = {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  adult?: boolean;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  original_language?: string;
  genre_ids?: number[];
  media_type?: string;
};

export type Movie = CommonFeatures & {
  title: string;
  original_title?: string;
  release_date?: string;
};

export type Program = CommonFeatures & {
  name: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
};

export type DetailsType = {
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  overview?: string;
  runtime?: number;
  tagline?: string;
  first_air_date?: string;
  release_date?: string;
  genres?: Array<{ id: number; name: string }>;
};

export type CastType = {
  id: number;
  name: string;
  profile_path: string | null;
};

export type VideoType = {
  key: string;
  id: string;
  name: string;
  type: string;
  site?: string;
};

export type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  overview?: string;
  media_type?: string;
};
