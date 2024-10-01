import { IGenreResponse, IMappedMovie, IMovie, IMovieResponse, IUseTheMovieServiceReturn } from '../interfaces';
import axios from '../libraries/axios';

/**
 * Fonction pour mapper une réponse de film brute (de l'API) vers un objet avec des propriétés renommées
 * @param {IMovie} movie - Objet de film brut retourné par l'API
 * @returns {IMappedMovie} - Objet de film avec des propriétés renommées
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
 * Custom hook to interact with TheMovieService API
 * @returns {IUseTheMovieServiceReturn}
 */
export const useTheMovieService = (): IUseTheMovieServiceReturn => {
  /**
   * Search for movies
   * @param {string} query - Search query
   * @param {number} page - Page number
   * @returns {Promise<IMappedMovie[]>}
   */
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
   * Get movie details
   * @param {number} id - Movie ID
   * @returns {Promise<IMappedMovie>}
   */
  const getMovieDetails = async (id: number): Promise<IMappedMovie> => {
    const response = await axios.get<IMovie>(`/movie/${id}`);

    return mapMovie(response.data);
  };

  /**
   * Get TV shows genres
   * @returns {Promise<IGenreResponse>}
   */
  const getTVShowsGenres = async (): Promise<IGenreResponse> => {
    const response = await axios.get('/genre/tv/list');

    return response.data;
  };

  /**
   * Get movie genres
   * @returns {Promise<IGenreResponse>}
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
