import { MovieCard, TMovieCard } from '../components';

export default function Home() {
  const movies: TMovieCard[] = [
    {
      title: 'The Shawshank Redemption',
      date: '1 Jan 1994',
      posterImage: 'https://placehold.co/400x600',
    },
    {
      title: 'The Godfather',
      date: '2 Jan 1994',
      posterImage: 'https://placehold.co/400x600',
    },
    {
      title: 'The Dark Knight',
      date: '3 Jan 1994',
      posterImage: 'https://placehold.co/400x600',
    },
    {
      title: '12 Angry Men',
      date: '4 Jan 1994',
      posterImage: 'https://placehold.co/400x600',
    },
    {
      title: "Schindler's List",
      date: '5 Jan 1994',
      posterImage: 'https://placehold.co/400x600',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-background text-text-primary">
      <h1 className="text-3xl font-bold text-center my-8">Bienvenue sur Reel Search !</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}
