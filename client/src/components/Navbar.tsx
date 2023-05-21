import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import userLogo from "../assets/user-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { palette } from "../utils/colors";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarBS sticky="top" style={{ backgroundColor: palette.pageBG }}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Logo StockBridge
          </Nav.Link>
        </Nav>
        <Button
          style={{
            backgroundColor: palette.pageBG,
            border: "none",
          }}
          onClick={() => navigate("/userInfo")}
        >
          <img src={userLogo} alt="user info" />
        </Button>
      </Container>
    </NavbarBS>
  );
}
