import {
  Button,
  Nav,
  Navbar as NavbarBS,
  Image,
  Container,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { palette } from '../utils/colors';
import { UserIconDropdown } from './UserIconDropdown';
import { CategoriesDropdown } from './CategoriesDropdown';

/**
 * This component represents the navbarBS of our website.
 */
export function Navbar() {
  const navigate = useNavigate();

  const { loggedIn } = useContext(LoginContext);

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
              <Nav.Link href="/" style={{ fontWeight: '500' }}>
                HOME
              </Nav.Link>
              <Nav.Link href="/about" style={{ fontWeight: '500' }}>
                ABOUT US
              </Nav.Link>
              <Nav.Link href="/contactUs" style={{ fontWeight: '500' }}>
                CONTACT US
              </Nav.Link>
            </Nav>
            <div style={{ marginRight: 20 }}>
              <CategoriesDropdown />
            </div>
            <Form className="d-flex" style={{height: 40}}>
              <Form.Control
                type="search"
                placeholder="Search for an advert"
                className="me-2"
                aria-label="Search"
                style={{ borderRadius: 8, padding: 8 }}
              />
              <Button
                className="font-link"
                style={{
                  backgroundColor: palette.subSectionsBgAccent,
                  color: 'white',
                  borderColor: palette.subSectionsBgAccent,
                  borderRadius: 8,
                }}
              >
                Search
              </Button>
            </Form>
            <div style={{ marginLeft: 40 }}>
              {!loggedIn ? (
                <Button
                  className="font-link"
                  style={{
                    backgroundColor: palette.subSectionsBgAccent,
                    color: 'white',
                    borderColor: palette.subSectionsBgAccent,
                    borderRadius: 8,
                    height: 40
                  }}
                  onClick={() => navigate('/SignIn')}
                >
                  Sign In
                </Button>
              ) : (
                <UserIconDropdown />
              )}
            </div>
          </NavbarBS.Collapse>
        </Container>
      </NavbarBS>
    </>
  );
}
