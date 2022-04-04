import react, { useState } from "react";

import iconBus from "./../../assets/images/icons/bus.svg";
import iconCar from "./../../assets/images/icons/car.svg";
import iconF1 from "./../../assets/images/icons/f1.svg";

const CarsInformation = () => {
    return (
        <div className="car-informations">
            <h2 className="car-informations__title">
                Renseignements du véhicule
            </h2>
            <form className="car-informations__form">
                <div className="car-informations__form-group">
                    <label
                        className="car-informations__form-group-label"
                        htmlFor="car-brand-select"
                    >
                        Marque du véhicule<em className="input-required">*</em>
                    </label>
                    <select
                        className="input-standard"
                        name="car-brands"
                        id="car-brand-select"
                        required
                    >
                        <option value="">Selectionner une marque</option>
                        <option value="marque1">Marque1</option>
                        <option value="marque2">Marque2</option>
                        <option value="marque3">Marque3</option>
                    </select>
                </div>
                <div className="car-informations__form-group">
                    <label
                        className="car-informations__form-group-label"
                        htmlFor="car-model"
                    >
                        Modèle<em className="input-required">*</em>
                    </label>
                    <input
                        className="input-standard"
                        type="text"
                        id="car-model"
                        name="car-model"
                        required
                        minLength="4"
                        maxLength="8"
                        size="10"
                        placeholder="Peugeot 407"
                    />
                </div>
                <div className="car-informations__form-group">
                    <label
                        className="car-informations__form-group-label"
                        htmlFor="car-registration"
                    >
                        Numéro d’immatriculation<em className="input-required">*</em>
                    </label>
                    <input
                        className="input-standard"
                        type="text"
                        id="car-registration"
                        name="car-registration"
                        required
                        minLength="4"
                        maxLength="8"
                        size="10"
                        placeholder="XX-111-XX"
                    />
                </div>
                <div className="car-informations__form-group">
                    <label
                        className="car-informations__form-group-label"
                        htmlFor="car-date-released"
                    >
                        Mise en circulation du véhicule<em className="input-required">*</em>
                    </label>

                    <input
                        className="input-standard"
                        type="date"
                        id="car-date-released"
                        name="car-date-released"
                        required
                    ></input>
                </div>
                <div className="car-informations__form-group">
                    <label
                        className="car-informations__form-group-label"
                        htmlFor="car-mileage-global"
                    >
                        Kilométrage du véhicule<em className="input-required">*</em>
                    </label>

                    <div className="input-number">
                        <input
                            className="input-standard"
                            type="number"
                            id="car-mileage-global"
                            name="car-mileage-global"
                            required
                            placeholder="100 000km"
                            min="0"
                        ></input>
                        <span className="input-number-moins">-</span>
                        <span className="input-number-plus">+</span>
                    </div>
                </div>
                <div className="car-informations__form-group fuel-type-block">
                    <h3 className="car-informations__form-group-title">
                        Type de carburant<em className="input-required">*</em>
                    </h3>
                    <div className="car-informations__form-group-radio">
                        <div className="car-informations__form-group-radio-diesel">
                            <input
                                className="car-informations__form-group-radio-diesel-input"
                                type="radio"
                                id="diesel"
                                name="fuel-type"
                                value="diesel"
                                required
                                // checked
                            />
                            <label
                                className="car-informations__form-group-radio-diesel-label"
                                htmlFor="diesel"
                            >
                                Diesel
                            </label>
                        </div>
                        <div className="car-informations__form-group-radio-essence">
                            <input
                                className="car-informations__form-group-radio-essence-input"
                                type="radio"
                                id="essence"
                                name="fuel-type"
                                value="essence"
                                required
                            />
                            <label
                                className="car-informations__form-group-radio-essence-label"
                                htmlFor="essence"
                            >
                                Essence
                            </label>
                        </div>
                        <div className="car-informations__form-group-radio-hybride">
                            <input
                                className="car-informations__form-group-radio-hybride-input"
                                type="radio"
                                id="hybride"
                                name="fuel-type"
                                value="hybride"
                                required
                            />
                            <label
                                className="car-informations__form-group-radio-hybride-label"
                                htmlFor="hybride"
                            >
                                Hybride
                            </label>
                        </div>
                        <div className="car-informations__form-group-radio-electric">
                            <input
                                className="car-informations__form-group-radio-electric-input"
                                type="radio"
                                id="electric"
                                name="fuel-type"
                                value="electric"
                                required
                            />
                            <label
                                className="car-informations__form-group-radio-electric-label"
                                htmlFor="electric"
                            >
                                Electrique
                            </label>
                        </div>
                        <div className="car-informations__form-group-radio-other">
                            <input
                                className="car-informations__form-group-radio-other-input"
                                type="radio"
                                id="autre"
                                name="fuel-type"
                                value="autre"
                                required
                            />
                            <label
                                className="car-informations__form-group-radio-other-label"
                                htmlFor="autre"
                            >
                                Autre
                            </label>
                        </div>
                    </div>
                </div>
                <div className="car-informations__form-group driving-style-block">
                    <h3 className="car-informations__form-group-title">
                        Style de conduite<em className="input-required">*</em>
                    </h3>
                    <input
                        className="input-range"
                        type="range"
                        id="driving-style"
                        name="driving-style"
                        min="1"
                        max="3"
                        step="1"
                    />
                    <div className="car-informations__form-group-range-labels">
                        <span>
                            <em
                                className="icon icon-moderate"
                                style={{ backgroundImage: `url(${iconBus})` }}
                            ></em>
                            Souple
                        </span>
                        <span>
                            <em
                                className="icon icon-moderate"
                                style={{ backgroundImage: `url(${iconCar})` }}
                            ></em>
                            Neutre
                        </span>
                        <span>
                            <em
                                className="icon icon-moderate"
                                style={{ backgroundImage: `url(${iconF1})` }}
                            ></em>
                            Sportive
                        </span>
                    </div>
                </div>
                <div className="car-informations__form-group">
                    <label
                        className="car-informations__form-group-label"
                        htmlFor="car-mileage-mensual"
                    >
                        Kilométrage mensuel du véhicule<em className="input-required">*</em>
                    </label>

                    <div className="input-number">
                    <input
                        className="input-standard"
                        type="number"
                        id="car-mileage-mensual"
                        name="car-mileage-mensual"
                        required
                        placeholder="1200 km/mois"
                        min="0"
                    />
                        <span className="input-number-moins">-</span>
                        <span className="input-number-plus">+</span>
                    </div>
                </div>
                <p className="car-informations__form-disclaimer">
                    Attention, ces informations vont nous permettre d’affiner
                    nos prédictions pour vos entretiens. Essayez donc de rentrer
                    vos informations au plus proche de la réalité !
                </p>
                <div className="car-informations__form-buttons">
                    <button className="btn btn-primary">Valider</button>
                    <button className="btn btn-thirdary">
                        Continuer plus tard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CarsInformation;
