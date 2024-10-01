import routes from '@/core/route/routes';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

/**
 * RoutesWrapper component is responsible for wrapping the application's routes
 * within a Router component. It maps over the `routes` array and dynamically
 * creates Route components for each route configuration.
 *
 * @component
 * @returns {JSX.Element} The rendered Router with nested Routes.
 */
export const RoutesWrapper: React.FC = () => {
  return (
    <Router basename="/training_reel_search">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};
