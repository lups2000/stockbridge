import useMediaQuery from "../../hooks/useMediaQuery";

//import styles from "./profile.scss"
require('./tabStyles.scss');

type LeftTabProps = {
  icon: string;
  title: string;
  index: number;
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

/**
 * Component that displays the tabs on the left sidebar.
 */
export function ProfileSectionTab(props: LeftTabProps) {
  const matches = useMediaQuery('(min-width: 1527px)');
  const tooSmall = useMediaQuery('(min-width: 1070px)');
  return (
    <li
      className="profile-section-tab"
      style={{ display: 'inline', width: '100%',  fontSize: matches ? "25px" : "21px" }}
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
      ></link>
      <button
        className="btn-lg profile-section-tab-button"
        style={{
          color: props.selectedTab === props.index ? '#233FC8' : 'white',
        }}
        onClick={() => props.setSelectedTab(props.index)}
      >
        {/* <img className="svg profile-section-tab-icon" src={props.icon} alt="icon" /> */}
        <i className={`bi ${props.icon} profile-section-tab-icon`}></i>
        {props.title}
      </button>
    </li>
  );
}
