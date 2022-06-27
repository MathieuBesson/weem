import react, { useEffect, useState } from "react";

// Components
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import CarPartPreview from "./../../components/CarPartPreview";
import { useSelector } from "react-redux";
import { useFetch } from "../../utils/api";
import { generateParamsRoutes, ROUTES } from "../../utils/routes";

const MaintenanceUpcoming = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const [isLaunchRequestCarParts, setIsLaunchRequestCarParts] =
        useState(false);

    const carPartList = useFetch({
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

    return (
        <>
            {Object.keys(carPartList.data).length !== 0 && (
                <main className="maintenance-upcomming">
                    <HeaderGoToBack>Vos entretien à venir</HeaderGoToBack>
                    {carPartList.data.map((carPart, id) => (
                        <CarPartPreview
                            link={
                                ROUTES.detailPart.url +
                                generateParamsRoutes(ROUTES.detailPart, [
                                    carPart.id,
                                ])
                            }
                            key={carPart.id}
                            carPart={carPart}
                            active={id % 5 !== 0}
                        />
                    ))}
                </main>
            )}
        </>
    );
};

export default MaintenanceUpcoming;
