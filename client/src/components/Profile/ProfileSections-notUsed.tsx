import useMediaQuery from "../../hooks/useMediaQuery";
import { FC } from "react";
import questionIcon from "./../../assets/question-circle.svg";
import premiumIcon from "./../../assets/bookmark-star.svg";
import storeIcon from "./../../assets/shop.svg";
import buyingIcon from "./../../assets/box-seam.svg";
import advertIcon from "./../../assets/cash-stack.svg";
import sellingIcon from "./../../assets/cash-coin.svg";


export type ProfileSectionsProps = {
    text: string;
    icon: any
}[];


const leftTabs: { text: string; icon: any, isSelected: boolean }[] = [
    {
        text: "My Adverts",
        icon: advertIcon,
        isSelected: false
    },
    {
        text: "Selling",
        icon: sellingIcon,
        isSelected: true
    },
    {
        text: "Buying",
        icon: buyingIcon,
        isSelected: false
    },
    {
        text: "Store Details",
        icon: storeIcon,
        isSelected: false
    },
    {
        text: "Premium",
        icon: premiumIcon,
        isSelected: false
    },
    {
        text: "Help and FAQ",
        icon: questionIcon,
        isSelected: false
    },
];



export const ProfileSections: FC = () => {

    const matches = useMediaQuery("(min-width: 768px)");
    return (
        <div className="profile-section-container"
            style={{
                position: "relative",
                left: 0,
                height: "100em",
                //width: "100em",
                borderRadius: 15,
                //backgroundColor: palette.subSectionsBgLighter,
                alignItems: "center",
                display: matches ? "flex" : "none",
                flexDirection: "column",
            }}
        >

            <div className="sections-container"
                style={{
                    marginTop: "40%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                }}
            >
                {/* {leftTabs.map((section, _) => {
                    return (
                        <LeftTab
                            message={section.text}
                            icon={section.icon}
                            isSelected={section.isSelected}
                        />
                    );
                })} */}
            </div>

        </div>
    );
}