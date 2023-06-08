import React from "react"
require('./tabStyles.scss');

type Props = {
    title: string
    index: number
    selectedTab: number
    setSelectedTab: (index: number) => void
}

/**
 * Component for the tabs of the profile section
 */
const ContentTabTitle: React.FC<Props> = ({ title, setSelectedTab, index, selectedTab }) => {

    return (
        <li className="content-tab-title" style={{ display: "inline" }}>
            <button className="btn-lg"
                style={{
                    color: selectedTab === index ? "#F76C6C" : "#F76C6C",
                    opacity: selectedTab === index ? 1 : 0.5
                }}
                onClick={() => setSelectedTab(index)}>{title}</button>
        </li>
    )
}

export default ContentTabTitle