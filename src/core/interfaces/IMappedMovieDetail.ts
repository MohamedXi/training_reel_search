export interface IMappedMovieDetail {
  adult: boolean;
  backdropImage: string;
  belongsToCollection?: {
    id: number;
    name: string;
    posterImage: string;
    backdropImage: string;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdbId: string;
  originCountry: string[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterImage: string;
  productionCompanies: Array<{
    id: number;
    logoImage: string | null;
    name: string;
    originCountry: string;
  }>;
  productionCountries: Array<{ iso31661: string; name: string }>;
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: Array<{ englishName: string; iso6391: string; name: string }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}
