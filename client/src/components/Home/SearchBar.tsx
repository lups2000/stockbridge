import { Button, Dropdown } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import useMediaQuery from '../../hooks/useMediaQuery';

/**
 * Component that will manage the search of an advert...
 */
export function SearchBar() {
  const matches = useMediaQuery('(min-width: 1100px)');
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 30,
        padding: matches ? 3 : 7,
        width: matches ? undefined : '60%',
      }}
    >
      <div
        style={{
          margin: 3,
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
          gap: matches ? 20 : 10,
        }}
      >
        <input
          style={{ border: 'none', width: 250, borderRadius: 30 }}
          placeholder="What are you searching for?"
        ></input>
        <div
          style={{
            width: matches ? 1 : '100%',
            height: matches ? undefined : 1,
            backgroundColor: 'LightGray',
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <input
          style={{ border: 'none', borderRadius: 30 }}
          placeholder="Location"
        ></input>
        <div
          style={{
            width: matches ? 1 : '100%',
            height: matches ? undefined : 1,
            backgroundColor: 'LightGray',
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: 'white',
              border: 'none',
              color: 'Gray',
              paddingLeft: 0,
            }}
            id="dropdown-basic"
          >
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Flowers</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Food</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Other</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          style={{
            border: 'none',
            backgroundColor: palette.subSectionsBgAccent,
            borderRadius: 30,
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
