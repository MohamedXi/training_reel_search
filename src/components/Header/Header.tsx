import { ThemeSwitcher } from '@/components';
import { APP_NAME } from '@/core/constants';
import { ERoutePaths } from '@/core/enums';
import React from 'react';

/**
 * Header component that displays the top navigation bar with a title and a theme switcher.
 *
 * @returns {React.Element} The rendered Header component.
 */
export const Header = (): React.ReactElement => {
  return (
    <header className="fixed top-0 w-full bg-background py-4 flex justify-between items-center px-4 md:px-8 z-50" data-testid="header">
      <a href={ERoutePaths.HOME}>
        <div className="text-xl font-bold">{APP_NAME}</div>
      </a>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
