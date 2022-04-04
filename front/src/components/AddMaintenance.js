import react, { useState } from "react";

import iconDate from "./../assets/images/icons/date.svg";

const AddMaintenance = ({ }) => {
    return (
        <div className={`add-maintenance active`}>
            <h3 className="add-maintenance__title">Ajouter un changement</h3>
            <h className="add-maintenance__title">Pneu avant</h>

            <div className="input-date">
                <input
                    type="date"
                    className="add-maintenance__input input-secondary"
                />
                <span
                    className="icon icon-date"
                    style={{ backgroundImage: `url(${iconDate})` }}
                ></span>
            </div>
            <input
                className="add-maintenance__input input-secondary"
                type="number"
                placeholder="Kilométrage actuel de la voiture*"
            />
            <textarea
                className="input-secondary"
                name="mainteance-note"
                id="mainteance-note"
                cols="30"
                rows="10"
                placeholder="Note sur le changement"
            ></textarea>
            <button className="btn btn-secondary w-100">Valider</button>
        </div>
    );
};

export default AddMaintenance;
