import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders the Header component', () => {
    render(<App />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the RoutesWrapper component', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('applies the correct class to the main element', () => {
    render(<App />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('pt-16');
  });
});
