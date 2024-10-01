import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from '../../core/route/routes';

export const RoutesWrapper: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};
