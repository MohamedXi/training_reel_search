import { fireEvent, render, screen } from '@testing-library/react';
import { useLocalStorage } from 'usehooks-ts';
import { describe, expect, it, vi } from 'vitest';
import { ThemeSwitcher } from './ThemeSwitcher';

// Typage explicite du mock
type UseLocalStorageReturnType = [string, (value: string) => void];

// Mock du hook `useLocalStorage`
vi.mock('usehooks-ts', () => ({
  useLocalStorage: vi.fn(),
}));

describe('ThemeSwitcher Component', () => {
  it('should display correct icons for light and dark themes', () => {
    const setThemeMock = vi.fn();

    (useLocalStorage as unknown as vi.Mock).mockReturnValue(['light', setThemeMock] as UseLocalStorageReturnType);

    render(<ThemeSwitcher />);

    const switcher = screen.getByTestId('theme-switcher');

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    expect(screen.getByText('Use setting')).toBeInTheDocument();
    expect(screen.getByText('Use setting')).toHaveClass('sr-only');

    fireEvent.click(switcher);

    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});
