import { IGenreResponse, IMappedMovie, IMovie, IMovieResponse, IUseTheMovieServiceReturn } from '../interfaces';
import axios from '../libraries/axios';

/**
 * Maps an `IMovie` object to an `IMappedMovie` object.
 *
 * @param {IMovie} movie - The movie object to be mapped.
 * @returns {IMappedMovie} The mapped movie object.
 */
const mapMovie = (movie: IMovie): IMappedMovie => {
  return {
    adult: movie.adult,
    backdropImage: movie.backdrop_path,
    genreIds: movie.genre_ids,
    id: movie.id,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    posterImage: movie.poster_path,
    releaseDate: movie.release_date,
    title: movie.title,
    video: movie.video,
    rating: movie.vote_average,
    voteCount: movie.vote_count,
  };
};

/**
 * Custom hook to interact with The Movie Database (TMDb) API.
 * Provides methods to search for movies, get movie details, and fetch genres for movies and TV shows.
 *
 * @returns {IUseTheMovieServiceReturn} An object containing the following methods:
 * - `searchMovies(query: string, page: number): Promise<IMappedMovie[]>`: Searches for movies based on a query string and page number.
 * - `getMovieDetails(id: number): Promise<IMappedMovie>`: Retrieves detailed information about a specific movie by its ID.
 * - `getTVShowsGenres(): Promise<IGenreResponse>`: Fetches a list of TV show genres.
 * - `getMoviesGenres(): Promise<IGenreResponse>`: Fetches a list of movie genres.
 */
export const useTheMovieService = (): IUseTheMovieServiceReturn => {
  const searchMovies = async (query: string, page: number): Promise<IMappedMovie[]> => {
    const response = await axios.get<IMovieResponse>('/search/movie', {
      params: {
        query,
        page,
      },
    });

    return response.data.results.map(mapMovie);
  };

  /**
   * Fetches the details of a movie by its ID and maps the response to an `IMappedMovie` object.
   *
   * @param id - The unique identifier of the movie.
   * @returns A promise that resolves to an `IMappedMovie` object containing the movie details.
   */
  const getMovieDetails = async (id: number): Promise<IMappedMovie> => {
    const response = await axios.get<IMovie>(`/movie/${id}`);

    return mapMovie(response.data);
  };

  /**
   * Fetches the list of TV show genres from the API.
   *
   * @returns {Promise<IGenreResponse>} A promise that resolves to the genre response data.
   */
  const getTVShowsGenres = async (): Promise<IGenreResponse> => {
    const response = await axios.get('/genre/tv/list');

    return response.data;
  };

  /**
   * Fetches the list of movie genres from the API.
   *
   * @returns {Promise<IGenreResponse>} A promise that resolves to the genre response data.
   */
  const getMoviesGenres = async (): Promise<IGenreResponse> => {
    const response = await axios.get('/genre/movie/list');

    return response.data;
  };

  return {
    searchMovies,
    getMovieDetails,
    getTVShowsGenres,
    getMoviesGenres,
  };
};
