import { Button, Dropdown } from "react-bootstrap";
import { palette } from "../../utils/colors";
import useMediaQuery from "../../hooks/useMediaQuery";

/**
 * Component that will manage the search of an advert...
 */
export function SearchBar() {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 30,
        paddingLeft: 15,
      }}
    >
      <div
        style={{
          margin: 3,
          display: "flex",
          flexDirection: matches ? "row" : "column",
          gap: 20,
        }}
      >
        <input
          style={{ border: "none", width: 250 }}
          placeholder="What are you searching for?"
        ></input>
        <input style={{ border: "none" }} placeholder="Location"></input>
        <Dropdown>
          <Dropdown.Toggle
            style={{ backgroundColor: "white", border: "none", color: "gray" }}
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
            border: "none",
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
