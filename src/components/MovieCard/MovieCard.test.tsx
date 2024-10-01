import { useFavorites } from '@/core/hooks';
import { IMappedMovie } from '@/core/interfaces';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { MovieCard } from './MovieCard';

vi.mock('../../core/hooks', () => ({
  useFavorites: vi.fn(),
}));

const mockMovie: IMappedMovie = {
  adult: false,
  backdropImage: null,
  genreIds: [],
  id: 1,
  originalLanguage: 'en',
  originalTitle: 'Test Movie',
  overview: 'Test overview',
  popularity: 2.5,
  posterImage: '/test-poster.jpg',
  releaseDate: '2023-01-01',
  title: 'Test Movie',
  video: false,
  rating: 5,
  voteCount: 1,
};

describe('MovieCard', () => {
  it('renders movie details correctly', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      favorites: [],
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test-poster.jpg');
  });

  it('adds movie to favorites when heart icon is clicked', () => {
    const addFavorite = vi.fn();
    const removeFavorite = vi.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite,
      removeFavorite,
      favorites: [],
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    const heartButton = screen.getByTestId('favorite-button');
    fireEvent.click(heartButton);

    expect(addFavorite).toHaveBeenCalledWith(mockMovie);
  });

  it('removes movie from favorites when heart icon is clicked', () => {
    const addFavorite = vi.fn();
    const removeFavorite = vi.fn();

    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite,
      removeFavorite,
      favorites: [mockMovie],
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    const heartButton = screen.getByTestId('favorite-button');
    fireEvent.click(heartButton);

    expect(removeFavorite).toHaveBeenCalledWith(mockMovie.id);
  });

  it('displays heart icon in red if movie is a favorite', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      favorites: [mockMovie],
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    const heartIcon = screen.getByTestId('favorite-button').firstChild;
    expect(heartIcon).toHaveClass('text-red-700');
  });

  it('displays heart icon in gray if movie is not a favorite', () => {
    (useFavorites as jest.Mock).mockReturnValue({
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      favorites: [],
    });

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    const heartIcon = screen.getByTestId('favorite-button').firstChild;
    expect(heartIcon).toHaveClass('text-gray-400');
  });
});
