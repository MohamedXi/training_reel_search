import { IGenreResponse, IMappedMovie, IMovie, IMovieDetail, IMovieResponse, IUseTheMovieServiceReturn } from '../interfaces';
import { IMappedMovieDetail } from '../interfaces/IMappedMovieDetail';
import axios from '../libraries/axios';

/**
 * Maps a movie object to a mapped movie object.
 *
 * @param {IMovie} movie - The movie object to map.
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
 * Maps a detailed movie object to the IMovieDetail interface.
 *
 * @param {IMovieDetail} movie - The detailed movie object to map.
 * @returns {IMovieDetail} The mapped detailed movie object.
 */
const mapMovieDetail = (movie: IMovieDetail): IMappedMovieDetail => {
  return {
    adult: movie.adult,
    backdropImage: movie.backdrop_path,
    belongsToCollection: movie.belongs_to_collection
      ? {
          id: movie.belongs_to_collection.id,
          name: movie.belongs_to_collection.name,
          posterImage: movie.belongs_to_collection.poster_path,
          backdropImage: movie.belongs_to_collection.backdrop_path,
        }
      : undefined,
    budget: movie.budget,
    genres: movie.genres.map((genre) => ({ id: genre.id, name: genre.name })),
    homepage: movie.homepage,
    id: movie.id,
    imdbId: movie.imdb_id,
    originCountry: movie.origin_country,
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    posterImage: movie.poster_path,
    productionCompanies: movie.production_companies.map((company) => ({
      id: company.id,
      logoImage: company.logo_path,
      name: company.name,
      originCountry: company.origin_country,
    })),
    productionCountries: movie.production_countries.map((country) => ({
      iso31661: country.iso_3166_1,
      name: country.name,
    })),
    releaseDate: movie.release_date,
    revenue: movie.revenue,
    runtime: movie.runtime,
    spokenLanguages: movie.spoken_languages.map((lang) => ({
      englishName: lang.english_name,
      iso6391: lang.iso_639_1,
      name: lang.name,
    })),
    status: movie.status,
    tagline: movie.tagline,
    title: movie.title,
    video: movie.video,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  };
};

/**
 * Custom hook to interact with TheMovieService API.
 *
 * @returns {IUseTheMovieServiceReturn} The functions to interact with the API.
 */
export const useTheMovieService = (): IUseTheMovieServiceReturn => {
  /**
   * Searches for movies based on a query and page number.
   *
   * @param {string} query - The search query.
   * @param {number} page - The page number.
   * @returns {Promise<IMappedMovie[]>} A promise that resolves to an array of mapped movies.
   */
  const searchMovies = async (query: string, page: number): Promise<IMappedMovie[]> => {
    const response = await axios.get<IMovieResponse>('/search/movie', {
      params: { query, page },
    });

    return response.data.results.map(mapMovie);
  };

  /**
   * Gets the details of a movie by its ID.
   *
   * @param {number} id - The ID of the movie.
   * @returns {Promise<IMappedMovieDetail>} A promise that resolves to the mapped movie details.
   */
  const getMovieDetails = async (id: number): Promise<IMappedMovieDetail> => {
    const response = await axios.get<IMovieDetail>(`/movie/${id}`);

    return mapMovieDetail(response.data);
  };

  /**
   * Gets the genres of TV shows.
   *
   * @returns {Promise<IGenreResponse>} A promise that resolves to the TV show genres.
   */
  const getTVShowsGenres = async (): Promise<IGenreResponse> => {
    const response = await axios.get('/genre/tv/list');

    return response.data.genres;
  };

  /**
   * Gets the genres of movies.
   *
   * @returns {Promise<IGenreResponse[]>} A promise that resolves to the movie genres.
   */
  const getMoviesGenres = async (): Promise<IGenreResponse[]> => {
    const response = await axios.get('/genre/movie/list');

    return response.data.genres;
  };

  return {
    searchMovies,
    getMovieDetails,
    getTVShowsGenres,
    getMoviesGenres,
  };
};
