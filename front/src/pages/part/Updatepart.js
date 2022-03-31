import react, { useState } from "react";
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";
import iconDate from "./../../assets/images/icons/date.svg";
import iconEdit from "./../../assets/images/icons/edit.svg";

import HeaderGoToBack from "./../../components/HeaderGotToBack";

import "./../../styles/pages/part/Updatepart.scss";

const Updatepart = ({ create = true }) => {
    return (
        <div className="update-part">
            <HeaderGoToBack>
                {create ? "Créer un pièece personnalisé" : "Modifier la pièce"}
            </HeaderGoToBack>
            <img className="update-part__img" src={pneuAvant} />
            <form className="update-part__form">
                <div className="input-edit">
                    <div className="update-part__form-group">
                        <label
                            className="update-part__form-group-label"
                            htmlFor="car-part-name"
                        >
                            Informations sur l'entretien
                        </label>

                        <input
                            className="input-standard"
                            type="text"
                            id="car-part-name"
                            name="car-part-name"
                            placeholder="Nom de l'entretien*"
                            required
                        ></input>
                        <span
                            className="icon icon-edit"
                            style={{ backgroundImage: `url(${iconEdit})` }}
                        ></span>
                    </div>
                </div>
                <div className="update-part__form-group">
                    <label
                        className="update-part__form-group-label"
                        htmlFor="car-part-recurrence"
                    >
                        Récurrence de l'entretien*
                    </label>

                    <div>
                        <input
                            type="radio"
                            id="huey"
                            name="drone"
                            value="huey"
                            checked
                        />
                        <label for="huey">Durée</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="dewey"
                            name="drone"
                            value="dewey"
                        />
                        <label for="dewey">Kilométrage</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="louie"
                            name="drone"
                            value="louie"
                        />
                        <label for="louie">Les deux</label>
                    </div>
                </div>

                <div className="update-part__form-group">
                    <div className="input-date">
                        <label
                            className="update-part__form-group-label"
                            htmlFor="car-part-recurrence"
                        >
                            Récurrence de l'entretien*
                        </label>

                        <input
                            className="input-standard"
                            type="date"
                            id="car-part-recurrence"
                            name="car-part-recurrence"
                            placeholder="Nom de l'entretien*"
                            required
                        ></input>
                        <span
                            className="icon icon-date"
                            style={{ backgroundImage: `url(${iconDate})` }}
                        ></span>
                    </div>
                </div>
                <div className="update-part__form-group">
                    <div className="input-number">
                        <input
                            className="input-standard"
                            type="number"
                            id="car-mileage-global"
                            name="car-mileage-global"
                            required
                            placeholder="Km entre chaque entretien"
                            min="0"
                        ></input>
                        <span className="input-number-moins">-</span>
                        <span className="input-number-plus">+</span>
                    </div>
                </div>
                <button className="btn btn-primary">
                    {create
                        ? "Continuer et compléter l'entretien"
                        : "Valider ces changements"}
                </button>
            </form>
        </div>
    );
};

export default Updatepart;
