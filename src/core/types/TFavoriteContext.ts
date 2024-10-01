import { IMappedMovie } from "../interfaces";

export type TFavoriteContext = {
  favorites: IMappedMovie[];
  addFavorite: (movie: IMappedMovie) => void;
  removeFavorite: (movieId: number) => void;
};