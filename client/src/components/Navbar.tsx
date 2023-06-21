import {
  Button,
  Nav,
  Navbar as NavbarBS,
  Image,
  Container,
  Form,
  NavDropdown,
  Dropdown,
} from 'react-bootstrap';
import userLogo from '../assets/user-logo.svg';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { palette } from '../utils/colors';
import { ApiClient } from '../api/apiClient';

/**
 * This component represents the navbarBS of our website.
 */
export function Navbar() {
  const navigate = useNavigate();

  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLogoutClick = () => {
    new ApiClient()
      .post('/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setLoggedIn(false);
        navigate('/'); //come back to homepage
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarBS
        expand="lg"
        sticky="top"
        style={{ backgroundColor: palette.pageBG }}
      >
        <Container fluid>
          <NavbarBS.Brand>
            <Image
              alt="logo"
              src={logo}
              width={200}
              height={50}
              className="d-inline-block align-top"
            />
          </NavbarBS.Brand>
          <NavbarBS.Toggle aria-controls="navbarBSScroll" />
          <NavbarBS.Collapse id="navbarBSScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About us</Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown
                title="Categories"
                //id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" style={{ marginRight: 50 }}>
              <Form.Control
                type="search"
                placeholder="Search for an advert"
                className="me-2"
                aria-label="Search"
              />
              <Button
                className="font-link"
                style={{
                  backgroundColor: palette.pageBG,
                  borderColor: 'red',
                  color: palette.subSectionsBgAccent,
                }}
              >
                Search
              </Button>
            </Form>
            <div>
              {!loggedIn ? (
                <Button
                  className="font-link"
                  style={{
                    backgroundColor: palette.pageBG,
                    borderColor: 'red',
                    color: palette.subSectionsBgAccent,
                  }}
                  onClick={() => navigate('/SignIn')}
                >
                  Sign In
                </Button>
              ) : (
                <div>
                  <Button
                    className="font-link"
                    style={{
                      backgroundColor: palette.pageBG,
                      border: 'none',
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
                      border: 'none',
                    }}
                    onClick={() => navigate('/userInfo')}
                  >
                    <img src={userLogo} alt="user info" />
                  </Button>
                </div>
              )}
            </div>
          </NavbarBS.Collapse>
        </Container>
      </NavbarBS>
      {/*<NavbarBSBS
      sticky="top"
      style={{ backgroundColor: palette.pageBG, height: 80 }}
    >
      <Nav className="me-auto">
        <Nav.Link to="/" as={NavLink}>
          <Image src={logo} alt="logo" width={250} height={250} />
        </Nav.Link>
      </Nav>
      {!loggedIn ? (
        <Button
          className="font-link"
          style={{
            backgroundColor: palette.pageBG,
            border: 'none',
            color: palette.subSectionsBgAccent,
            fontSize: 20,
          }}
          onClick={() => navigate('/SignIn')}
        >
          Sign In
        </Button>
      ) : (
        <div>
          <Button
            className="font-link"
            style={{
              backgroundColor: palette.pageBG,
              border: 'none',
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
              border: 'none',
            }}
            onClick={() => navigate('/userInfo')}
          >
            <img src={userLogo} alt="user info" />
          </Button>
        </div>
      )}
          </NavbarBSBS>*/}
    </>
  );
}
