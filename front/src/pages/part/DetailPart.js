import react, { useState } from "react";

// Pictures
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";
import iconSettings from "./../../assets/images/icons/settings.svg";

// Components
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";
import SpecialistRecommendation from "./../../components/SpecialistRecommendation";

const DetailPart = ({ name }) => {
    return (
        <main className="detail-part">
            <div className="detail-part__group-top">
                <HeaderGoToBack>{name}</HeaderGoToBack>
                <div className="detail-part__group-top-info">
                    <img
                        className="detail-part__group-top-info-img"
                        src={pneuAvant}
                    />
                    <div className="detail-part__group-top-info-content">
                        <span className="detail-part__group-top-info-content-label">
                            Etat
                        </span>
                        <h5 className="detail-part__group-top-info-content-state">
                            Très usé
                        </h5>
                        <em className="detail-part__group-top-info-content-time red">
                            2 mois restants
                        </em>
                    </div>
                    <span
                        className="icon icon-settings"
                        style={{ backgroundImage: `url(${iconSettings})` }}
                    ></span>
                </div>
                <div className="detail-part__group-top__history">
                    <h3>Historique de la pièce</h3>
                    <div className="detail-part__group-top__history-list">
                        <MaintenanceHistoryItem date="02/08/2021" />
                    </div>
                </div>
            </div>

            <div className="detail-part__group-bottom">
                <SpecialistRecommendation />
                <button className="btn btn-primary">
                    Ajouter un nouveau changement
                </button>
            </div>
        </main>
    );
};

export default DetailPart;
