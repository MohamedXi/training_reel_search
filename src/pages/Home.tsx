import React, { useEffect, useState } from 'react';
import { MovieCard, SearchBar } from '../components';
import { useTheMovieService } from '../core/hooks/useTheMovieService';
import { IMappedMovie } from '../core/interfaces';

/**
 * Home component that displays the main page with a search bar and a list of movies.
 *
 * @returns {React.ReactElement} The Home component.
 */
export default function Home(): React.ReactElement {
  const { searchMovies } = useTheMovieService();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [movies, setMovies] = useState<IMappedMovie[]>([]);

  /**
   * Fetches movies based on the search query and updates the state.
   */
  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery.trim() === '') {
        setMovies([]);
      } else {
        const movies = await searchMovies(searchQuery, 1);
        setMovies(movies);
      }
    };

    fetchMovies().then(() => console.log('Movies fetched!'));
  }, [searchQuery]);

  /**
   * Handles the search action by updating the search query state.
   *
   * @param {string} query - The search query.
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-background text-text-primary">
      <h1 className="text-3xl font-bold text-center my-8">Bienvenue sur Reel Search !</h1>

      <SearchBar onSearch={handleSearch} />

      {movies.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-lg mt-8">Aucun film trouvé.</p>
      )}
    </div>
  );
}
