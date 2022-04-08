import react, { useState } from "react";

// Pictures
import wheel from "./../../assets/images/icons/wheel.svg";
import night from "./../../assets/images/icons/night.svg";
import bgMaintenance from "./../../assets/images/background/bg-maintenance.png";

// Components
import ButtonIcon from "./../../components/ButtonIcon";
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import ArticlePreview from "./../../components/ArticlePreview";
import InvoicePreview from './../../components/InvoicePreview'
import BlogPreview from "./../../components/BlogPreview"

const Home = () => {
    return (
        <main className="home">
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
            <MaintenanceUpcomingPreview />
            <InvoicePreview carPartNames={['Pneus avants', 'Filtre à air']}/>
            <BlogPreview />
        </main>
    );
};

export default Home;
