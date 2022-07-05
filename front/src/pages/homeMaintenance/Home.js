import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "./../../utils/api";

// Pictures
import wheel from "./../../assets/images/icons/wheel.svg";

// Components
import ButtonIcon from "./../../components/ButtonIcon";
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import InvoicePreview from "./../../components/InvoicePreview";
import BlogPreview from "./../../components/BlogPreview";
import { Link } from "react-router-dom";
import { generateParamsRoutes, ROUTES } from "../../utils/routes";

const Home = () => {
    const user = useSelector((state) => state.user.datas);
    const currentCar = useSelector((state) => state.currentCar);

    return (
        currentCar && (
            <main className="home">
                <header className="home__header d-flex justify-content-between">
                    <h2 className="home__header-title">
                        <span>Bonjour,</span>
                        <span className="green">{user?.name}</span>
                    </h2>
                    <div className="d-flex align-items-center">
                        <Link
                            to={
                                ROUTES.carSave.url +
                                generateParamsRoutes(ROUTES.carSave, [
                                    currentCar.id,
                                ])
                            }
                        >
                            <ButtonIcon icon={wheel} theme="light" />
                        </Link>
                    </div>
                </header>

                <Link
                    to={ROUTES.listMaintenanceParts.url}
                    className="btn btn-secondary w-100"
                >
                    Ajouter un nouveau changement
                </Link>
                <MaintenanceUpcomingPreview />
                <InvoicePreview
                    carPartNames={["Pneus avants", "Filtre à air"]}
                />
                <BlogPreview />
            </main>
        )
    );
};

export default Home;
