import React, { useState } from "react";
import { useFetch } from "../utils/api";
import { useSelector } from "react-redux";
import moment from "moment";
import voca from "voca";

import iconSoupe from "./../assets/images/icons/souple.svg";
import iconSportive from "./../assets/images/icons/sportive.svg";
import iconNeutre from "./../assets/images/icons/neutre.svg";

export default function UpdateCar({ create = false }) {
    const iconsDrivingStyle = {
        souple: iconSoupe,
        sportive: iconSportive,
        neutre: iconNeutre,
    };
    const carConstantes = useSelector((state) => state.constantes.Car);
    const brands = useFetch({
        endpoint: "brands",
        launchRequest: true,
    });

    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState("");
    const [registration, setRegistration] = useState("");
    const [dateReleased, setDateReleased] = useState(null);
    const [mileageGlobale, setMileageGlobale] = useState(null);
    const [fuelType, setFuelType] = useState(null);
    const [drivingStyle, setDrivingStyle] = useState(null);
    const [mileageMensual, setMileageMensual] = useState(null);
    const [isValid, setIsValid] = useState({
        brand: true,
        model: true,
        registration: true,
        dateReleased: true,
        mileageGlobale: true,
        fuelType: true,
        drivingStyle: true,
        mileageMensual: true,
    });
    const validateInput = {
        brand: (value) =>
            Object.values(brands.data)
                .map((object) => object.id)
                .includes(parseInt(value)),
        model: (value) => value.length >= 3 && value.length <= 100,
        registration: (value) => value.length >= 3 && value.length <= 100,
        dateReleased: (value) => moment(value, "YYYY-MM-DD", true).isValid(),
        mileageGlobale: (value) => parseInt(value) >= 0,
        fuelType: (value) =>
            Object.values(carConstantes.FUEL_TYPE_ID)
                .includes(value),
        drivingStyle: (value) =>
            Object.values(carConstantes.DRIVING_STYLE_ID).includes(value),
        mileageMensual: (value) => parseInt(value) >= 0,
    };

    const validOrNotInput = (condition, varName) => {
        setIsValid({
            ...isValid,
            [varName]: condition,
        });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const allAreValid = Object.values(isValid).every(
            (value) => value === true
        );
        const allAreNotEmpty = [
            brand,
            model,
            registration,
            dateReleased,
            mileageGlobale,
            fuelType,
            drivingStyle,
            mileageMensual,
        ].every((value) => value !== "" && value !== null);

        console.log(isValid);

        // setIsRegistrationLaunchOk(allAreValid && allAreNotEmpty);
    };

    const formValueChangeHandler = (event, dataName, func = null) => {
        const value = func ? func(event.target.value) : event.target.value;
        validOrNotInput(validateInput[dataName](value), dataName);
        const setter = "set" + voca.capitalize(dataName);
        eval(setter)(value);
    };

    return (
        <form className="update-car__form">
            <div className="update-update-car__form-group">
                <label
                    className="update-car__form-group-label"
                    htmlFor="car-brand-select"
                >
                    Marque du véhicule<em className="input-required">*</em>
                </label>
                <select
                    className="input-standard"
                    name="car-brands"
                    id="car-brand-select"
                    required
                    onChange={(e) => formValueChangeHandler(e, "brand")}
                >
                    <option value="">Selectionner une marque</option>
                    {Array.isArray(brands.data) &&
                        brands.data?.map((currentBrand, id) => (
                            <option
                                key={currentBrand.id}
                                value={currentBrand.id}
                            >
                                {currentBrand.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="update-car__form-group">
                <label
                    className="update-car__form-group-label"
                    htmlFor="car-model"
                >
                    Modèle<em className="input-required">*</em>
                </label>
                <input
                    className="input-standard"
                    type="text"
                    id="car-model"
                    name="car-model"
                    required
                    placeholder="Peugeot 407"
                    onChange={(e) => formValueChangeHandler(e, "model")}
                />
            </div>
            <div className="update-car__form-group">
                <label
                    className="update-car__form-group-label"
                    htmlFor="car-registration"
                >
                    Numéro d’immatriculation
                    <em className="input-required">*</em>
                </label>
                <input
                    className="input-standard"
                    type="text"
                    id="car-registration"
                    name="car-registration"
                    required
                    placeholder="XX-111-XX"
                    onChange={(e) => formValueChangeHandler(e, "registration")}
                />
            </div>
            <div className="update-car__form-group">
                <label
                    className="update-car__form-group-label"
                    htmlFor="car-date-released"
                >
                    Mise en circulation du véhicule
                    <em className="input-required">*</em>
                </label>

                <input
                    className="input-standard"
                    type="date"
                    id="car-date-released"
                    name="car-date-released"
                    required
                    onChange={(e) => formValueChangeHandler(e, "dateReleased")}
                ></input>
            </div>
            <div className="update-car__form-group">
                <label
                    className="update-car__form-group-label"
                    htmlFor="car-mileage-global"
                >
                    Kilométrage du véhicule<em className="input-required">*</em>
                </label>

                <div className="input-number">
                    <input
                        className="input-standard"
                        type="number"
                        id="car-mileage-global"
                        name="car-mileage-global"
                        required
                        placeholder="100 000km"
                        min="0"
                        onChange={(e) =>
                            formValueChangeHandler(
                                e,
                                "mileageGlobale",
                                parseInt
                            )
                        }
                    />
                    <span className="input-number-moins">-</span>
                    <span className="input-number-plus">+</span>
                </div>
            </div>
            <div className="update-car__form-group fuel-type-block">
                <h3 className="update-car__form-group-title">
                    Type de carburant<em className="input-required">*</em>
                </h3>
                <div className="update-car__form-group-radio">
                    {carConstantes !== undefined &&
                        Object.values(carConstantes.FUEL_TYPE).map(
                            (currentFuelType, id) => (
                                <div
                                    key={id}
                                    className={`update-car__form-group-radio-${currentFuelType.LABEL}`}
                                >
                                    <input
                                        className={`update-car__form-group-radio-${currentFuelType.LABEL}-input`}
                                        type="radio"
                                        id={currentFuelType.LABEL}
                                        name="fuel-type"
                                        value={id + 1}
                                        required
                                        onChange={(e) =>
                                            formValueChangeHandler(
                                                e,
                                                "fuelType",
                                                parseInt
                                            )
                                        }
                                    />
                                    <label
                                        className={`update-car__form-group-radio-${currentFuelType.LABEL}-label`}
                                        htmlFor={currentFuelType.LABEL}
                                    >
                                        {currentFuelType.LABEL}
                                    </label>
                                </div>
                            )
                        )}
                </div>
            </div>
            <div className="update-car__form-group driving-style-block">
                <h3 className="update-car__form-group-title">
                    Style de conduite<em className="input-required">*</em>
                </h3>
                <input
                    className="input-range"
                    type="range"
                    id="driving-style"
                    name="driving-style"
                    min="1"
                    max={
                        carConstantes !== undefined
                            ? Object.keys(carConstantes.DRIVING_STYLE).length
                            : 1
                    }
                    step="1"
                    value={drivingStyle ? drivingStyle : 1}
                    onChange={(e) =>
                        formValueChangeHandler(e, "drivingStyle", parseInt)
                    }
                />

                <div className="update-car__form-group-range-labels">
                    {carConstantes !== undefined &&
                        Object.values(carConstantes.DRIVING_STYLE).map(
                            (currentDrivingStyle, id) => (
                                <span key={id}>
                                    <em
                                        className="icon icon-moderate"
                                        style={{
                                            backgroundImage: `url(${
                                                iconsDrivingStyle[
                                                    currentDrivingStyle.LABEL
                                                ]
                                            })`,
                                        }}
                                    ></em>
                                    {currentDrivingStyle.LABEL}
                                </span>
                            )
                        )}
                </div>
            </div>
            <div className="update-car__form-group">
                <label
                    className="update-car__form-group-label"
                    htmlFor="car-mileage-mensual"
                >
                    Kilométrage mensuel du véhicule
                    <em className="input-required">*</em>
                </label>

                <div className="input-number">
                    <input
                        className="input-standard"
                        type="number"
                        id="car-mileage-mensual"
                        name="car-mileage-mensual"
                        required
                        placeholder="1200 km/mois"
                        min="0"
                        onChange={(e) =>
                            formValueChangeHandler(
                                e,
                                "mileageMensual",
                                parseInt
                            )
                        }
                    />
                    <span className="input-number-moins">-</span>
                    <span className="input-number-plus">+</span>
                </div>
            </div>
            <p className="update-car__form-disclaimer">
                Attention, ces informations vont nous permettre d’affiner nos
                prédictions pour vos entretiens. Essayez donc de rentrer vos
                informations au plus proche de la réalité !
            </p>
            <div className="update-car__form-buttons">
                {create ? (
                    <>
                        <button
                            onClick={formSubmitHandler}
                            className="btn btn-primary"
                        >
                            Valider
                        </button>
                        {/* <button className="btn btn-thirdary">
                            Continuer plus tard
                        </button> */}
                    </>
                ) : (
                    <button className="btn btn-primary">Mettre à jour</button>
                )}
            </div>
        </form>
    );
}
