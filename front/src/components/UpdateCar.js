import React, { useState, useEffect } from "react";
import { useFetch } from "../utils/api";
import { useSelector } from "react-redux";
import moment from "moment";
import voca from "voca";
import { ROUTES } from "./../utils/routes";
import { useNavigate } from "react-router-dom";

import iconSoupe from "./../assets/images/icons/souple.svg";
import iconSportive from "./../assets/images/icons/sportive.svg";
import iconNeutre from "./../assets/images/icons/neutre.svg";

export default function UpdateCar({ create = false }) {
    console.log(create);
    const navigate = useNavigate();
    const iconsDrivingStyle = {
        souple: iconSoupe,
        sportive: iconSportive,
        neutre: iconNeutre,
    };
    const carConstantes = useSelector((state) => state.constantes.Car);
    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState("");
    const [registration, setRegistration] = useState("");
    const [dateReleased, setDateReleased] = useState(null);
    const [mileageGlobale, setMileageGlobale] = useState("");
    const [fuelType, setFuelType] = useState(null);
    const [drivingStyle, setDrivingStyle] = useState(null);
    const [mileageMensual, setMileageMensual] = useState("");
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
    const [isSaveCarLaunchOk, setIsSaveCarLaunchOk] = useState(false);

    const brands = useFetch({
        endpoint: "brands",
        launchRequest: true,
    });

    const saveCar = useFetch({
        endpoint: "saveCar",
        launchRequest: isSaveCarLaunchOk,
        dataBody: {
            name: model,
            dateReleased,
            fuelType,
            registration,
            drivingStyle,
            mileageGlobale,
            mileageMensual,
            carBrand: "/api/car_brands/" + brand,
        },
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
            Object.values(carConstantes.FUEL_TYPE_ID).includes(value),
        drivingStyle: (value) =>
            Object.values(carConstantes.DRIVING_STYLE_ID).includes(value),
        mileageMensual: (value) => parseInt(value) >= 0,
    };

    useEffect(() => {
        if (carConstantes !== undefined) {
            setFuelType(fuelType === null && carConstantes.FUEL_TYPE_ID.DIESEL);
            setDrivingStyle(
                drivingStyle === null && carConstantes.DRIVING_STYLE_ID.SOFT
            );
        }
    }, [carConstantes]);

    useEffect(() => {
        if (saveCar.isSucceed && saveCar.data?.['@id']) {
            const destination = create
            ? ROUTES.partsPrincipalInformation.url
            : ROUTES.onboarding.url;
            // if(haveStateToken || haveCookieToken){
                console.log(saveCar.data['@id'].split('/').pop());
            navigate(destination, {state:{carId: parseInt(saveCar.data['@id'].split('/').pop())}});
            // }
        }

        // if (registration.error !== null) {
        //     setIsRegistrationLaunchOk(false);
        // }

        // if (registration.isSucceed) {
        //     setIsLoginLaunchOk(true);
        // }

        // if (login.isSucceed) {
        //     dispatch(setToken(login.data.token));
        //     navigate(ROUTES.onboarding.url);
        // }
    }, [saveCar.isSucceed, saveCar.data]);

    const validOrNotInput = (condition, varName) => {
        setIsValid({
            ...isValid,
            [varName]: condition,
        });
    };

    const modifyNumberValue = (property, addOrRemove = "-") => {
        const setter = "set" + voca.capitalize(property);
        let finaleValue = 0;
        if (eval(property) !== null) {
            finaleValue =
                addOrRemove === "-" ? eval(property) - 1 : eval(property) + 1;
        }
        validOrNotInput(validateInput[property](finaleValue), property);
        eval(setter)(finaleValue);
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
        ].every((value) => {
            return value !== "" && value !== null;
        });

        console.log([
            brand,
            model,
            registration,
            dateReleased,
            mileageGlobale,
            fuelType,
            drivingStyle,
            mileageMensual,
        ]);
        console.log(isValid);
        console.log(allAreValid && allAreNotEmpty);

        setIsSaveCarLaunchOk(allAreValid && allAreNotEmpty);
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
                    maxLength={25}
                    placeholder="Peugeot 407"
                    onChange={(e) => formValueChangeHandler(e, "model")}
                />
                <p
                    className={`input-standard-error-message ${
                        !isValid.model && "invalid"
                    }`}
                >
                    Le nom du model doit faire entre 3 et 100 caractères
                </p>
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
                    maxLength={25}
                    placeholder="XX-111-XX"
                    onChange={(e) => formValueChangeHandler(e, "registration")}
                />
                <p
                    className={`input-standard-error-message ${
                        !isValid.registration && "invalid"
                    }`}
                >
                    Votre numéro d'immatriculation doit faire entre 3 et 100
                    caractères
                </p>
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
                <p
                    className={`input-standard-error-message ${
                        !isValid.dateReleased && "invalid"
                    }`}
                >
                    Le format de la date transmise n'est pas valide
                </p>
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
                        value={mileageGlobale}
                        onChange={(e) =>
                            formValueChangeHandler(
                                e,
                                "mileageGlobale",
                                parseInt
                            )
                        }
                    />
                    <span
                        className="input-number-moins"
                        onClick={() => modifyNumberValue("mileageGlobale", "-")}
                    >
                        -
                    </span>
                    <span
                        className="input-number-plus"
                        onClick={() => modifyNumberValue("mileageGlobale", "+")}
                    >
                        +
                    </span>
                </div>
                <p
                    className={`input-standard-error-message ${
                        !isValid.mileageGlobale && "invalid"
                    }`}
                >
                    Le nombre de kilométres doit être supérieur à 0
                </p>
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
                                        checked={id + 1 === fuelType}
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
                <p
                    className={`input-standard-error-message ${
                        !isValid.fuelType && "invalid"
                    }`}
                >
                    Le type de carburant doit être parmis ceux renseignés
                </p>
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
                <p
                    className={`input-standard-error-message ${
                        !isValid.drivingStyle && "invalid"
                    }`}
                >
                    Le style de conduite doit être parmis ceux renseignés
                </p>
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
                        value={mileageMensual}
                        onChange={(e) =>
                            formValueChangeHandler(
                                e,
                                "mileageMensual",
                                parseInt
                            )
                        }
                    />
                    <span
                        className="input-number-moins"
                        onClick={() => modifyNumberValue("mileageMensual", "-")}
                    >
                        -
                    </span>
                    <span
                        className="input-number-plus"
                        onClick={() => modifyNumberValue("mileageMensual", "+")}
                    >
                        +
                    </span>
                </div>
                <p
                    className={`input-standard-error-message ${
                        !isValid.mileageMensual && "invalid"
                    }`}
                >
                    Le nombre de kilométres doit être supérieur à 0
                </p>
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
