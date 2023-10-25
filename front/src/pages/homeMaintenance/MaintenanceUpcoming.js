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
            const carPartWithChange = carPartListRequest.data
                .filter((carPart) => carPart.carPartMaintenances.length !== 0)
                .sort(
                    (a, b) =>
                        Date.parse(a.futurChangeDate) >=
                        Date.parse(b.futurChangeDate)
                );

            const carPartWithoutChange = carPartListRequest.data.filter(
                (carPart) => carPart.carPartMaintenances.length === 0
            );

            setCarPartList([...carPartWithChange, ...carPartWithoutChange]);
        }
    }, [carPartListRequest.isSucceed]);

    return (
        <>
            {Object.keys(carPartListRequest.data).length !== 0 && (
                <main className="maintenance-upcomming">
                    <HeaderGoToBack>Vos entretien à venir</HeaderGoToBack>
                    {carPartList.map((carPart) => (
                        <CarPartPreview
                            link={
                                ROUTES.detailPart.url +
                                generateParamsRoutes(ROUTES.detailPart, [
                                    carPart.id,
                                ])
                            }
                            key={carPart.id}
                            carPart={carPart}
                            active={carPart.carPartMaintenances.length !== 0}
                        />
                    ))}
                </main>
            )}
        </>
    );
};

export default MaintenanceUpcoming;
