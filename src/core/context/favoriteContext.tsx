import React, { createContext, useEffect, useState } from 'react';
import { IMappedMovie } from '../interfaces';
import { TFavoriteContext } from '../types/TFavoriteContext';

/**
 * Context to manage the favorite items.
 *
 * This context provides a way to share the state of favorite items across the component tree.
 * It is initialized with an undefined value and should be provided with a proper value using a provider.
 *
 * @type {React.Context<TFavoriteContext | undefined>}
 */
export const FavoriteContext = createContext<TFavoriteContext | undefined>(undefined);

/**
 * FavoriteProvider component that provides favorite movies context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will have access to the favorite movies context.
 *
 * @returns {JSX.Element} The FavoriteContext.Provider component with the provided value.
 *
 * @description
 * This component initializes the favorite movies state from localStorage and provides functions to add and remove favorite movies.
 * It uses the `useEffect` hook to load the favorites from localStorage when the component mounts.
 * The `addFavorite` function adds a movie to the favorites list and updates localStorage.
 * The `removeFavorite` function removes a movie from the favorites list by its ID and updates localStorage.
 */
export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<IMappedMovie[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  /**
   * Updates the local storage with the provided list of favorite movies.
   *
   * @param {IMappedMovie[]} updatedFavorites - An array of favorite movies to be stored in local storage.
   */
  const updateLocalStorage = (updatedFavorites: IMappedMovie[]) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  /**
   * Adds a movie to the list of favorite movies.
   *
   * @param {IMappedMovie} movie - The movie to be added to the favorites list.
   * @returns {void}
   */
  const addFavorite = (movie: IMappedMovie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  /**
   * Removes a movie from the list of favorites by its ID.
   *
   * @param {number} movieId - The ID of the movie to be removed from favorites.
   */
  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  return <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoriteContext.Provider>;
};
