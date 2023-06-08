import React, { ReactElement } from "react"


type Props = {
    children: ReactElement[]
}

/**
 * Component that displays the content of Store Details section.
 */
const StoreDetailsContent: React.FC<Props> = ({ children }) => {

    return (
        <div>
            this is the content of store details
        </div>
    )
}

export default StoreDetailsContent