export interface IMappedMovie {
  adult: boolean;
  backdropImage: string | null;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterImage: string | null;
  releaseDate: string;
  title: string;
  video: boolean;
  rating: number;
  voteCount: number;
}