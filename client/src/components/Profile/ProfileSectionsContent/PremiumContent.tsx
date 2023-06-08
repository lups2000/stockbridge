import React, { ReactElement } from "react"


type Props = {
    children: ReactElement[]
}

/**
 * Component that displays the content of premium section.
 */
const PremiumContent: React.FC<Props> = ({ children }) => {

    return (
        <div>
            this is the content of premium
        </div>
    )
}

export default PremiumContent