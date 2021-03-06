import moment from "moment";
import react, { useState } from "react";
import { Link } from "react-router-dom";
import { generateParamsRoutes, ROUTES } from "../utils/routes";

import iconNext from "./../assets/images/icons/next.svg";

const MaintenanceHistoryItem = ({ date, id }) => {
    return (
        <Link
            to={
                ROUTES.maintenanceSave.url +
                generateParamsRoutes(ROUTES.maintenanceSave, [id])
            }
        >
            <div className="maintenance-history-item d-flex justify-content-between">
                <span className="maintenance-history-item__label">
                    Changement
                </span>
                <span className="maintenance-history-item__date">
                    {moment(date).format("DD/MM/YYYY")}
                </span>
                <span
                    className="icon icon-bottom"
                    style={{ maskImage: `url(${iconNext})` }}
                ></span>
            </div>
        </Link>
    );
};

export default MaintenanceHistoryItem;
