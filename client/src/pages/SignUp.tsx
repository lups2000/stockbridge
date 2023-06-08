import { FC } from "react";
import { palette } from "../utils/colors";
//import signUpImage from "../assets/signUp.png";
import useMediaQuery from "../hooks/useMediaQuery";
import { SignupForm } from "../components/SignUp/SignupForm";
export const SignUp: FC = () => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div
        style={{
          width: matches ? 600 : "100vw",
          position: "absolute",
          left: 0,
          minHeight: "100vh",
          backgroundColor: palette.pageBG,
        }}
      >
        <div style={{ marginTop: 100 }}>
          <SignupForm />
        </div>
      </div>
      <div
        style={{
          width: "calc(100% - 600px)",
          position: "fixed",
          right: 0,
          height: "100vh",
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
