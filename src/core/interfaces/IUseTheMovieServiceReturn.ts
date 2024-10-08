import { IGenreResponse } from './IGenreResponse';
import { IMappedMovie } from './IMappedMovie';
import { IMappedMovieDetail } from './IMappedMovieDetail';

/**
 * Hook return type
 */
export interface IUseTheMovieServiceReturn {
  /**
   * Search for movies
   * @param {string} query - Search query
   * @param {number} page - Page number
   * @returns {Promise<IMappedMovie>}
   */
  searchMovies: (query: string, page: number) => Promise<IMappedMovie[]>;
  /**
   * Get movie details
   * @param {number} id - Movie ID
   * @returns {Promise<any>}
   */
  getMovieDetails: (id: number) => Promise<IMappedMovieDetail>;

  /**
   * Get TV shows genres
   * @returns {Promise<any>}
   */
  getTVShowsGenres: () => Promise<IGenreResponse>;

  /**
   * Get movies genres
   * @returns {Promise<any>}
   */
  getMoviesGenres: () => Promise<IGenreResponse[]>;
}
