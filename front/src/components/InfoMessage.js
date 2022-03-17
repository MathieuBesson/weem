import react, { useState } from "react";
import tick from "./../assets/images/icons/tick.svg";
import iconNext from "./../assets/images/icons/next.svg";
import iconCross from "./../assets/images/icons/cross.svg";

import "./../styles/components/InfoMessage.scss";

const InfoMessage = ({ title, message, img }) => {
    return (
        <div className="info-message">
            <div className="info-message-block">
                <h1 className="info-message-block__title">{title}</h1>
                <p className="info-message-block__content">{message}</p>
                <img className="info-message-block__img" src={img} />
                <p className="info-message-block__next-block">
                    <span className="info-message-block__next-block-content">Continuer</span>
                    <span
                        className="icon icon-next"
                        style={{ backgroundImage: `url(${iconNext})` }}
                    ></span>
                </p>
                {/* <span className="info-message-block__cross"> */}
                    <span 
                        className="icon icon-cross"
                        style={{ backgroundImage: `url(${iconCross})` }}
                    ></span>
                {/* </span> */}
            </div>
        </div>
    );
};

export default InfoMessage;
