import react, { useState, useEffect } from "react";

import iconCoupe from "./../assets/images/icons/coupe.svg";

const CarSwitcher = () => {
    const carList = [
        {
            name: "C3 Picasso",
            image: iconCoupe,
            color: "green",
            id: "c3-picasso",
            selected: true
        },
        {
            name: "C3 Picassa",
            image: iconCoupe,
            color: "green",
            id: "c3-picassa",
            selected: false
        },
    ];
    return (
        <div className="car-switcher">
            <h2 className="car-switcher__title">Vos véhicules</h2>
            <div className="car-switcher__car-list">
                {carList.map((car, key) => (
                    <section className={`car-switcher__car-list-item ${!car.selected && `not-selected`}`} key={key}>
                        <span
                            className={`car-switcher__icon icon mask-${car.color}`}
                            style={{ maskImage: `url(${car.image})` }}
                        ></span>
                        <label className="car-switcher__car-list-item-label">
                            {car.name}
                        </label>

                        <div className="radio-group">
                            <input
                                className={`radio-group-input ${car.selected && `border-${car.color}`}`}
                                type="radio"
                                id="diesel"
                                name="fuel-type"
                                value="diesel"
                                required
                                checked={car.selected}
                            />
                        </div>
                    </section>
                ))}
            </div>
            <button className="btn btn-primary">Ajouter un véhicule</button>
        </div>
    );
};

export default CarSwitcher;
