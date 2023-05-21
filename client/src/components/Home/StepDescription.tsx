import { BodyText } from "../Text/BodyText";
import { Title } from "../Text/Title";
import { palette } from "../../utils/colors";

type StepDescriptionProps = {
  number: number;
  message: string;
  icon: string
};

/**
 * Component that displays the step number, the icon and the relative message.
 */
export function StepDescription(props: StepDescriptionProps) {
  return (
    <div
      style={{
        width: 200,
        height: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Title
        style={{
          textAlign: "center",
          fontSize: 24,
          color: palette.subSectionsBgAccent,
          fontWeight: 900,
        }}
        message={props.number + "."}
      />
      <img style={{ alignSelf: "center" }} src={props.icon} alt="howWorks1" />
      <BodyText
        style={{
          textAlign: "center",
          fontSize: 15,
          color: "black",
          fontWeight: 100,
          marginRight: 10,
        }}
        message={props.message}
      />
    </div>
  );
}
