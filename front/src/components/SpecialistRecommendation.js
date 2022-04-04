import react, { useState } from "react";

import michelinLogo from "./../assets/images/specialists/michelin.png";
import targetBlankIcon from "./../assets/images/icons/target-blank.svg";

const SpecialistRecommendation = ({ date }) => {
    return (
        <div className="specialist-recommendation">
            <h5 className="specialist-recommendation__title">
                Nous vous recommandons un spécialiste :
            </h5>
            <div className="specialist-recommendation__info">
                <img
                    className="specialist-recommendation__info-img"
                    src={michelinLogo}
                />
                <a href="#" className="specialist-recommendation__info-link">
                    <span>Voir le site</span>
                    <span
                        className="icon"
                        style={{ maskImage: `url(${targetBlankIcon})` }}
                    ></span>
                </a>
            </div>
        </div>
    );
};

export default SpecialistRecommendation;
