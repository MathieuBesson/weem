import react, { useState } from "react";

import iconBottom from "./../../assets/images/icons/next.svg";
import iconSuv from "./../../assets/images/icons/suv.svg";
import iconCoupe from "./../../assets/images/icons/coupe.svg";
import iconCitadine from "./../../assets/images/icons/citadine.svg";
import iconBerline from "./../../assets/images/icons/berline.svg";

import UpdateCar from "./../../components/UpdateCar";

const Car = () => {
    const carTypeList = {
        1: {
            icon: iconSuv,
            name: "suv",
        },
        2: {
            icon: iconCoupe,
            name: "suv",
        },
        3: {
            icon: iconCitadine,
            name: "citadine",
        },
        4: {
            icon: iconBerline,
            name: "berline",
        },
    };

    const colorsList = ["yellow", "red", "green", "blue", "violet"];

    return (
        <div className="car">
            <h1 className="car__title">
                Peugot 407
                <span
                    className="icon icon-bottom"
                    style={{ maskImage: `url(${iconBottom})` }}
                ></span>
            </h1>
            <div className="car__customize">
                <div className="car__customize-choice">
                    <h2 className="car__customize-choice-title">
                        Profil du véhicule
                    </h2>
                    <span
                        className="car__customize-choice-car icon mask-green"
                        style={{ maskImage: `url(${iconCoupe})` }}
                    ></span>
                    {/* <img
                        src={iconCoupe}
                        
                    /> */}
                </div>
                <div className="car__customize-car-icon">
                    <h3 className="car__customize-car-icon-title">
                        Icône du véhicule
                    </h3>

                    <div className="car__customize-car-icon-group radio-group">
                        {Object.keys(carTypeList).map((carType, key) => (
                            <div
                                className="car__customize-car-icon-group-item"
                                key={key}
                            >
                                <label
                                    className="car__customize-car-icon-group-item-label radio-group-label"
                                    htmlFor="diesel"
                                >
                                    <img src={carTypeList[carType].icon} />
                                </label>
                                <input
                                    className="car__customize-car-icon-group-item-input radio-group-input"
                                    type="radio"
                                    id={carTypeList[carType].name}
                                    name="car-type"
                                    value={carTypeList[carType].name}
                                    required
                                    checked={key === 0 ? "checked" : ""}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="car__customize-car-color">
                    <h3 className="car__customize-car-color-title">
                        Couleur du véhicule
                    </h3>

                    <div className="car__customize-car-color-group radio-group">
                        {colorsList.map((color, id) => (
                            <div
                                className="car__customize-car-color-group-item"
                                key={id}
                            >
                                <input
                                    className={`car__customize-car-color-group-item-input radio-group-input border-${color}`}
                                    type="radio"
                                    id="diesel"
                                    name="fuel-type"
                                    value="diesel"
                                    required
                                    checked={id === 0 ? true : false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="car__form">
                <h2 className="car__form-title">
                    Caractéristique du véhicule
                </h2>
                <UpdateCar />
            </div>
        </div>
    );
};

export default Car;
