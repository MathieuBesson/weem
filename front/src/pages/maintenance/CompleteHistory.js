import react, { useState } from "react";

// Pictures
import iconShare from "./../../assets/images/icons/share.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";

const CompleteHistory = () => {
    return (
        <main className="complete-history">
            <HeaderGoToBack>
                Renseignements des pièces et des entretiens
            </HeaderGoToBack>

            <div className="complete-history__list">
                <MaintenanceHistoryItem date="02/08/2021" />
                <MaintenanceHistoryItem date="02/08/2021" />
                <MaintenanceHistoryItem date="02/08/2021" />
            </div>
            <button className="btn btn-primary w-100">
                Exporter le carnet d'entretien
                <span
                    className="icon icon-bottom"
                    style={{ maskImage: `url(${iconShare})` }}
                ></span>
            </button>
        </main>
    );
};

export default CompleteHistory;
