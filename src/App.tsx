import React from 'react';
import { Header } from './components';
import { FavoriteProvider } from './core/context';
import Home from './pages/Home';

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
        <Home key="home" />
      </main>
    </FavoriteProvider>
  );
}
