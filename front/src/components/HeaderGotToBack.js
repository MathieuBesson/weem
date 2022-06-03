import react, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconBackArrow from "./../assets/images/icons/back-arrow.svg";

const HeaderGoToBack = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="header-go-to-back">
            <span
                className="icon icon-back"
                onClick={() => navigate(-1)}
                style={{ backgroundImage: `url(${iconBackArrow})` }}
            ></span>
            <h2 className="header-go-to-back__title">{children}</h2>
        </div>
    );
};

export default HeaderGoToBack;
