import { ColoredLine } from "../components/ColoredLine";
import { StepDescription } from "../components/Home/StepDescription";
import { Title } from "../components/Text/Title";
import { palette } from "../utils/colors";
import howWorks1 from "../assets/howWorks1.svg";
import howWorks2 from "../assets/howWorks2.svg";
import howWorks3 from "../assets/howWorks3.svg";
import { PostOrSearch } from "../components/Home/PostOrSearch";
import useMediaQuery from "../hooks/useMediaQuery";
import { Page } from "../components/Page";
import { Filters } from "../components/Home/Filters";
import { BodyText } from "../components/Text/BodyText";
import sortIcon from "../assets/sort-icon.svg";
import { Text } from "../components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const stepDescriptions: { message: string; icon: string }[] = [
  {
    message: "Search for what you are looking for.",
    icon: howWorks1,
  },
  {
    message: "Find the item you are looking for in the search results.",
    icon: howWorks2,
  },
  {
    message: "Make an offer to the seller.",
    icon: howWorks3,
  },
];

export function Home() {
  const matches = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  return (
    <Page>
      <PostOrSearch loggedin= {true}/>
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: palette.subSectionsBgLighter,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 70,
          paddingBottom: 50,
        }}
      >
        <Title
          style={{
            textAlign: "center",
            fontSize: 28,
            color: "black",
            fontWeight: 500,
            paddingTop: 50,
            marginBottom: -60,
          }}
          message="HOW IT WORKS"
        />
        <ColoredLine
          color={palette.subSectionsBgAccent}
          height={5}
          width={60}
        />
        <div
          style={{
            display: "flex",
            flexDirection: matches ? "row" : "column",
            gap: matches ? 70 : 20,
          }}
        >
          {stepDescriptions.map((step, index) => {
            return (
              <StepDescription
                number={index + 1}
                message={step.message}
                icon={step.icon}
              />
            );
          })}
        </div>
      </div>
      <div style={{ height: 2000 }}>
        <Title
          style={{ fontSize: 36, textAlign: "center", paddingTop: 20 }}
          message="Active Adverts"
        ></Title>
        <div style={{ marginTop: 100 }}>
          <img
            src={sortIcon}
            alt="sortIcon"
            style={{ position: "absolute", right: 0 }}
          />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
              }}
            >
                  <BodyText
                    style={{
                      color: palette.subSectionsBgAccent,
                      fontSize: 30,
                      fontWeight: 600,
                    }}
                    message="Selling"
                  />
                  <BodyText
                    style={{ color: palette.subSectionsBgLighter, fontSize: 30 }}
                    message="Buying"
                  />
                  </div>
          <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                justifyContent: "center",
              }}>
          <Filters/>
          <Button onClick={() => navigate("/productoverview")}>
          <BodyText style={{ color: palette.loginTitle, fontSize: 30 }} 
                  message="Product"/>
          </Button>
          
          </div>

        </div>
      </div>
    </Page>
  );
}
