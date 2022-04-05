import react, { useState } from "react";


import UpdateCar from "./../../components/UpdateCar"

const CarsInformation = () => {
    return (
        <div className="car-informations">
            <h2 className="car-informations__title">
                Renseignements du véhicule
            </h2>
            <UpdateCar />
        </div>
    );
};

export default CarsInformation;
