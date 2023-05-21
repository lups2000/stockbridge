import { palette } from "../../utils/colors";
import homepageImage from "../../assets/homepageImage.png";
import { Button } from "react-bootstrap";
import { BodyText } from "../Text/BodyText";
import { Title } from "../Text/Title";
import { SearchBar } from "./SearchBar";
/**
 * Component to manage the section of the homepage where the user can click on "post advert" or decide to search for something
 */
export function PostOrSearch() {
  return (
    <div
      style={{
        width: "100%",
        height: 700,
        backgroundColor: palette.imageBg,
        zIndex: 1,
      }}
    >
      <img
        style={{
          maxWidth: "100%",
          height: 700,
          zIndex: -1,
          position: "absolute",
          objectFit: "cover",
        }}
        src={homepageImage}
        alt="homepage"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 50,
          alignItems: "flex-start",
          marginLeft: "10%",
        }}
      >
        <Button
          style={{
            backgroundColor: palette.subSectionsBgAccent,
            borderColor: palette.subSectionsBgAccent,
            borderRadius: 30,
            width: "20%",
            maxWidth: 260,
            marginTop: "15%",
          }}
          onClick={() => console.log("button clicked")}
        >
          <BodyText
            style={{
              margin: "auto",
              fontSize: 15,
              color: "white",
              fontWeight: 700,
            }}
            message="POST YOUR ADVERT"
          />
        </Button>
        <Title
          style={{
            marginLeft: "8%",
            fontSize: 20,
            color: "white",
          }}
          message="OR"
        />
        <SearchBar />
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "15%",
            width: "20%",
            marginRight: "15%",
          }}
        >
          <Title
            style={{
              fontSize: 36,
              color: "white",
              textAlign: "center",
              fontWeight: "bold"
            }}
            message="Out of stock?or got too much stock?No worries!"
          />
        </div>
      </div>
    </div>
  );
}
