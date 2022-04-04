import react, { useState } from "react";

// Pictures
import iconDate from "./../../assets/images/icons/date.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";

const UpdateMaintenance = () => {
    return (
        <div className="update_maintenance">
            <HeaderGoToBack>
                Renseignements des pièces et des entretiens
            </HeaderGoToBack>

            <form className="update_maintenance__form">
                <div className="update_maintenance__form-group">
                    <h2>Changement du 02/08/2021</h2>
                    <div className="input-date">
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
                    <textarea
                        className="input-standard"
                        name="history-note"
                        id="history-note"
                        cols="30"
                        rows="10"
                        placeholder="Note sur le changement"
                    ></textarea>
                </div>
                <button className="btn btn-primary w-100 text-center">
                    Valider les modifications
                </button>
                <button className="btn btn-danger w-100 text-center">
                    Supprimer ce changement
                </button>
            </form>
        </div>
    );
};

export default UpdateMaintenance;
