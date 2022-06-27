import react, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../utils/api";
import { icons } from "../utils/iconLoader";

import iconCoupe from "./../assets/images/icons/coupe.svg";

const CarSwitcher = ({ popupActive, setPopupActive }) => {
    const [idCarSelected, setIdCarSelected] = useState(1);
    const constantes = useSelector((state) => state.constantes.Car);

    // Récupérer la liste des véhicules
    const carList = useFetch({
        endpoint: "car",
        launchRequest: true,
    });

    // Au clique sur une véhicule changer le véhicule courant et recharger la page

    // Charger les constantes

    const carTypeList = {
        [constantes?.MODEL_TYPE_ID.BERLINE]: icons.iconBerline,
        [constantes?.MODEL_TYPE_ID.CITADINE]: icons.iconCitadine,
        [constantes?.MODEL_TYPE_ID.COUPE]: icons.iconCoupe,
        [constantes?.MODEL_TYPE_ID.SUV]: icons.iconSuv,
    };

    console.log(carList);

    const handleChangeActiveCar = (carId) => {
        console.log(carId);
        setIdCarSelected(carId);
    };

    const isCarSelected = (carId) => idCarSelected === carId;

    return (
        <div className={`car-switcher ${popupActive ? "active" : ""}`}>
            <div
                className={`outside ${popupActive ? "active" : ""}`}
                onClick={() => setPopupActive(false)}
            ></div>
            <div className="car-switcher-popup">
                <h2 className="car-switcher-popup__title">Vos véhicules</h2>
                <div className="car-switcher-popup__car-list">
                    {console.log(constantes)}
                    {carList.isSucceed &&
                        constantes !== undefined &&
                        carList.data.map((car, key) => (
                            <section
                                className={`car-switcher-popup__car-list-item ${
                                    !isCarSelected(car.id) && `not-selected`
                                }`}
                                key={key}
                                onClick={() => handleChangeActiveCar(car.id)}
                            >
                                {/* <span
                                    className={`car-switcher-popup__icon icon mask-${
                                        constantes.COLOR[car.colorId].LABEL
                                    }`}
                                    style={{ maskImage: `url(${car.image})` }}
                                ></span> */}

                                <span
                                    className={`car-switcher-popup__icon icon mask-${
                                        constantes.COLOR[car.colorId].LABEL
                                    }`}
                                    style={{
                                        maskImage: `url(${
                                            carTypeList[car.modelType]
                                        })`,
                                    }}
                                ></span>

                                <label className="car-switcher-popup__car-list-item-label">
                                    {car.name}
                                </label>

                                <div className="radio-group">
                                    <input
                                        className={`radio-group-input ${
                                            isCarSelected(car.id) &&
                                            `border-before-${
                                                constantes.COLOR[car.colorId]
                                                    .LABEL
                                            }`
                                        }`}
                                        type="radio"
                                        id="diesel"
                                        name="fuel-type"
                                        value={car.id}
                                        required
                                        checked={isCarSelected(car.id)}
                                        onChange={() => true}
                                    />
                                </div>
                            </section>
                        ))}
                </div>
                <button className="btn btn-primary">Ajouter un véhicule</button>
            </div>
        </div>
    );
};

export default CarSwitcher;
