import { createContext, useEffect, useState } from 'react';
import { User } from '../api/collections/user';
import { ApiClient } from '../api/apiClient';

export type LoginState = {
  loggedIn: boolean;
  user: User | undefined;
  setLoggedIn: (status: boolean) => void;
  setUser: (user: User | undefined) => void;
};

export type LoginContextProviderType = {
  children: React.ReactNode;
};

//create the context with its "features"
export const LoginContext = createContext<LoginState>({
  loggedIn: false,
  user: undefined,
  setLoggedIn: () => null,
  setUser: () => null,
});

//create the context provider
export const LoginContextProvider = ({
  children,
}: LoginContextProviderType) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const checkAuthentication = async () => {
      await new ApiClient()
        .get<User>('auth/verify', { withCredentials: true })
        .then((response) => {
          setLoggedIn(true);
          setUser(response); //the response of is a user
        })
        .catch(() => {
          setLoggedIn(false);
          setUser(undefined);
        });
    };

    checkAuthentication();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        user,
        setLoggedIn: (status: boolean) => setLoggedIn(status),
        setUser: (user: User | undefined) => setUser(user),
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
