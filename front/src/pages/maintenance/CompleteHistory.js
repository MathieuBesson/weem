import react, { useEffect, useState } from "react";

// Pictures
import iconShare from "./../../assets/images/icons/share.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";
import { apiEndPoint, generateUrl, useFetch } from "../../utils/api";
import { useSelector } from "react-redux";
import { generateParamsRoutes, ROUTES } from "../../utils/routes";
import { Link } from "react-router-dom";

const CompleteHistory = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const token = useSelector((state) => state.user.token);

    const carPartMaintenanceList = useFetch({
        endpoint: "carPartMaintenance",
        dataQuery: {
            keyValue: {
                "carPart.car.id": currentCar?.id ?? null,
            },
        },
    });

    useEffect(() => {
        if (currentCar !== null) {
            carPartMaintenanceList.setLaunchRequest(true);
        }
    }, [currentCar]);

    return (
        <>
            {carPartMaintenanceList.isSucceed && (
                <main className="complete-history">
                    <HeaderGoToBack>
                        Renseignements des pièces et des entretiens
                    </HeaderGoToBack>

                    <div className="complete-history__list">
                        {carPartMaintenanceList.data.map(
                            (carPartMaintenance) => (
                                <MaintenanceHistoryItem
                                    date={carPartMaintenance.dateLastChange}
                                    id={carPartMaintenance.id}
                                    key={carPartMaintenance.id}
                                />
                            )
                        )}

                        {carPartMaintenanceList.data.length === 0 && (
                            <p className="maintenance-history__list-no-data">
                                Pas encore de changements sauvegardé{" "}
                            </p>
                        )}
                    </div>
                    <a
                        className="btn btn-primary w-100"
                        href={generateUrl(apiEndPoint.maintenanceSummary.url, {
                            justValue: currentCar.id,
                            keyValue: {
                                token,
                            },
                        })}
                        target="_blank"
                    >
                        Exporter le carnet d'entretien
                        <span
                            className="icon icon-bottom"
                            style={{ maskImage: `url(${iconShare})` }}
                        ></span>
                    </a>
                </main>
            )}
        </>
    );
};

export default CompleteHistory;
