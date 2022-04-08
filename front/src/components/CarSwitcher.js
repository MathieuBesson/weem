import react, { useState, useEffect } from "react";

import iconCoupe from "./../assets/images/icons/coupe.svg";

const CarSwitcher = () => {

    const carList = [
        {
            name : 'C3 Picasso',
            image : iconCoupe,
            color : 'green',
            id: 'c3-picasso'
        },
        {
            name : 'C3 Picassa',
            image : iconCoupe,
            color : 'green',
            id: 'c3-picassa'
        }
    ]; 
    return (
        <div className="car-switcher">
            <h2>Vos véhicules</h2>
            <div>
                {carList.map((car, key) => 
                    <section key={key}>
                        <label>
                            <span
                                className={`car-switcher-icon icon mask-${car.color}`}
                                style={{ maskImage: `url(${car.image})` }}
                            ></span>
                            {car.name}
                        </label>

                        <div className="radio-group">
                            <input
                                className={`radio-group-input border-${car.color}`}
                                type="radio"
                                id="diesel"
                                name="fuel-type"
                                value="diesel"
                                required
                            />
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default CarSwitcher;
