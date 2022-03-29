import react, { useState } from "react";
import iconBackArrow from "./../assets/images/icons/back-arrow.svg";

import "./../styles/components/HeaderGoToBack.scss";

const HeaderGoToBack = ({children}) => {
    return (
        <div className="header-go-to-back">
            <span
                className="icon icon-back"
                style={{ backgroundImage: `url(${iconBackArrow})` }}
            ></span>
            <h2 className="header-go-to-back__title">
                {children}
            </h2>
        </div>
    );
};

export default HeaderGoToBack;
