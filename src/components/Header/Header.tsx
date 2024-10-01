import React from 'react';
import { APP_NAME } from '../../core/constants';
import { ThemeSwitcher } from '../ThemeShwitcher/ThemeSwitcher';

/**
 * Header component that displays the top navigation bar with a title and a theme switcher.
 *
 * @returns {React.Element} The rendered Header component.
 */
export const Header = (): React.ReactElement => {
  return (
    <header className="fixed top-0 w-full bg-background py-4 flex justify-between items-center px-4 md:px-8 z-50">
      <div className="text-xl font-bold">{APP_NAME}</div>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
