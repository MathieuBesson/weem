import react, { useState } from "react";
import { useRoutes, useLocation, Link } from "react-router-dom";
import { ROUTES } from "./../utils/routes";

import blogIcon from "./../assets/images/icons/blog.svg";
import docIcon from "./../assets/images/icons/doc.svg";
import homeIcon from "./../assets/images/icons/home.svg";
import noteBookIcon from "./../assets/images/icons/notebook.svg";
import coupe from "./../assets/images/icons/coupe.svg";

const NavBar = () => {
    const menuItems = [
        {
            name: "Blog",
            icon: blogIcon,
            route: ROUTES.blog.url,
            routeListActive: [ROUTES.blog.url],
        },
        {
            name: "Docs",
            icon: docIcon,
            route: ROUTES.docs.url,
            routeListActive: [ROUTES.docs.url],
        },
        {
            name: "Home",
            icon: homeIcon,
            route: ROUTES.home.url,
            routeListActive: [ROUTES.home.url],
        },
        {
            name: "Entretien",
            icon: noteBookIcon,
            route: ROUTES.maintenanceBook.url,
            routeListActive: [
                ROUTES.maintenanceBook.url,
                ROUTES.maintenanceUpcoming.url,
            ],
        },
    ];

    const location = useLocation()?.pathname;

    return (
        <ul className="nav-bar">
            {menuItems.map((item, id) => (
                <Link key={id} to={item.route}>
                    <li
                        className={`nav-bar__item ${
                            item.routeListActive.includes(location)
                                ? "active"
                                : ""
                        }`}
                    >
                        <div className="nav-bar__item-nav">
                            <img
                                className="nav-bar__item-nav-icon"
                                src={item.icon}
                            />
                        </div>
                        <span className="nav-bar__item-label">{item.name}</span>
                    </li>
                </Link>
            ))}
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
