import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { APP_NAME } from '../../core/constants';
import { Header } from './Header';

describe('Header component', () => {
  it('renders the header with the correct title', () => {
    render(<Header />);
    const titleElement = screen.getByText(APP_NAME);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the ThemeSwitcher component', () => {
    render(<Header />);
    const themeSwitcherElement = screen.getByTestId('theme-switcher');
    expect(themeSwitcherElement).toBeInTheDocument();
  });

  it('has the correct class names for styling', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toHaveClass('fixed top-0 w-full bg-background py-4 flex justify-between items-center px-4 md:px-8 z-50');
  });
});
