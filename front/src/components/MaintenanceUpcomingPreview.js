import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useFetch } from "./../utils/api";

// Pictures
import CarPartPreview from "./CarPartPreview";

const MaintenanceUpcomingPreview = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const [isLaunchRequestCarParts, setIsLaunchRequestCarParts] =
        useState(false);

    const carPartList = useFetch({
        endpoint: "carPart",
        launchRequest: isLaunchRequestCarParts,
        dataQuery: {
            keyValue: {
                "car.id": currentCar?.id ?? null,
                count: 3,
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
                <div className="maintenance-upcomming-preview">
                    <h3 className="maintenance-upcomming-preview__title">
                        Vos entretiens à venir
                    </h3>
                    <div className="maintenance-upcomming-preview__car-part-group">
                        {carPartList.data.map((carPart) => (
                            <CarPartPreview
                                key={carPart.id}
                                carPart={carPart}
                            />
                        ))}
                    </div>
                    <Link className="btn btn-thirdary w-100" to={ROUTES.maintenanceUpcoming.url}>
                        Voir l'état des autres pièces
                    </Link>
                </div>
            )}
        </>
    );
};

export default MaintenanceUpcomingPreview;
