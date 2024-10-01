import { Home, MovieDetails } from '../../pages';
import { ERoutePaths } from '../enums';
import { TRoutePage } from '../types';

const routes: TRoutePage[] = [
  {
    element: <Home />,
    path: ERoutePaths.HOME,
    title: 'Home Page',
  },
  {
    element: <MovieDetails />,
    path: ERoutePaths.MOVIE_DETAILS,
    title: 'Movie Details Page',
  },
];

export default routes;
