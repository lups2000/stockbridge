import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { palette } from "../../utils/colors";
import { BodyText } from "../Text/BodyText";
import axiosClient from "../../api/apiClient";


export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();


  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default submit and page reload

    await axiosClient
      .post("/auth/login", { email, password })
      .catch((error) => {
        if (!error?.response) {
          console.log("No Server Response");
        } else if (error.response?.status === 400) {
          console.log("Missing Username or Password");
        } else if (error.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      })
      .then((response) => {
        //TODO
      });
  };

  return (
    <Form
      className="container-fluid"
      style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
      method="POST"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <Form.Group className="mb-2" controlId="formBasicEmail">
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
      <Form.Group className="mb-2" controlId="formBasicPassword">
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
      <div className="d-grid font-link" style={{ marginTop: 50 }}>
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
