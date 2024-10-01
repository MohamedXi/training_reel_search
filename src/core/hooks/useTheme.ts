import React, { useEffect, useState } from 'react';

/**
 * Change event type definition
 */
type ChangeEvent = React.ChangeEvent<HTMLSelectElement>;

/**
 * Theme type definition
 */
type Theme = 'dark' | 'light' | 'system';

/**
 * Hook return type
 */
interface UseThemeReturn {
  /**
   * Current theme value
   */
  theme: Theme;
  /**
   * Handle theme change event
   * @param {ChangeEvent} e - Event object
   */
  handleThemeChange: (e: ChangeEvent) => void;
}

/**
 * Custom hook to handle theme change
 * @param {Theme} initialTheme - Initial theme
 * @returns {UseThemeReturn}
 */
export const useTheme = (initialTheme: Theme): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme'); // Get theme from local storage
    return storedTheme ? (storedTheme as Theme) : initialTheme; // Return stored theme or initial theme
  });

  /**
   * Update theme based on user selection
   * @param {Theme} newTheme - New theme
   */
  const updateTheme = (newTheme: Theme) => {
    if (newTheme === 'system') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      document.body.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
    } else {
      document.body.setAttribute('data-theme', newTheme);
    }
  };

  /**
   * Handle theme change event
   * @param {ChangeEvent} e - Event object
   */
  const handleThemeChange = (e: ChangeEvent) => {
    const selectedTheme = e.target.value as Theme;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    updateTheme(selectedTheme);
  };

  useEffect(() => {
    if (theme === 'system') {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)'); // Check if system theme is dark

      /**
       * Handle system theme change
       */
      const handleSystemThemeChange = () => {
        updateTheme('system');
      };

      // Add event listener for system theme change
      prefersDarkScheme.addEventListener('change', handleSystemThemeChange);

      // Update theme based on system
      updateTheme('system');

      return () => {
        prefersDarkScheme.removeEventListener('change', handleSystemThemeChange); // Remove event listener
      };
    } else {
      updateTheme(theme);
    }
  }, [theme]);

  return { theme, handleThemeChange };
};
