import react, { useState } from "react";

// Pictures
import iconBack from "./../../assets/images/icons/next.svg";

// Components
import ButtonIcon from "./../../components/ButtonIcon";
import MaintenanceUpcoming from "./../../components/MaintenanceUpcoming";
import ArticlePreview from "./../../components/ArticlePreview";
import InvoicePreview from "./../../components/InvoicePreview";
import BlogPreview from "./../../components/BlogPreview";
import CostEstimation from "./../../components/CostEstimation";
import MaintenanceHistory from "./../../components/MaintenanceHistory";

// Styles
import "./../../styles/pages/homeMaintenance/MaintenanceBook.scss";

const MaintenanceBook = () => {
    return (
        <div className="maintenance-book">
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
            <MaintenanceUpcoming />
            <CostEstimation />
            <MaintenanceHistory />
            <button className="btn btn-thirdary w-100">
                Exporter le carnet d'entretien
            </button>
        </div>
    );
};

export default MaintenanceBook;
