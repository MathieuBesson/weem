import react, { useState } from "react";
import tick from "./../assets/images/icons/tick.svg";
import cross from "./../assets/images/icons/cross.svg";

import "./../styles/components/FlashMessage.scss";

const FlashMessage = ({ type, active, children }) => {
    return (
        <div className={`flash-message ${type} row align-items-center ${active && 'active'}`}>
            <span
                className="icon icon-tick-white col-2"
                style={{ maskImage: `url(${type === "success" ? tick : cross})` }}
            ></span>
            <p className="flash-message__content col-10">{children}</p>
        </div>
    );
};

export default FlashMessage;
