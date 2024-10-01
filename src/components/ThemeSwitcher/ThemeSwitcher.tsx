import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const [enabled, setEnabled] = useState(theme === 'dark');

  const handleThemeChange = (enabled: boolean) => {
    setTheme(enabled ? 'dark' : 'light');
    setEnabled(enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleThemeChange}
      className={classNames(
        enabled ? 'bg-gray-400' : 'bg-yellow-600',
        'relative flex items-center w-12 h-6 rounded-full transition-colors duration-200 ease-in-out px-0.5'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-6' : 'translate-x-0',
          'pointer-events-none relative inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-gray-400" />
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-gray-600" />
        </span>
      </span>
    </Switch>
  );
};
