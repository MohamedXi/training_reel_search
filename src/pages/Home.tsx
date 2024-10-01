import { useState } from 'react';
import { MovieCard, SearchBar } from '../components';
import { IMappedMovie } from '../core/interfaces';

export default function Home() {
  const [movies, setMovies] = useState<IMappedMovie[]>([]);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-background text-text-primary">
      <h1 className="text-3xl font-bold text-center my-8">Bienvenue sur Reel Search !</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}
