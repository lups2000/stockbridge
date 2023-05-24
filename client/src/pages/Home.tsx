import { ColoredLine } from "../components/ColoredLine";
import { StepDescription } from "../components/Home/StepDescription";
import { Title } from "../components/Text/Title";
import { palette } from "../utils/colors";
import howWorks1 from "../assets/howWorks1.svg";
import howWorks2 from "../assets/howWorks2.svg";
import howWorks3 from "../assets/howWorks3.svg";
import { PostOrSearch } from "../components/Home/PostOrSearch";
import { Navbar } from "../components/Navbar";

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
  return (
    <>
      <Navbar />
      <PostOrSearch />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 400,
          backgroundColor: palette.subSectionsBgLighter,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
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
          width={120}
        />
        <div style={{ display: "flex", flexDirection: "row", gap: 70 }}>
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
    </>
  );
}
