import react, { useEffect, useState } from "react";

// Pictures
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";

// Components
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import CarPartPreview from "./../../components/CarPartPreview";
import { useSelector } from "react-redux";
import { useFetch } from "../../utils/api";
import { generateParamsRoutes, ROUTES } from "../../utils/routes";

const ListMaintenanceParts = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const [isLaunchRequestCarParts, setIsLaunchRequestCarParts] =
        useState(false);
    const [carPartList, setCarPartList] = useState([]);

    const carPartListRequest = useFetch({
        endpoint: "carPart",
        launchRequest: isLaunchRequestCarParts,
        dataQuery: {
            keyValue: {
                "car.id": currentCar?.id ?? null,
            },
        },
    });

    useEffect(() => {
        if (currentCar !== null) {
            setIsLaunchRequestCarParts(true);
        }
    }, [currentCar]);

    useEffect(() => {
        if (carPartListRequest.isSucceed) {
            setCarPartList(
                carPartListRequest.data.sort(
                    (a, b) =>
                        a.carPartMaintenances.length <=
                        b.carPartMaintenances.length
                )
            );
        }
    }, [carPartListRequest.isSucceed]);

    return (
        <>
            {carPartListRequest.isSucceed && (
                <main className="list-maintenance-parts">
                    <HeaderGoToBack>
                        Choisir une pièce pour ajouter un changement
                    </HeaderGoToBack>
                    <div className="list-maintenance-parts__list">
                        {carPartList.map((carPart, id) => (
                            <CarPartPreview
                                link={
                                    ROUTES.detailPart.url +
                                    generateParamsRoutes(ROUTES.detailPart, [
                                        carPart.id,
                                    ])
                                }
                                key={carPart.id}
                                carPart={carPart}
                                active={
                                    carPart.carPartMaintenances.length !== 0
                                }
                            />
                        ))}
                    </div>
                </main>
            )}
        </>
    );
};

export default ListMaintenanceParts;
