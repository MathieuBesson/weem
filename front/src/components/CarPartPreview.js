import react, { useState, useEffect } from "react";
import voca from "voca";
import { daysToMonth } from "./../utils/date";

import iconNext from "./../assets/images/icons/next.svg";
import { icons } from "./../utils/iconLoader";
import { Link } from "react-router-dom";
import { getColorAlert } from "../utils/string";

const CarPartPreview = ({ carPart, link = "", active = true }) => {
    const months = daysToMonth(carPart.daysBeforeFutureChange);

    const isCarPartWithoutMaintenance = () =>
        carPart.carPartMaintenances.length === 0;

    return (
        <Link to={link}>
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
                            {isCarPartWithoutMaintenance()
                                ? "Ajouter la pièce " + carPart.name
                                : voca.capitalize(carPart.name)}
                        </h4>
                        {!isCarPartWithoutMaintenance() && (
                            <em
                                className={`car-part-preview__content-time ${getColorAlert(
                                    months
                                )}`}
                            >
                                {months} mois restant
                                {months > 1 && "s"}
                            </em>
                        )}
                    </div>
                </div>
                <span
                    className="icon icon-next"
                    style={{ maskImage: `url(${iconNext})` }}
                ></span>
            </section>
        </Link>
    );
};

export default CarPartPreview;
