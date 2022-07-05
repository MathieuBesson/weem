import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentCar } from "../store/store";
import { useFetch } from "../utils/api";
import { icons } from "../utils/iconLoader";
import { generateParamsRoutes, ROUTES } from "../utils/routes";

import iconCoupe from "./../assets/images/icons/coupe.svg";

const CarSwitcher = ({ popupActive, setPopupActive }) => {
    const [idCarSelected, setIdCarSelected] = useState(null);
    const constantes = useSelector((state) => state.constantes.Car);
    const currentCar = useSelector((state) => state.currentCar);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carList = useFetch({
        endpoint: "car",
        launchRequest: true,
    });

    const carTypeList = {
        [constantes?.MODEL_TYPE_ID.BERLINE]: icons.iconBerline,
        [constantes?.MODEL_TYPE_ID.CITADINE]: icons.iconCitadine,
        [constantes?.MODEL_TYPE_ID.COUPE]: icons.iconCoupe,
        [constantes?.MODEL_TYPE_ID.SUV]: icons.iconSuv,
    };

    useEffect(() => {
        setIdCarSelected(currentCar.id);
    }, [currentCar]);

    useEffect(() => {
        carList.resetQuery();
        carList.setLaunchRequest(true);
    }, [popupActive]);

    console.log(carList);

    const handleChangeActiveCar = async (carId) => {
        if (carId !== idCarSelected) {
            await dispatch(
                setCurrentCar(carList.data.find((car) => car.id === carId))
            );
            navigate(ROUTES.home.url);
        }
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
                                        id={car.id}
                                        name="car-id"
                                        value={car.id}
                                        required
                                        checked={isCarSelected(car.id)}
                                        onChange={() =>
                                            handleChangeActiveCar(car.id)
                                        }
                                    />
                                </div>
                            </section>
                        ))}
                </div>
                <Link
                    className="btn btn-primary"
                    to={ROUTES.carInformation.url}
                >
                    Ajouter un véhicule
                </Link>
            </div>
        </div>
    );
};

export default CarSwitcher;
