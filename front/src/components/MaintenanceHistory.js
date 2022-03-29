import react, { useState } from "react";

import "./../styles/components/MaintenanceHistory.scss";
import MaintenanceHistoryItem from "./../components/MaintenanceHistoryItem"

const MaintenanceHistory = ({ items }) => {
    return (
        <div className="maintenance-history">
            <h3>Historique et transfert des entretiens</h3>
            <MaintenanceHistoryItem 
                date="02/08/2021"
            />
        </div>
    );
};

export default MaintenanceHistory;
