import { jwtDecode } from 'jwt-decode';
import { createContext, FC, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_JWT } from '../utils/constants/storage';
import { routes } from '../utils/routes/definedRoutes';

interface Props {
  children: ReactNode;
}

export interface IUseAuthValues {
  email: () => string | undefined;
  jwt: () => string | undefined;
  setJwt: (newState: string) => void;
  logout: () => void;
}

const defaultState: IUseAuthValues = {
  email: () => {
    throw new Error('Function not implemented.');
  },
  jwt: () => {
    throw new Error('Function not implemented.');
  },
  setJwt: () => {
    throw new Error('Function not implemented.');
  },
  logout: () => {
    throw new Error('Function not implemented.');
  },
};

const AuthContext = createContext<IUseAuthValues>(defaultState);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_JWT);
    navigate(routes.ROUTE_USER_LOGIN);
  };

  const setJwt = (newState: string) => {
    localStorage.setItem(LOCAL_STORAGE_JWT, newState);
  };

  const jwt = () => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT);
    // arrow function
    if (!jwt) return undefined;
    return jwt;
  };

  const email = () => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT);
    if (!jwt) return undefined;
    const decodedJwt: any = jwtDecode(jwt);
    return decodedJwt.email;
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        jwt,
        setJwt,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
