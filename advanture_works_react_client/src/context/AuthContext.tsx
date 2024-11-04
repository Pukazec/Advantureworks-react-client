import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../config/routes/definedRoutes';

interface Props {
  children: ReactNode;
}

export interface IUseAuthValues {
  userName: string | undefined;
  setUserName: (newState: string) => void;
  jwt: string | undefined;
  setJwt: (newState: string) => void;
  logout: () => void;
}

const defaultState: IUseAuthValues = {
  userName: undefined,
  setUserName: () => {
    throw new Error('Function not implemented.');
  },
  jwt: undefined,
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
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [jwt, setJwt] = useState<string | undefined>(undefined);

  const logout = () => {
    setUserName(undefined);
    setJwt(undefined);
    navigate(routes.ROUTE_USER_LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        jwt,
        setJwt,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
