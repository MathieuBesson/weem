import moment from "moment";
import react, { useState } from "react";

import iconNext from "./../assets/images/icons/next.svg";

const MaintenanceHistoryItem = ({ date }) => {
    return (
        <div className="maintenance-history-item d-flex justify-content-between">
            <span className="maintenance-history-item__label">Changement</span>
            <span className="maintenance-history-item__date">{moment(date).format("DD/MM/YYYY")}</span>
            <span
                className="icon icon-bottom"
                style={{ maskImage: `url(${iconNext})` }}
            ></span>
        </div>
    );
};

export default MaintenanceHistoryItem;
