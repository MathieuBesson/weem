import react, { useState } from "react";


import UpdateCar from "./../../components/UpdateCar"

const CarsInformation = () => {
    return (
        <main className="car-informations">
            <h2 className="car-informations__title">
                Renseignements du véhicule
            </h2>
            <UpdateCar />
        </main>
    );
};

export default CarsInformation;
