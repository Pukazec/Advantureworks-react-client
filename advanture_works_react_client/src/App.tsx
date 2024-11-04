import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { routeElements } from './config/routes/routeElements';
import { AuthContextProvider } from './context/AuthContext';
import { HttpContextProvider } from './context/HttpContext';

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
