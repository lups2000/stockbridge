import {
  Button,
  Nav,
  Navbar as NavbarBS,
  Image,
  Container,
  Form,
} from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { palette } from '../utils/colors';
import { UserIconDropdown } from './UserIconDropdown';
import { CategoriesDropdown } from './CategoriesDropdown';
import useMediaQuery from '../hooks/useMediaQuery';
import "./override.css"

/**
 * This component represents the navbarBS of our website.
 */
export function Navbar() {
  const navigate = useNavigate();

  const { loggedIn, isLoading } = useContext(LoginContext);

  const matches = useMediaQuery('(min-width: 992px)'); // to detect if the navbar is expanded or not(only way I've found)
  //if matches is true is expanded

  const [search, setSearch] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>(search.get('q') ?? '');

  const handleSearchClick = () => {
    if (searchInput.length > 0) {
      const currentUrl = window.location.pathname;
      if (currentUrl === '/adverts') {
        search.set('q', searchInput);
        setSearch(search,{replace: true});
      } else {
        navigate(`/adverts?q=${searchInput}`);
      }
    }
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      return;
    } else {
      search.delete('q');
      setSearch(search,{replace: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <>
      <NavbarBS
        expand="lg"
        sticky="top"
        style={{ backgroundColor: palette.pageBG }}
        //className='no-padding-right'
      >
        <Container fluid>
          <NavbarBS.Brand>
            <Image
              alt="logo"
              src={logo}
              width={200}
              height={50}
              className="d-inline-block align-top"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
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
            <div
              style={{
                position: 'relative',
                marginRight: matches ? 20 : 0,
                marginBottom: matches ? 0 : 28,
              }}
            >
              <CategoriesDropdown />
            </div>
            <Form className="d-flex" style={{ height: 40 }}>
              <Form.Control
                type="search"
                placeholder="Search for an advert"
                className="me-2"
                aria-label="Search"
                style={{ borderRadius: 8, padding: 8 }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSearchClick();
                  }
                }}
              />
              <Button
                className="font-link"
                style={{
                  backgroundColor: palette.subSectionsBgAccent,
                  color: 'white',
                  borderColor: palette.subSectionsBgAccent,
                  borderRadius: 8,
                }}
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </Form>
            <div
              style={{
                marginLeft: matches ? 20 : 0,
                marginTop: matches ? 0 : 20,
                marginBottom: matches ? 0 : 10,
              }}
            >
              {isLoading ? (
                //only a placeholder
                <div style={{ width: 45, height: 45 }} />
              ) : !loggedIn ? (
                <Button
                  className="font-link"
                  style={{
                    backgroundColor: palette.subSectionsBgAccent,
                    color: 'white',
                    borderColor: palette.subSectionsBgAccent,
                    borderRadius: 8,
                    height: 40,
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
