import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import { HttpContextProvider } from './context/HttpContext';
import { routeElements } from './utils/routes/routeElements';

const App: React.FC = () => {
  const routing = useRoutes(routeElements);
  return (
    <AuthContextProvider>
      <HttpContextProvider>
        <>{routing}</>
      </HttpContextProvider>
    </AuthContextProvider>
  );
};

export default App;
