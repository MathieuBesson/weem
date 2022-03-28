import react, { useState } from "react";

// Pictures
import wheel from "./../../assets/images/icons/wheel.svg";
import night from "./../../assets/images/icons/night.svg";
import bgMaintenance from "./../../assets/images/background/bg-maintenance.jpg";

// Components
import ButtonIcon from "./../../components/ButtonIcon";
import MaintenanceUpcoming from "./../../components/MaintenanceUpcoming";
import ArticlePreview from "./../../components/ArticlePreview";

// Styles
import "./../../styles/pages/homeMaintenance/Home.scss";

const Home = () => {
    return (
        <div className="home">
            <header className="home__header d-flex justify-content-between">
                <h2 className="home__header-title">
                    <span>Bonjour,</span>
                    <span className="green">Alexandre</span>
                </h2>
                <div className="d-flex align-items-center">
                    <ButtonIcon icon={wheel} theme="light" />
                    <ButtonIcon icon={night} theme="light" />
                </div>
            </header>
            <button className="btn btn-secondary w-100">
                Ajouter un nouveau changement
            </button>
            <MaintenanceUpcoming />
            <div className="home__invoice-preview">
                <h3 className="home__invoice-preview-title">
                    Vous avez 1 entretien sans factures associée
                </h3>
                <div className="home__invoice-preview-car-part-list">
                    <section className="home__invoice-preview-car-part-list-item">
                        <h4 className="home__invoice-preview-car-part-list-item-title">
                            Entretien : Pneus avants
                        </h4>
                        <button className="home__invoice-preview-car-part-list-item-btn">
                            Ajouter la facture
                        </button>
                    </section>
                </div>
            </div>
            <div className="home__blog-preview">
                <h3 className="home__blog-preview-title">
                    Nos derniers conseils pour votre entretien !
                </h3>
                <div className="home__blog-preview-article-list">
                    <ArticlePreview bgImage={bgMaintenance} title="Quand faut-il changer un filtre à huile" newArticle={true}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
