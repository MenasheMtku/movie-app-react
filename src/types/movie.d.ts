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
  genres_id?: string[];
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
