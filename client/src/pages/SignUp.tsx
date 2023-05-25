import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { Title } from "../components/Text/Title";
import { palette } from "../utils/colors";
import signUpImage from "../assets/signUp.png";
import { BodyText } from "../components/Text/BodyText";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.svg";
export const SignUp: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "40%",
          position: "absolute",
          left: 0,
          height: "100%",
          backgroundColor: palette.pageBG,
        }}
      >
        <div style={{ marginTop: "25%" }}>
          <Title
            style={{
              color: palette.loginTitle,
              textAlign: "center",
              fontWeight: 600,
            }}
            message="Sign up "
          />
          <Button
            style={{
              position: "absolute",
              left: 20,
              top: 20,
              backgroundColor: palette.pageBG,
              border: "none",
            }}
            onClick={() => navigate("/")}
          >
            <img src={backIcon} alt="delete" />
          </Button>
          <Form>
            <Form.Group className="mb-2 mx-sm-4" controlId="formBasicEmail">
              <Form.Label className="font-link">Email address</Form.Label>
              <Form.Control type="email" placeholder="name@address.com" />
            </Form.Group>
            <Form.Group className="mb-2 mx-sm-4" controlId="formBasicPassword">
              <Form.Label className="font-link">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-2 mx-sm-4" controlId="formBasicPassword">
              <Form.Label className="font-link">
                Confirm your Password
              </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="mx-sm-4 d-grid font-link" style={{ marginTop: 50 }}>
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
                SIGN UP
              </Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  marginTop: 10,
                }}
              >
                <BodyText style={{ fontSize: 15 }} message="Have an account?" />
                <a href="/signIn">Sign in</a>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div
        style={{
          width: "60%",
          position: "absolute",
          right: 0,
          height: "100%",
          paddingLeft: 50,
          backgroundColor: palette.pageBG,
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            objectFit: "cover",
            height: "100%",
          }}
          src={signUpImage}
          alt="signUp"
        />
      </div>
    </>
  );
};
