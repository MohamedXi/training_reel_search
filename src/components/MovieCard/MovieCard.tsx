export type TMovieCard = {
  title: string;
  date: string;
  posterImage: string;
};

export const MovieCard = ({ movie }: { movie: TMovieCard }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-background transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <div className="relative">
        <img src={movie.posterImage} alt={movie.title} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <span>{movie.date}</span>
        </div>
      </div>
    </div>
  );
};
