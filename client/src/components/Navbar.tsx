import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
//import userLogo from "../assets/user-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { palette } from "../utils/colors";
import logo from "../assets/logo.svg"

export function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarBS sticky="top" style={{ backgroundColor: palette.pageBG , height: 100}}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            <img src={logo} alt="logo" />
          </Nav.Link>
        </Nav>
        <Button
        className="font-link"
          style={{
            backgroundColor: palette.pageBG,
            border: "none",
            color: palette.subSectionsBgAccent,
            fontSize: 20,
          }}
          onClick={() => navigate("/signIn")}
        >
          Sign In
        </Button>
        {/*<Button
          style={{
            backgroundColor: palette.pageBG,
            border: "none",
          }}
          onClick={() => navigate("/userInfo")}
        >
          <img src={userLogo} alt="user info" />
        </Button>*/}
      </Container>
    </NavbarBS>
  );
}
