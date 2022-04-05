import react, { useState } from "react";

import iconDate from "./../assets/images/icons/date.svg";

const AddMaintenance = ({}) => {
    return (
        <div className={`add-maintenance active`}>
            <h3 className="add-maintenance__title">Ajouter un changement</h3>
            <h5 className="add-maintenance__part-name">Pneus avant</h5>

            <form className="add-maintenance__form">
                <div className="input-date">
                    <input
                        type="date"
                        className="add-maintenance__form-input input-secondary"
                    />
                    <span
                        className="icon icon-date"
                        style={{ backgroundImage: `url(${iconDate})` }}
                    ></span>
                </div>
                <input
                    className="add-maintenance__form-input input-secondary"
                    type="number"
                    placeholder="Kilométrage actuel de la voiture*"
                />

                <div className="input-number">
                    <input
                        className="add-maintenance__form-input input-secondary"
                        type="number"
                        required
                        placeholder="Kilométrage actuel de la voiture*"
                        min="0"
                    ></input>
                    <span className="input-number-moins">-</span>
                    <span className="input-number-plus">+</span>
                </div>
                <textarea
                    className="input-secondary"
                    name="mainteance-note"
                    id="mainteance-note"
                    cols="30"
                    rows="10"
                    placeholder="Note sur le changement"
                ></textarea>
                <button className="btn btn-secondary w-100">Valider</button>
            </form>
        </div>
    );
};

export default AddMaintenance;
