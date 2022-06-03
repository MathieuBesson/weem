import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import voca from "voca";

// Pictures
import iconBack from "./../../assets/images/icons/next.svg";
import iconShare from "./../../assets/images/icons/share.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import CostEstimation from "./../../components/CostEstimation";
import MaintenanceHistory from "./../../components/MaintenanceHistory";
import { useFetch } from "../../utils/api";
import Loader from "../../components/Loader";
import NavBar from "../../components/NavBar";

const MaintenanceBook = () => {
    const currentCar = useSelector((state) => state.currentCar);
    console.log(currentCar);

    return (
        <>
            {currentCar ? (
                <>
                    <main className="maintenance-book">
                        <header className="maintenance-book__header">
                            <h2 className="maintenance-book__header-title">
                                Votre carnet d'entretien
                            </h2>

                            <p className="maintenance-book__header-car green">
                                {voca.capitalize(currentCar?.name)}
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
                    <NavBar />
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default MaintenanceBook;
