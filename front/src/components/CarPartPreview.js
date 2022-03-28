import react, { useState } from "react";

import "./../styles/components/CarPartPreview.scss";
import iconNext from './../assets/images/icons/next.svg'

const CarPartPreview = ({ carPartIcon, carPartName, carPartTime }) => {
    return (
        <section className="car-part-preview">
            <img className="car-part-preview__img" src={carPartIcon} />
            <div className="car-part-preview__content">
                <h4 className="car-part-preview__content-name">
                    {carPartName}
                </h4>
                <em className="car-part-preview__content-time">
                    {carPartTime}
                </em>
            </div>
            <span className="icon icon-next" style={{ maskImage: `url(${iconNext})` }}></span>
        </section>
    );
};

export default CarPartPreview;
