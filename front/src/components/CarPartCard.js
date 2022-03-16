import react, { useState } from "react";

import "./../styles/components/CarPartCard.scss"

const CarPartCard = ({carPartImg, carPartName}) => {
    return (
        <div className="car-part-card">
            <div className="car-part-card__img-block">
                <img src={carPartImg} className="img-fluid"/>
            </div>
            <h5 className="car-part-card__title">{carPartName}</h5>
        </div>
    );
};

export default CarPartCard;