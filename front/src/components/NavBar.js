import react, { useState } from "react";

import blogIcon from "./../assets/images/icons/blog.svg";
import docIcon from "./../assets/images/icons/doc.svg";
import homeIcon from "./../assets/images/icons/home.svg";
import noteBookIcon from "./../assets/images/icons/notebook.svg";
import coupe from "./../assets/images/icons/coupe.svg";

const NavBar = () => {
    return (
        <ul className="nav-bar">
            <li className="nav-bar__item active">
                <div className="nav-bar__item-nav">
                    <img className="nav-bar__item-nav-icon" src={blogIcon} />
                </div>
                <span className="nav-bar__item-label">Blog</span>
            </li>
            <li className="nav-bar__item">
                <div className="nav-bar__item-nav">
                    <img className="nav-bar__item-nav-icon" src={docIcon} />
                </div>
                <span className="nav-bar__item-label">Docs</span>
            </li>
            <li className="nav-bar__item">
                <div className="nav-bar__item-nav">
                    <img className="nav-bar__item-nav-icon" src={homeIcon} />
                </div>
                <span className="nav-bar__item-label">Home</span>
            </li>
            <li className="nav-bar__item">
                <div className="nav-bar__item-nav">
                    <img
                        className="nav-bar__item-nav-icon"
                        src={noteBookIcon}
                    />
                </div>
                <span className="nav-bar__item-label">Entretien</span>
            </li>
            <li className="nav-bar__item-car">
                <div className="nav-bar__item-car-nav">
                    <span
                        className=" icon mask-green"
                        style={{ maskImage: `url(${coupe})` }}
                    ></span>
                </div>
                <span className="nav-bar__item-label">Véhicule</span>
            </li>
        </ul>
    );
};

export default NavBar;
