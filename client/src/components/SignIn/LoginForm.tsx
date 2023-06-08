import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { palette } from "../../utils/colors";
import { BodyText } from "../Text/BodyText";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/functions";
import { ApiClient } from "../../api/apiClient";
import { UserResponse, login } from "../../api/collections/user";

/**
 * This component represents the form to manage the login and it makes also the axios call to the relative endpoint.
 */
export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { setLoggedIn, setUser } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default submit and page reload

    if (email && password && isValidEmail(email)) {
      /*
      try {
        const response: UserResponse = await login(email, password);

        setError(false);
        setErrorMessage("");
        setLoggedIn(true);

        setUser(response.user);

        localStorage.setItem("loginStatus", JSON.stringify(true)); //IDK maybe it's not the best idea, i must check
        localStorage.setItem("currentUser", JSON.stringify(response.user));

        navigate("/"); //return to the homepage
      } catch (error: any) {
        setError(true);
        if (error.response?.status === 400) {
          setErrorMessage("Missing Username or Password");
        } else if (error.response?.status === 401) {
          setErrorMessage("Invalid Credentials");
        } else {
          setErrorMessage("No Server Response");
        }
        setLoggedIn(false);
        setUser(undefined);
      }*/

      new ApiClient()
        .post<UserResponse>(
          "/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setError(false);
          setErrorMessage("");
          setLoggedIn(true);

          setUser(response.user);

          localStorage.setItem("loginStatus", JSON.stringify(true)); //IDK maybe it's not the best idea, i must check
          localStorage.setItem("currentUser", JSON.stringify(response.user));

          navigate("/"); //return to the homepage
        })
        .catch((error) => {
          setError(true);
          if (error.response?.status === 400) {
            setErrorMessage("Missing Username or Password");
          } else if (error.response?.status === 401) {
            setErrorMessage("Invalid Credentials");
          } else {
            setErrorMessage("No Server Response");
          }
          setLoggedIn(false);
          setUser(undefined);
        });
    } else {
      setError(true);
      setErrorMessage("Email format invalid");
    }
  };

  return (
    <Form
      className="container-fluid"
      style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
      method="POST"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <Form.Group className="mb-2">
        <Form.Label className="font-link">Email address</Form.Label>
        <Form.Control
          type="email"
          required
          placeholder="name@address.com"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="font-link">Password</Form.Label>
        <Form.Control
          type="password"
          required
          placeholder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </Form.Group>
      {error ? (
        <BodyText style={{ color: "red" }} message={errorMessage}></BodyText>
      ) : undefined}
      <div className="d-grid font-link" style={{ marginTop: 30 }}>
        <Button
          type="submit"
          style={{
            color: "white",
            backgroundColor: palette.subSectionsBgAccent,
            borderColor: palette.subSectionsBgAccent,
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          SIGN IN
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            marginTop: 10,
          }}
        >
          <BodyText style={{ fontSize: 15 }} message="No account?" />
          <a href="/signUp">Sign up</a>
        </div>
      </div>
    </Form>
  );
};
