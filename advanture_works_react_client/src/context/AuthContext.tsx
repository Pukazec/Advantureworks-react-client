import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes/definedRoutes';

interface Props {
  children: ReactNode;
}

export interface IUseAuthValues {
  email: string | undefined;
  setEmail: (newState: string) => void;
  jwt: string | undefined;
  setJwt: (newState: string) => void;
  logout: () => void;
}

const defaultState: IUseAuthValues = {
  email: undefined,
  setEmail: () => {
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
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [jwt, setJwt] = useState<string | undefined>(undefined);

  const logout = () => {
    setEmail(undefined);
    setJwt(undefined);
    navigate(routes.ROUTE_USER_LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        jwt,
        setJwt,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
