import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "./../utils/api";

// Pictures
import CarPartPreview from "./CarPartPreview";

const MaintenanceUpcomingPreview = () => {
    const currentCar = useSelector((state) => state.currentCar);
    const [isLaunchRequestCarParts, setIsLaunchRequestCarParts] =
        useState(false);

    const carPartList = useFetch({
        endpoint: "carParts",
        launchRequest: isLaunchRequestCarParts,
        dataQuery: {
            keyValue: {
                "car.id": currentCar?.id ?? null,
                count: 3,
            },
        },
    });

    useEffect(() => {
        setIsLaunchRequestCarParts(true);
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
                            <CarPartPreview key={carPart.id} carPart={carPart} />
                        ))}
                    </div>
                    <button className="btn btn-thirdary w-100">
                        Voir l'état des autres pièces
                    </button>
                </div>
            )}
        </>
    );
};

export default MaintenanceUpcomingPreview;
