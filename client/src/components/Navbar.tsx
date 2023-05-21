import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import userLogo from "../assets/user-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarBS sticky="top" style={{ backgroundColor: "#FEF1F8" }}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Logo StockBridge
          </Nav.Link>
        </Nav>
        <Button
          style={{
            backgroundColor: "#FEF1F8",
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
