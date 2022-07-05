import react, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import voca from "voca";
import AddMaintenance from "../../components/AddMaintenance";
import { useFetch } from "../../utils/api";
import { daysToMonth } from "../../utils/date";
import { icons } from "../../utils/iconLoader";
import { getColorAlert, getPartState } from "../../utils/string";

// Pictures
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";
import iconSettings from "./../../assets/images/icons/settings.svg";

// Components
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";
import SpecialistRecommendation from "./../../components/SpecialistRecommendation";

const DetailPart = ({ name }) => {
    let { carPartId } = useParams();
    const location = useLocation();
    const [popupActive, setPopupActive] = useState(false);
    const [carPartMaintenanceList, setCarPartMaintenanceList] = useState([]);

    const carPart = useFetch({
        endpoint: "carPart",
        launchRequest: true,
        dataQuery: {
            justValue: carPartId,
        },
    });

    const carPartMaintenanceListFetch = useFetch({
        endpoint: "carPartMaintenance",
        dataQuery: {
            keyValue: {
                "carPart.id": carPart.data?.id,
            },
        },
    });

    const addCarPartMaintenance = (element) => {
        setCarPartMaintenanceList(
            [...carPartMaintenanceList, element].sort((a, b) =>
                a.dateLastChange < b.dateLastChange ? 1 : -1
            )
        );
        reloadCarPart();
    };

    useEffect(() => {
        if (carPart.isSucceed) {
            carPartMaintenanceListFetch.setLaunchRequest(true);
        }
    }, [carPart.isSucceed]);

    useEffect(() => {
        if (carPartMaintenanceListFetch.isSucceed) {
            setCarPartMaintenanceList(carPartMaintenanceListFetch.data);
        }
    }, [carPartMaintenanceListFetch.isSucceed]);

    console.log(carPart);

    const reloadCarPart = () => {
        carPart.resetQuery();
        carPart.setLaunchRequest(true);
    };

    useEffect(() => {
        reloadCarPart();
    }, [location.state]);

    return (
        <>
            {Object.keys(carPart.data) !== 0 && (
                <main className="detail-part">
                    <div className="detail-part__group-top">
                        <HeaderGoToBack>
                            {voca.capitalize(carPart.data?.name)}
                        </HeaderGoToBack>
                        <div className="detail-part__group-top-info">
                            <img
                                className="detail-part__group-top-info-img"
                                src={icons[carPart.data?.name]}
                            />
                            <div className="detail-part__group-top-info-content">
                                <span className="detail-part__group-top-info-content-label">
                                    Etat
                                </span>
                                <h5 className="detail-part__group-top-info-content-state">
                                    {getPartState(
                                        daysToMonth(
                                            carPart.data.daysBeforeFutureChange
                                        )
                                    )}
                                </h5>
                                <em
                                    className={`detail-part__group-top-info-content-time ${getColorAlert(
                                        daysToMonth(
                                            carPart.data.daysBeforeFutureChange
                                        )
                                    )}`}
                                >
                                    {daysToMonth(
                                        carPart.data.daysBeforeFutureChange
                                    )}{" "}
                                    mois restant
                                    {daysToMonth(
                                        carPart.data.daysBeforeFutureChange
                                    ) > 1 && "s"}
                                </em>
                            </div>
                            <span
                                className="icon icon-settings"
                                style={{
                                    backgroundImage: `url(${iconSettings})`,
                                }}
                            ></span>
                        </div>
                        <div className="detail-part__group-top__history">
                            <h3>Historique de la pièce</h3>
                            <div className="detail-part__group-top__history-list">
                                {carPartMaintenanceList.map(
                                    (carPartMaintenance) => (
                                        <MaintenanceHistoryItem
                                            date={
                                                carPartMaintenance.dateLastChange
                                            }
                                            id={carPartMaintenance.id}
                                            key={carPartMaintenance.id}
                                        />
                                    )
                                )}
                                {carPartMaintenanceList.length === 0 && (
                                    <p className="text-center mt-3 text-muted">
                                        Pas encore de maintenance sur cette
                                        pièce
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="detail-part__group-bottom">
                        <SpecialistRecommendation />
                        <button
                            className="btn btn-primary"
                            onClick={() => setPopupActive(true)}
                        >
                            Ajouter un nouveau changement
                        </button>
                    </div>
                    <AddMaintenance
                        carPart={carPart.data}
                        popupActive={popupActive}
                        setPopupActive={setPopupActive}
                        addCarPartMaintenance={addCarPartMaintenance}
                    />
                </main>
            )}
        </>
    );
};

export default DetailPart;
