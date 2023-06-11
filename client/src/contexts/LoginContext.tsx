import { createContext, useState } from 'react';
import { User } from '../api/collections/user';

export type LoginState = {
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

export type LoginContextProviderType = {
  children: React.ReactNode;
};

//create the context with its "features"
export const LoginContext = createContext<LoginState>({
  loggedIn: false,
  setLoggedIn: () => null,
  user: undefined,
  setUser: () => null,
});

//create the context provider
export const LoginContextProvider = ({
  children,
}: LoginContextProviderType) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        setLoggedIn: (status: boolean) => setLoggedIn(status),
        user,
        setUser: (user: User | undefined) => setUser(user),
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
