import react, { useEffect, useState } from "react";

import iconBottom from "./../../assets/images/icons/next.svg";

import UpdateCar from "./../../components/UpdateCar";
import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/api";
import { icons } from "../../utils/iconLoader";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCar } from "../../store/store";
import voca from "voca";
import CarSwitcher from "../../components/CarSwitcher";

const Car = () => {
    let { carId } = useParams();
    const dispatch = useDispatch();
    const constantes = useSelector((state) => state.constantes.Car);
    const [carDataToUpdate, setCarDataToUpdate] = useState();
    const [carColorId, setCarColorId] = useState(null);
    const [carModelType, setCarModelType] = useState(null);
    const [popupActive, setPopupActive] = useState(false);

    const car = useFetch({
        endpoint: "car",
        launchRequest: true,
        dataQuery: {
            justValue: carId,
        },
    });

    const carSave = useFetch({
        endpoint: "carSave",
        dataQuery: {
            justValue: carId,
        },
        dataBody: carDataToUpdate,
    });

    useEffect(() => {
        if (car.isSucceed) {
            setCarColorId(car.data.colorId);
            setCarModelType(car.data.modelType);
        }
    }, [car.isSucceed]);

    useEffect(() => {
        if (carSave.isSucceed) {
            dispatch(setCurrentCar(carSave.data));
            carSave.resetQuery();
        }
    }, [carSave.isSucceed]);

    const carTypeList = {
        [constantes?.MODEL_TYPE_ID.BERLINE]: icons.iconBerline,
        [constantes?.MODEL_TYPE_ID.CITADINE]: icons.iconCitadine,
        [constantes?.MODEL_TYPE_ID.COUPE]: icons.iconCoupe,
        [constantes?.MODEL_TYPE_ID.SUV]: icons.iconSuv,
    };

    const handleChangeCarColor = (colorId) => {
        setCarColorId(colorId);
        setCarDataToUpdate({ colorId });
        carSave.setLaunchRequest(true);
    };

    const handleChangeCarModelType = (modelType) => {
        setCarDataToUpdate({ modelType });
        carSave.setLaunchRequest(true);
        setCarModelType(modelType);
    };
    console.log(carModelType);

    return (
        constantes !== undefined &&
        carColorId &&
        carModelType && (
            <main className="car">
                <h1
                    className="car__title"
                    onClick={() => setPopupActive(!popupActive)}
                >
                    {voca.capitalize(car.data.name)}
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
                            className={`car__customize-choice-car icon mask-${
                                constantes !== undefined &&
                                constantes.COLOR[carColorId].LABEL
                            }`}
                            style={{
                                maskImage: `url(${carTypeList[carModelType]})`,
                            }}
                        ></span>
                        {console.log(carTypeList[carModelType])}
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
                                        <img src={carTypeList[carType]} />
                                    </label>
                                    <input
                                        className="car__customize-car-icon-group-item-input radio-group-input"
                                        type="radio"
                                        id={key}
                                        name="car-type"
                                        value={key}
                                        required
                                        checked={
                                            key + 1 === carModelType
                                                ? "checked"
                                                : ""
                                        }
                                        onChange={() =>
                                            handleChangeCarModelType(key + 1)
                                        }
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
                            {constantes !== undefined &&
                                Object.values(constantes.COLOR_ID).map(
                                    (colorId, key) => (
                                        <div
                                            className="car__customize-car-color-group-item"
                                            key={key}
                                        >
                                            <input
                                                className={`car__customize-car-color-group-item-input radio-group-input border-before-${constantes.COLOR[colorId].LABEL}`}
                                                type="radio"
                                                id={colorId}
                                                name="fuel-type"
                                                value={colorId}
                                                checked={
                                                    colorId === carColorId
                                                        ? true
                                                        : false
                                                }
                                                required
                                                onChange={() =>
                                                    handleChangeCarColor(
                                                        colorId
                                                    )
                                                }
                                            />
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
                <div className="car__form">
                    <h2 className="car__form-title">
                        Caractéristique du véhicule
                    </h2>
                    <UpdateCar />
                </div>
                <CarSwitcher
                    popupActive={popupActive}
                    setPopupActive={setPopupActive}
                />
            </main>
        )
    );
};

export default Car;
