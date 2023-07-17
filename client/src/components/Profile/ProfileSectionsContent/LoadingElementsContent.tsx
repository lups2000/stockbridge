import { FadeLoader } from "react-spinners";
import { palette } from "../../../utils/colors";

function LoadingElementsContent() {
    return <FadeLoader
        color={palette.subSectionsBgAccent}
        role="status"
        style={{
            position: 'absolute',
            marginTop: '8em',
            marginLeft: '37%',
        }} />
}

export default LoadingElementsContent;