import react, { useState, useEffect } from "react";
import voca from "voca";
import moment from "moment";
import { useFetch } from "./../utils/api";

const PartsDetailsPopUp = ({
    active,
    setNotActivePopup,
    carPart,
    addSelectClassToSubmitPart,
}) => {
    const [dateLastChange, setDateLastChange] = useState("");
    const [isValidDateLastChange, setIsValidDateLastChange] = useState(true);
    const [launchRegisterPartChange, setLaunchRegisterPartChange] =
        useState(false);

    const registerPartChange = useFetch({
        endpoint: "carPartMaintenanceCreate",
        launchRequest: launchRegisterPartChange,
        dataBody: {
            dateLastChange: dateLastChange === "" ? null : dateLastChange,
            carPart: `/api/car_parts/${carPart?.id ?? ""}`,
        },
    });

    useEffect(() => {
        setIsValidDateLastChange("");
        setDateLastChange("");
    }, [carPart?.id]);

    useEffect(() => {
        setIsValidDateLastChange("");
        setDateLastChange("");
        setLaunchRegisterPartChange(false);
    }, [carPart?.id]);

    const dateLastChangeHandler = (event) => {
        setIsValidDateLastChange(
            moment(event.target.value, "YYYY-MM-DD", true).isValid()
        );
        setDateLastChange(event.target.value);
    };

    const handleValideChange = () => {
        if (isValidDateLastChange && dateLastChange !== "") {
            setLaunchRegisterPartChange(true);
            addSelectClassToSubmitPart(carPart.id);
            setNotActivePopup();
        }
    };

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
