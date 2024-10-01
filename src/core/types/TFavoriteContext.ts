import { IMappedMovie, IMappedMovieDetail } from '../interfaces';

export type TFavoriteContext = {
  favorites: (IMappedMovie | IMappedMovieDetail)[];
  addFavorite: (movie: IMappedMovie | IMappedMovieDetail) => void;
  removeFavorite: (movieId: number) => void;
};
