import moment from "moment";
import react, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import voca from "voca";
import { useFetch } from "../utils/api";

import iconDate from "./../assets/images/icons/date.svg";

const AddMaintenance = ({
    carPart,
    popupActive,
    setPopupActive,
    addCarPartMaintenance,
}) => {
    const defaultData = {
        date: {
            value: moment().format("YYYY-MM-DD"),
            error: false,
        },
        mileage: {
            value: "",
            error: false,
        },
        note: {
            value: "",
            error: false,
        },
    };
    const [formData, setFormData] = useState(defaultData);

    const carPartMaintenanceCreate = useFetch({
        endpoint: "carPartMaintenanceCreate",
        dataBody: {
            dateLastChange:
                formData.date.value !== "" ? formData.date.value : null,
            mileage:
                formData.mileage.value !== "" ? formData.mileage.value : null,
            note: formData.note.value !== "" ? formData.note.value : null,
            carPart: "/api/car_parts/" + carPart.id,
        },
    });

    useEffect(() => {
        if (carPartMaintenanceCreate.isSucceed) {
            addCarPartMaintenance(carPartMaintenanceCreate.data);
            resetComponent();
        }
    }, [carPartMaintenanceCreate.isSucceed]);

    const checkErrorForm = {
        date: (value) => !moment(value, "YYYY-MM-DD", true).isValid(),
        mileage: (value) => value <= 0,
        note: (value) => false,
    };
    const carPartConstantes = useSelector(
        (state) =>
            state.constantes.AbstractCarStandardPart?.CALCUL_DURATION_CHOICE_ID
    );

    const resetComponent = () => {
        carPartMaintenanceCreate.resetQuery();
        setFormData(defaultData);
        setPopupActive(false);
    };

    const handleChangeFormData = (e, dataName) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [dataName]: {
                value: dataName === "mileage" ? parseInt(value) : value,
                error: checkErrorForm[dataName](value),
            },
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const errors = Object.values(formData).map((data) => data.error);
        const allValid = errors.every((error) => error === false);

        const atListMileageOrDate =
            (isDisplayInputDate() && formData.date.value !== "") ||
            (isDisplayInputNumber() && formData.mileage.value !== "");

        if (allValid && atListMileageOrDate) {
            carPartMaintenanceCreate.setLaunchRequest(true);
        }
    };

    const isDisplayInputDate = () =>
        carPart.calculDurationChoice === carPartConstantes.DURATION ||
        carPart.calculDurationChoice === carPartConstantes.BOTH;

    const isDisplayInputNumber = () =>
        carPart.calculDurationChoice === carPartConstantes.MILEAGE ||
        carPart.calculDurationChoice === carPartConstantes.BOTH;

    return (
        <>
            {carPartConstantes !== undefined && (
                <div
                    className={`add-maintenance ${popupActive ? "active" : ""}`}
                >
                    <div
                        className={`outside ${popupActive ? "active" : ""}`}
                        onClick={() => setPopupActive(false)}
                    ></div>
                    <div className="add-maintenance-popup">
                        <h3 className="add-maintenance-popup__title">
                            Ajouter un changement
                        </h3>
                        <h5 className="add-maintenance-popup__part-name">
                            {voca.capitalize(carPart.name)}
                        </h5>

                        <form className="add-maintenance-popup__form">
                            {isDisplayInputDate() && (
                                <div className="input-date">
                                    <input
                                        type="date"
                                        className="add-maintenance-popup__form-input input-secondary"
                                        value={formData.date.value}
                                        onChange={(e) =>
                                            handleChangeFormData(e, "date")
                                        }
                                    />
                                    <span
                                        className="icon icon-date"
                                        style={{
                                            backgroundImage: `url(${iconDate})`,
                                        }}
                                    ></span>
                                </div>
                            )}
                            {isDisplayInputNumber() && (
                                <div className="input-number">
                                    <input
                                        className="add-maintenance-popup__form-input input-secondary"
                                        type="number"
                                        required
                                        placeholder="Kilométrage de la voiture*"
                                        min="0"
                                        value={formData.mileage.value}
                                        onChange={(e) =>
                                            handleChangeFormData(e, "mileage")
                                        }
                                    ></input>
                                    <span className="input-number-moins">
                                        -
                                    </span>
                                    <span className="input-number-plus">+</span>
                                </div>
                            )}
                            <textarea
                                className="input-secondary"
                                name="mainteance-note"
                                id="mainteance-note"
                                cols="30"
                                rows="10"
                                placeholder="Note sur le changement"
                                value={formData.note.value}
                                onChange={(e) =>
                                    handleChangeFormData(e, "note")
                                }
                            ></textarea>
                            <button
                                className="btn btn-secondary w-100"
                                onClick={handleSubmitForm}
                            >
                                Valider
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddMaintenance;
