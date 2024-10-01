import React, { createContext, useEffect, useState } from 'react';
import { IMappedMovie, IMappedMovieDetail } from '../interfaces';
import { TFavoriteContext } from '../types';

/**
 * Context to manage the favorite items within the application.
 *
 * This context provides a way to share the state of favorite items
 * across different components without having to pass props down manually
 * at every level.
 *
 * @type {TFavoriteContext | undefined} - The type of the context value, which can be either
 * a TFavoriteContext object or undefined.
 */
export const FavoriteContext = createContext<TFavoriteContext | undefined>(undefined);

/**
 * Provides a context for managing favorite movies.
 *
 * This provider component allows its children to access and manipulate a list of favorite movies.
 * It uses the browser's localStorage to persist the favorites across sessions.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will have access to the favorite context.
 *
 * @returns {JSX.Element} The provider component that wraps its children with the favorite context.
 *
 * @context
 * - `favorites`: An array of favorite movies.
 * - `addFavorite`: A function to add a movie to the favorites list.
 * - `removeFavorite`: A function to remove a movie from the favorites list by its ID.
 *
 * @example
 * ```tsx
 * import { FavoriteProvider } from './path/to/favoriteContext';
 *
 * const App = () => (
 *   <FavoriteProvider>
 *     <YourComponent />
 *   </FavoriteProvider>
 * );
 * ```
 */
export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<(IMappedMovie | IMappedMovieDetail)[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  /**
   * Updates the local storage with the provided list of favorite movies.
   *
   * @param {Array<IMappedMovie | IMappedMovieDetail>} updatedFavorites - An array of favorite movies or movie details to be stored in local storage.
   */
  const updateLocalStorage = (updatedFavorites: (IMappedMovie | IMappedMovieDetail)[]) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  /**
   * Adds a movie to the list of favorite movies.
   *
   * @param {IMappedMovie | IMappedMovieDetail} movie - The movie to be added to the favorites list.
   * @returns {void}
   */
  const addFavorite = (movie: IMappedMovie | IMappedMovieDetail) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  /**
   * Removes a movie from the favorites list by its ID.
   *
   * @param {number} movieId - The ID of the movie to be removed from favorites.
   * @returns {void}
   */
  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  return <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoriteContext.Provider>;
};
