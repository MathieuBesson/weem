import react, { useState } from "react";

import "./../styles/components/ButtonIcon.scss";

const ButtonIcon = ({ icon, theme }) => {
    return (
        <div className={`button-icon ${theme}`}>
            <span
                className="icon"
                style={{ maskImage: `url(${icon})` }}
            ></span>
        </div>
    );
};

export default ButtonIcon;
