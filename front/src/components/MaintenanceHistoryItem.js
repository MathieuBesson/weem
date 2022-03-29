import react, { useState } from "react";

import "./../styles/components/MaintenanceHistoryItem.scss";

const MaintenanceHistoryItem = ({ date }) => {
    return (
        <div className="maintenance-history-item d-flex justify-content-between">
            <span className="maintenance-history-item__label">
                Changement
            </span>
            <span className="maintenance-history-item__date">
                {date}
            </span>
        </div>
    );
};

export default MaintenanceHistoryItem;
