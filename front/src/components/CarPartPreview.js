import react, { useState, useEffect } from "react";
import voca from "voca";
import { daysToMonth } from './../utils/date'

import iconNext from "./../assets/images/icons/next.svg";
import { icons } from "./../utils/iconLoader";

const CarPartPreview = ({ carPart, active = true }) => {
    const [colorAlert, setColorAlert] = useState("green");
    const months = daysToMonth(carPart.daysBeforeFutureChange);

    const defineColorAlert = () => {
        switch (true) {
            case months <= 2:
                setColorAlert("red");
                break;
            case months <= 6:
                setColorAlert("orange");
                break;
            default:
                setColorAlert("green");
                break;
        }
    }

    useEffect(() => {
        defineColorAlert();
    }, []);

    return (
        <section
            className={`car-part-preview ${
                !active ? "active" : ""
            } d-flex justify-content-between align-items-center`}
        >
            <div className="d-flex">
                <img
                    className="car-part-preview__img"
                    src={icons[carPart.name]}
                />
                <div className="car-part-preview__content">
                    <h4 className="car-part-preview__content-name">
                        {voca.capitalize(carPart.name)}
                    </h4>
                    <em
                        className={`car-part-preview__content-time ${colorAlert}`}
                    >
                        {months} mois restant
                        {months > 1 && "s"}
                    </em>
                </div>
            </div>
            <span
                className="icon icon-next"
                style={{ maskImage: `url(${iconNext})` }}
            ></span>
        </section>
    );
};

export default CarPartPreview;
