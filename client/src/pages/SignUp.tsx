import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Title } from "../components/Text/Title";
import { palette } from "../utils/colors";
//import signUpImage from "../assets/signUp.png";
import { BodyText } from "../components/Text/BodyText";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/back.svg";
import useMediaQuery from "../hooks/useMediaQuery";
import addIcon from "../assets/add.svg";
import { PaymentModal } from "../components/SignUp/PaymentModal";
export const SignUp: FC = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 768px)");

  const [isFirstPartCompleted, setIsFirstPartCompleted] =
    useState<boolean>(false);

  const [isModalShowing, setIsModalShowing] = useState(false);

  return (
    <>
      <div
        style={{
          width: matches ? 600 : "100vw",
          position: "absolute",
          left: 0,
          height: "100%",
          overflowY: isFirstPartCompleted && !matches ? "scroll" : undefined,
          backgroundColor: palette.pageBG,
        }}
      >
        <div style={{ marginTop: isFirstPartCompleted ? 100 : 200 }}>
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
          {!isFirstPartCompleted ? (
            <>
              <Title
                style={{
                  color: palette.loginTitle,
                  paddingLeft: 40,
                  fontWeight: 600,
                  fontSize: 36,
                }}
                message="Sign up "
              />
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
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label className="font-link">
                    Confirm your Password
                  </Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="d-grid font-link" style={{ marginTop: 50 }}>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: palette.subSectionsBgAccent,
                      borderColor: palette.subSectionsBgAccent,
                      fontSize: 20,
                      fontWeight: 500,
                    }}
                    onClick={() => setIsFirstPartCompleted(true)}
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
                    <BodyText
                      style={{ fontSize: 15 }}
                      message="Have an account?"
                    />
                    <a href="/signIn">Sign in</a>
                  </div>
                </div>
              </Form>
            </>
          ) : (
            <>
              <Title
                style={{
                  color: palette.loginTitle,
                  paddingLeft: 40,
                  fontWeight: 600,
                  fontSize: 36,
                }}
                message="One more step..."
              />
              <Form
                className="container-fluid"
                style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
                onSubmit={() => navigate("/")}
              >
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label className="font-link">Store Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label className="font-link">Category</Form.Label>
                  <Form.Control type="text" placeholder="Category" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label className="font-link">Street Address*</Form.Label>
                  <Form.Control type="text" placeholder="Street" />
                </Form.Group>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label className="font-link">City*</Form.Label>
                      <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label className="font-link">
                        State/Province
                      </Form.Label>
                      <Form.Control type="text" placeholder="State/Province" />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label className="font-link">
                        Postal Code*
                      </Form.Label>
                      <Form.Control type="text" placeholder="Postal Code" />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label className="font-link">Country*</Form.Label>
                  <Form.Control type="text" placeholder="Country" />
                </Form.Group>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalShowing(true)}
                >
                  <img src={addIcon} alt="addIcon" />
                  <BodyText
                    style={{ fontSize: 15, marginTop: 15, marginLeft: 8 }}
                    message="Add a payment method"
                  />
                </div>
                <div className="d-grid font-link" style={{ marginTop: 15 }}>
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
                    <BodyText
                      style={{ fontSize: 15 }}
                      message="Have an account?"
                    />
                    <a href="/signIn">Sign in</a>
                  </div>
                </div>
              </Form>
            </>
          )}
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
      {isModalShowing ? (
        <PaymentModal
          isShowing={isModalShowing}
          onClose={() => setIsModalShowing(false)}
        />
      ) : undefined}
    </>
  );
};
