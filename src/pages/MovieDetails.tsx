import { useFavorites, useTheMovieService } from '@/core/hooks';
import { IMappedMovieDetail } from '@/core/interfaces';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function MovieDetails() {
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

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
      <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-6 max-w-6xl">
        <button className="rounded-full bg-gray-800 text-white p-2 w-8 h-8 flex items-center justify-center" onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
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
