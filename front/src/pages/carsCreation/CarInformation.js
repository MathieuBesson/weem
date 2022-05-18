import react, { useState } from "react";


import UpdateCar from "../../components/UpdateCar"

const CarInformation = () => {
    const carInformation = null; 
    return (
        <main className="car-informations">
            <h2 className="car-informations__title">
                Renseignements du véhicule
            </h2>
            <UpdateCar create={carInformation === null} />
        </main>
    );
};

export default CarInformation;
