import { Button, Nav, Navbar as NavbarBS } from "react-bootstrap";
import userLogo from "../assets/user-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { palette } from "../utils/colors";
import { ApiClient } from "../api/apiClient";

/**
 * This component represents the navbar of our website.
 */
export function Navbar() {
  const navigate = useNavigate();

  const { loggedIn, setLoggedIn, setUser } = useContext(LoginContext);

  const handleLogoutClick = () => {
    new ApiClient()
      .post("/auth/logout", {}, { withCredentials: true })
      .then(() => {
        setLoggedIn(false);
        setUser(undefined);
        localStorage.removeItem("loginStatus") // IDK, maybe it's not the best idea, i must check
        localStorage.removeItem("currentUser")
        navigate("/"); //come back to homepage
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavbarBS
      sticky="top"
      style={{ backgroundColor: palette.pageBG, height: 100 }}
    >
      <Nav className="me-auto">
        <Nav.Link to="/" as={NavLink}>
          <img src={logo} alt="logo" />
        </Nav.Link>
      </Nav>
      {!loggedIn ? (
        <Button
          className="font-link"
          style={{
            backgroundColor: palette.pageBG,
            border: "none",
            color: palette.subSectionsBgAccent,
            fontSize: 20,
          }}
          onClick={() => navigate("/SignIn")}
        >
          Sign In
        </Button>
      ) : (
        <div>
          <Button
            className="font-link"
            style={{
              backgroundColor: palette.pageBG,
              border: "none",
              color: palette.subSectionsBgAccent,
              fontSize: 20,
            }}
            onClick={() => handleLogoutClick()}
          >
            Logout
          </Button>
          <Button
            style={{
              backgroundColor: palette.pageBG,
              border: "none",
            }}
            onClick={() => navigate("/userInfo")}
          >
            <img src={userLogo} alt="user info" />
          </Button>
        </div>
      )}
    </NavbarBS>
  );
}
