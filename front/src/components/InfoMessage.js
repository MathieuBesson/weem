import react, { useState } from "react";
import iconCross from "./../assets/images/icons/cross.svg";

const InfoMessage = ({ title, children }) => {
    return (
        <div className="info-message">
            <div className="info-message-block">
                <h1 className="info-message-block__title">{title}</h1>
                {children}
                <span
                    className="icon icon-cross"
                    style={{ backgroundImage: `url(${iconCross})` }}
                ></span>
            </div>
        </div>
    );
};

export default InfoMessage;
