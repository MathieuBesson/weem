import react, { useState } from "react";

// Pictures
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";
import iconSettings from "./../../assets/images/icons/settings.svg";

// Components
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";

// Styles
import "./../../styles/pages/part/DetailPart.scss";

const DetailPart = ({ name }) => {
    return (
        <div className="detail-part">
            <HeaderGoToBack>{name}</HeaderGoToBack>
            <div className="detail-part__info">
                <img className="detail-part__info-img" src={pneuAvant} />
                <div className="detail-part__info-content">
                    <span>Etat</span>
                    <h5>Très usé</h5>
                    <em>2 mois restants</em>
                </div>
                <span
                    className="icon icon-settings"
                    style={{ backgroundImage: `url(${iconSettings})` }}
                ></span>
            </div>
            <div className="detail-part__history">
                <h3>Historique de la pièce</h3>
                <div className="detail-part__history-list">
                    <MaintenanceHistoryItem date="02/08/2021" />
                </div>
            </div>
            <button className="btn btn-primary">
                Ajouter un nouveau changement
            </button>
        </div>
    );
};

export default DetailPart;
