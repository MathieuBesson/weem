import react, { useEffect, useState } from "react";

// Pictures
import iconShare from "./../../assets/images/icons/share.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";
import { useFetch } from "../../utils/api";
import { useSelector } from "react-redux";

const CompleteHistory = () => {
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
                <main className="complete-history">
                    <HeaderGoToBack>
                        Renseignements des pièces et des entretiens
                    </HeaderGoToBack>

                    <div className="complete-history__list">
                        {carPartMaintenanceList.data.map(
                            (carPartMaintenance) => (
                                <MaintenanceHistoryItem
                                    date={carPartMaintenance.dateLastChange}
                                />
                            )
                        )}
                        <MaintenanceHistoryItem date="02/08/2021" />
                        <MaintenanceHistoryItem date="02/08/2021" />
                        <MaintenanceHistoryItem date="02/08/2021" />
                    </div>
                    <button className="btn btn-primary w-100">
                        Exporter le carnet d'entretien
                        <span
                            className="icon icon-bottom"
                            style={{ maskImage: `url(${iconShare})` }}
                        ></span>
                    </button>
                </main>
            )}
        </>
        // {carPartMaintenanceList.isSucceed && (
        //     <div className="maintenance-history">
        //         <h3 className="maintenance-history__title">
        //             Historique et transfert des entretiens
        //         </h3>
        //         <div className="maintenance-history__list">
        //             {console.log(carPartMaintenanceList.data)}
        //             {carPartMaintenanceList.data.map(
        //                 (carPartMaintenance) => (
        //                     <MaintenanceHistoryItem
        //                         date={carPartMaintenance.dateLastChange}
        //                     />
        //                 )
        //             )}
        //         </div>
        //         <button className="btn btn-primary w-100">
        //             Voir l'historique complet
        //         </button>
        //     </div>
        // )}
    );
};

export default CompleteHistory;
