import react, { useState } from "react";

// Pictures
import iconBack from "./../../assets/images/icons/next.svg";
import iconShare from "./../../assets/images/icons/share.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import CostEstimation from "./../../components/CostEstimation";
import MaintenanceHistory from "./../../components/MaintenanceHistory";

const MaintenanceBook = () => {
    return (
        <main className="maintenance-book">
            <header className="maintenance-book__header">
                <h2 className="maintenance-book__header-title">
                    Votre carnet d'entretien
                </h2>

                <p className="maintenance-book__header-car green">
                    Peugeot 407
                    <span
                        className="icon icon-bottom"
                        style={{ maskImage: `url(${iconBack})` }}
                    ></span>
                </p>
            </header>
            <button className="btn btn-secondary w-100">
                Ajouter un nouveau changement
            </button>
            <MaintenanceUpcomingPreview />
            <CostEstimation />
            <MaintenanceHistory />
            <button className="btn btn-thirdary w-100">
                Exporter le carnet d'entretien
                <span
                    className="icon icon-bottom"
                    style={{ maskImage: `url(${iconShare})` }}
                ></span>
            </button>
        </main>
    );
};

export default MaintenanceBook;
