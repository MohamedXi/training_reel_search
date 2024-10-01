import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../core/hooks';
import { useTheMovieService } from '../core/hooks/useTheMovieService';
import { IMappedMovieDetail } from '../core/interfaces';

export default function MovieDetails() {
  const { id } = useParams();
  const { getMovieDetails } = useTheMovieService();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const [movie, setMovie] = useState<IMappedMovieDetail>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movie = await getMovieDetails(Number(id));
      setMovie(movie);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

  return (
    <div className="min-h-screen bg-background text-text-primary p-6">
      <div className="max-w-screen-lg mx-auto flex flex-col lg:flex-row items-start gap-8">
        <div className="w-full lg:w-1/3">
          <img src={`https://image.tmdb.org/t/p/w500${movie.posterImage}`} alt={movie.title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">
            {movie.title} <span className="text-gray-400">({movie.releaseDate.split('-')[0]})</span>
          </h1>

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center text-yellow-400">
              <span className="text-3xl font-bold">{Math.round(movie.voteAverage * 10)}%</span>
              <span className="text-sm text-gray-400 ml-2">Score d'évaluation</span>
            </div>

            <button className="flex items-center space-x-2" onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie))}>
              <HeartIcon className={`h-6 w-6 ${isFavorite ? 'text-red-700' : 'text-gray-400'}`} />
              <span className="text-sm">Ajouter aux favoris</span>
            </button>
          </div>

          <p className="text-sm text-gray-400 mb-4">
            {movie.genres.map((genre) => genre.name).join(', ')} • {movie.releaseDate} • {movie.runtime} minutes
          </p>

          <p className="italic text-gray-200 mb-6">{movie.adult}</p>

          <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
          <p className="text-base text-gray-400 leading-relaxed mb-6">{movie.overview}</p>

          <div className="flex space-x-8 mb-6">
            <div>
              <h3 className="text-lg font-medium">Production</h3>
              {movie.productionCompanies.map((company) => (
                <p className="text-sm text-gray-400 " key={company.id}>
                  {company.name}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-medium">Pays de production</h3>
              {movie.productionCountries.map((country) => (
                <p className="text-sm text-gray-400" key={country.iso31661}>
                  {country.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
