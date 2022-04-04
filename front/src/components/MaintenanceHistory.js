import react, { useState } from "react";

import MaintenanceHistoryItem from "./../components/MaintenanceHistoryItem"

const MaintenanceHistory = ({ items }) => {
    return (
        <div className="maintenance-history">
            <h3 className="maintenance-history__title">
                Historique et transfert des entretiens
            </h3>
            <div className="maintenance-history__list">
                <MaintenanceHistoryItem date="02/08/2021"/>
                <MaintenanceHistoryItem date="02/08/2021"/>
            </div>
            <button className="btn btn-primary w-100">
                Voir l'historique complet
            </button>
        </div>
    );
};

export default MaintenanceHistory;
