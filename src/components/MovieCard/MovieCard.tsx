import { HeartIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../core/hooks';
import { IMappedMovie } from '../../core/interfaces';

/**
 * MovieCard component displays a movie's poster, title, and release date.
 *
 * @param {Object} props - The props for the MovieCard component.
 * @param {IMappedMovie} props.movie - The movie object containing details to display.
 * @returns {React.Element} The rendered MovieCard component.
 */
export const MovieCard = ({ movie }: { movie: IMappedMovie }): React.ReactElement => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-background transition-transform transform hover:scale-105 hover:shadow-xl duration-300 relative">
      <div className="relative">
        <Link to={`/movie/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.posterImage}`} alt={movie.title} className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </Link>

        <button
          onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie))}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-colors duration-300"
        >
          <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-red-700' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow bg-background-secondary">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <span>{movie.releaseDate}</span>
        </div>
      </div>
    </div>
  );
};
