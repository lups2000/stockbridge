import { BodyText } from "../Text/BodyText";
import { Title } from "../Text/Title";
import { palette } from "../../utils/colors";
import { Image } from "react-bootstrap";

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
          fontWeight: 700,
        }}
        message={props.number + "."}
      />
      <Image style={{ alignSelf: "center" }} src={props.icon} />
      <BodyText
        style={{
          textAlign: "center",
          fontSize: 15,
          color: "black",
          marginRight: 10,
          fontWeight: 200
        }}
        message={props.message}
      />
    </div>
  );
}
