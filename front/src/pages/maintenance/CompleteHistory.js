import react, { useState } from "react";

// Pictures
import iconShare from "./../../assets/images/icons/share.svg";

// Components
import MaintenanceUpcoming from "./../../components/MaintenanceUpcoming";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";

// Styles
import "./../../styles/pages/maintenance/CompleteHistory.scss"
const CompleteHistory = () => {
    return (
        <div className="complete-history">
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
        </div>
    );
};

export default CompleteHistory;
