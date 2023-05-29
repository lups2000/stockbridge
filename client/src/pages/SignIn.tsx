import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { Title } from "../components/Text/Title";
import { palette } from "../utils/colors";
//import signUpImage from "../assets/signUp.png";
import { BodyText } from "../components/Text/BodyText";
import backIcon from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
export const SignIn: FC = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div
        style={{
          width: matches ? 600 : "100vw",
          position: "absolute",
          left: 0,
          height: "100%",
          backgroundColor: palette.pageBG,
        }}
      >
        <div style={{ marginTop: 200 }}>
          <Title
            style={{
              color: palette.loginTitle,
              paddingLeft: 40,
              fontWeight: 600,
              fontSize: 36,
            }}
            message="Sign in "
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
          <Form
            className="container-fluid"
            style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
          >
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label className="font-link">Email address</Form.Label>
              <Form.Control type="email" placeholder="name@address.com" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="font-link">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
        </div>
      </div>
      <div
        style={{
          width: "calc(100% - 600px)",
          position: "absolute",
          right: 0,
          height: "100%",
          paddingLeft: 50,
          backgroundColor: "red",
          display: matches ? undefined : "none",
        }}
      >
        {/*<img TODO
          style={{
            maxWidth: "100%",
            objectFit: "cover",
            height: "100%",
          }}
          src={signUpImage}
          alt="signUp"
        />*/}
      </div>
    </>
  );
};
