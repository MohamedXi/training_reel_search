import { FC } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const Header: FC = () => {
  return (
    <header className="fixed top-0 w-full bg-background py-4 flex justify-between items-center px-4 md:px-8 z-50">
      <div className="text-xl font-bold">Reel Search</div>
      <div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
