import react, { useState, useEffect } from "react";

import iconNext from "./../assets/images/icons/next.svg";

const CarPartPreview = ({ icon, name, time, active = true }) => {
    const [colorAlert, setColorAlert] = useState("green");

    useEffect(() => {
        switch (true) {
            case time <= 2:
                setColorAlert("red");
                break;
            case time <= 6:
                setColorAlert("orange");
                break;
            default:
                setColorAlert("green");
                break;
        }
    }, []);

    return (
        <section className={`car-part-preview ${!active && 'active'} d-flex justify-content-between align-items-center`}>
            <div className="d-flex">
                <img className="car-part-preview__img" src={icon} />
                <div className="car-part-preview__content">
                    <h4 className="car-part-preview__content-name">{name}</h4>
                    <em className={`car-part-preview__content-time ${colorAlert}`}>
                        {time} mois restant{time > 1 && "s"}
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
