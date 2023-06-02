import { createContext, useState } from "react";
import { User } from "../api/collections/user";

export type LoginState = {
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  user: string; //in the future this is type User
  setUser: (user: string) => void;
};

export type LoginContextProviderType = {
  children: React.ReactNode;
};

export const LoginContext = createContext<LoginState>({
  loggedIn: false,
  setLoggedIn: () => null,
  user: "",
  setUser: () => null,
});

export const LoginContextProvider = ({
  children,
}: LoginContextProviderType) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string>(""); //type User in the future
  return (
    <LoginContext.Provider
      value={{
        loggedIn,
        setLoggedIn: (status: boolean) => setLoggedIn(status),
        user,
        setUser: (user: string) => setUser(user),
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
