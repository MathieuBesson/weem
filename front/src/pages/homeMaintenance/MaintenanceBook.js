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
import { apiEndPoint, generateUrl, useFetch } from "../../utils/api";
import Loader from "../../components/Loader";
import NavBar from "../../components/NavBar";
import CarSwitcher from "../../components/CarSwitcher";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const MaintenanceBook = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const token = useSelector((state) => state.user.token);

    const [popupActive, setPopupActive] = useState(false);

    return (
        <>
            {currentCar ? (
                <>
                    <main className="maintenance-book">
                        <header className="maintenance-book__header">
                            <h2 className="maintenance-book__header-title">
                                Votre carnet d'entretien
                            </h2>

                            <p
                                className="maintenance-book__header-car green"
                                onClick={() => setPopupActive(!popupActive)}
                            >
                                {voca.capitalize(currentCar?.name)}
                                <span
                                    className="icon icon-bottom"
                                    style={{ maskImage: `url(${iconBack})` }}
                                ></span>
                            </p>
                        </header>
                        <Link
                            className="btn btn-secondary w-100"
                            to={ROUTES.maintenanceUpcoming.url}
                        >
                            Ajouter un nouveau changement
                        </Link>
                        <MaintenanceUpcomingPreview />
                        <CostEstimation />
                        <MaintenanceHistory />
                        <a
                            className="btn btn-thirdary w-100"
                            href={generateUrl(
                                apiEndPoint.maintenanceSummary.url,
                                {
                                    justValue: currentCar.id,
                                    keyValue: {
                                        token,
                                    },
                                }
                            )}
                            target="_blank"
                        >
                            Exporter le carnet d'entretien
                            <span
                                className="icon icon-bottom"
                                style={{ maskImage: `url(${iconShare})` }}
                            ></span>
                        </a>
                    </main>
                    <CarSwitcher
                        popupActive={popupActive}
                        setPopupActive={setPopupActive}
                    />
                    <NavBar />
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default MaintenanceBook;
