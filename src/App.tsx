import { Header, RoutesWrapper } from '@/components';
import React from 'react';
import { FavoriteProvider } from './core/context';

/**
 * The main App component that serves as the root of the application.
 *
 * @returns {React.Element} The rendered App component.
 */
export default function App(): React.ReactElement {
  return (
    <FavoriteProvider>
      <Header key="header" />
      <main className="pt-16">
        <RoutesWrapper key="routes" />
      </main>
    </FavoriteProvider>
  );
}
