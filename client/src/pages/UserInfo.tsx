import { useContext } from "react";
import { Page } from "../components/Page";
import { LoginContext } from "../contexts/LoginContext";

export function UserInfo() {
  const { loggedIn, user } = useContext(LoginContext);
  return (
    <Page>
      <h1>User info</h1>
      {loggedIn ? <h3>Welcome back {user?.name}</h3> : undefined}
    </Page>
  );
}
