import react, { useState } from "react";
import voca from "voca";
import moment from "moment";

const PartsDetailsPopUp = ({ active, setNotActivePopup, carPart }) => {
    const [dateLastChange, setDateLastChange] = useState("");
    const [isValidDateLastChange, setIsValidDateLastChange] = useState(true);
    const [mileageLastChange, setMileageLastChange] = useState("");
    const [isValidMileageLastChange, setIsValidMileageLastChange] =
        useState(true);

    const dateLastChangeHandler = (event) => {
        setIsValidDateLastChange(
            moment(event.target.value, "YYYY-MM-DD", true).isValid()
        );
        setDateLastChange(event.target.value);
    };

    const mileageLastChangeHandler = (event) => {
        const value = parseInt(event.target.value);
        setIsValidDateLastChange(value >= 0);
        setDateLastChange(value);
    };

    const handleValideChange = () => {
        if (
            isValidMileageLastChange &&
            isValidDateLastChange &&
            (dateLastChange !== "" || mileageLastChange !== "")
        ) {
            console.log('go to upload')
        }
    };

    // const activePopup = carPart !== null;

    return (
        <div className={`part-detail ${active && "active"}`}>
            <div
                className={`outside ${active && "active"}`}
                onClick={setNotActivePopup}
            ></div>
            <div className="part-detail-popup">
                <h3 className="part-detail-popup__title">
                    {voca.capitalize(carPart?.name)}
                </h3>
                <input
                    type="date"
                    className="part-detail-popup__input input-secondary"
                    onChange={dateLastChangeHandler}
                />
                <input
                    className="part-detail-popup__input input-secondary"
                    type="number"
                    placeholder="Kilométrage actuel de la voiture*"
                    onChange={mileageLastChangeHandler}
                />
                <button
                    className="btn btn-secondary w-100"
                    onClick={handleValideChange}
                >
                    Valider
                </button>
            </div>
        </div>
    );
};

export default PartsDetailsPopUp;
