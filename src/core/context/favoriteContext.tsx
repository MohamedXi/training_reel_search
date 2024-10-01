import React, { createContext, useEffect, useState } from 'react';
import { IMappedMovie, IMappedMovieDetail } from '../interfaces';
import { TFavoriteContext } from '../types';

export const FavoriteContext = createContext<TFavoriteContext | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<(IMappedMovie | IMappedMovieDetail)[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const updateLocalStorage = (updatedFavorites: (IMappedMovie | IMappedMovieDetail)[]) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const addFavorite = (movie: IMappedMovie | IMappedMovieDetail) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  return <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoriteContext.Provider>;
};
