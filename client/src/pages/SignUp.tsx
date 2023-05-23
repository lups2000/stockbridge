import { FC } from "react";
import { Button, Form } from "react-bootstrap";
import { Title } from "../components/Text/Title";
import { palette } from "../utils/colors";
import signUpImage from "../assets/signUp.png";
import { BodyText } from "../components/Text/BodyText";
export const SignUp: FC = () => {
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
            }}
            message="Sign up "
          />
          <Form>
            <Form.Group className="mb-2 mx-sm-4" controlId="formBasicEmail">
              <Form.Label style={{ fontFamily: "Poppins" }}>
                Email address
              </Form.Label>
              <Form.Control type="email" placeholder="name@address.com" />
            </Form.Group>
            <Form.Group className="mb-2 mx-sm-4" controlId="formBasicPassword">
              <Form.Label style={{ fontFamily: "Poppins" }}>
                Password
              </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-2 mx-sm-4" controlId="formBasicPassword">
              <Form.Label style={{ fontFamily: "Poppins" }}>
                Confirm your Password
              </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="mx-sm-4 d-grid" style={{ marginTop: 50 }}>
              <Button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: palette.subSectionsBgAccent,
                  borderColor: palette.subSectionsBgAccent,
                  fontSize: 20,
                  fontWeight: "500",
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
