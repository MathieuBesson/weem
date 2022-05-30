import react, { useState } from "react";
import tick from "./../assets/images/icons/tick.svg";
import voca from "voca";
import pneuArriere from "./../assets/images/icons/car-parts/pneu-arriere.svg";
import courroieDistribution from "./../assets/images/icons/car-parts/courroie-distribution.svg";
import filtreAir from "./../assets/images/icons/car-parts/filtre-air.svg";
import filtreCarburant from "./../assets/images/icons/car-parts/filtre-carburant.svg";
import filtreDeshydratant from "./../assets/images/icons/car-parts/filtre-deshydratant.svg";
import filtreHuile from "./../assets/images/icons/car-parts/filtre-huile.svg";
import freins from "./../assets/images/icons/car-parts/freins.svg";
import pneuAvant from "./../assets/images/icons/car-parts/pneu-avant.svg";

const CarPartCard = ({ carPart, handleCreateChange, selected }) => {
    const standardPartImg = {
        "pneus arrières": pneuArriere,
        "pneus avants": pneuAvant,
        "courroie de distribution": courroieDistribution,
        freins: freins,
        filtreAir: filtreAir,
        filtreCarburant: filtreCarburant,
        filtreDeshydratant: filtreDeshydratant,
        filtreHuile: filtreHuile,
    };
    console.log(selected)

    return (
        <div className="car-part-card" onClick={() => handleCreateChange(carPart)}>
            <div
                className={`car-part-card__img-block ${
                    carPart.completed || selected ? "selected" : ""
                }`}
            >
                {carPart.completed || selected ? (
                    <span
                        className="icon icon-tick-green"
                        style={{ maskImage: `url(${tick})` }}
                    ></span>
                ) : (
                    ""
                )}
                <img
                    src={
                        standardPartImg.hasOwnProperty(carPart.name)
                            ? standardPartImg[carPart.name]
                            : pneuArriere
                    }
                    className="img-fluid"
                />
            </div>
            <h5 className="car-part-card__title">
                {voca.capitalize(carPart.name)}
            </h5>
        </div>
    );
};

export default CarPartCard;
