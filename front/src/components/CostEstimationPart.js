import react, { useState, useEffect } from "react";
import voca from "voca";
import { daysToMonth } from './../utils/date'

import { icons } from "./../utils/iconLoader";

const CostEstimationPart = ({ carPart }) => {
    const [colorAlert, setColorAlert] = useState("green");

    useEffect(() => {
        const nbMois = daysToMonth(carPart.daysBeforeFutureChange);
        switch (true) {
            case nbMois <= 2:
                setColorAlert("red");
                break;
            case nbMois <= 6:
                setColorAlert("orange");
                break;
            default:
                setColorAlert("green");
                break;
        }
    }, []);

    return (
        <div className="cost-estimation-part d-flex align-items-center justify-content-between">
            <div className="d-flex col-8 align-items-center">
                <img
                    className="cost-estimation-part__img"
                    src={icons[carPart.name]}
                />
                <h4 className="cost-estimation-part__title">{voca.capitalize(carPart.name)}</h4>
            </div>
            <div className="cost-estimation-part__content d-flex flex-column">
                <span className="cost-estimation-part__content-price">
                    {carPart.carStandardPart.priceMin}-
                    {carPart.carStandardPart.priceMax}€
                </span>
                <span
                    className={`cost-estimation-part__content-time ${colorAlert}`}
                >
                    d'ici {daysToMonth(carPart.daysBeforeFutureChange)} mois
                </span>
            </div>
        </div>
    );
};

export default CostEstimationPart;
