import react, { useState, useEffect } from "react";

import pneuAvant from "./../assets/images/icons/pneu-avant.svg";

const CostEstimationPart = ({
    icon,
    carPartName,
    priceMin,
    priceMax,
    nbMois,
}) => {

    const [colorAlert, setColorAlert] = useState("green");

    useEffect(() => {
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
                <img className="cost-estimation-part__img" src={icon} />
                <h4 className="cost-estimation-part__title">{carPartName}</h4>
            </div>
            <div className="cost-estimation-part__content d-flex flex-column">
                <span className="cost-estimation-part__content-price">
                    {priceMin}-{priceMax}€
                </span>
                <span className={`cost-estimation-part__content-time ${colorAlert}`}>
                    d'ici {nbMois}mois
                </span>
            </div>
        </div>
    );
};

export default CostEstimationPart;
