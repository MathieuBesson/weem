import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useFetch } from "../utils/api";
import { ROUTES } from "../utils/routes";

import MaintenanceHistoryItem from "./../components/MaintenanceHistoryItem";

const MaintenanceHistory = () => {
    const currentCar = useSelector((state) => state.currentCar);

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
                <div className="maintenance-history">
                    <h3 className="maintenance-history__title">
                        Historique et transfert des entretiens
                    </h3>
                    <div className="maintenance-history__list">
                        {carPartMaintenanceList.data.map(
                            (carPartMaintenance) => (
                                <MaintenanceHistoryItem
                                    key={carPartMaintenance.id}
                                    id={carPartMaintenance.id}
                                    date={carPartMaintenance.dateLastChange}
                                />
                            )
                        )}

                        {carPartMaintenanceList.data.length === 0 && (
                            <p className="maintenance-history__list-no-data">
                                Pas encore de changements sauvegardé{" "}
                            </p>
                        )}
                    </div>
                    <Link
                        to={ROUTES.maintenanceHistory.url}
                        className="btn btn-primary w-100"
                    >
                        Voir l'historique complet
                    </Link>
                </div>
            )}
        </>
    );
};

export default MaintenanceHistory;
