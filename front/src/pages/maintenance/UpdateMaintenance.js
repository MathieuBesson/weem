import react, { useState } from "react";

// Pictures
import iconDate from "./../../assets/images/icons/date.svg";

// Components
import MaintenanceUpcomingPreview from "./../../components/MaintenanceUpcomingPreview";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "./../../components/MaintenanceHistoryItem";

const UpdateMaintenance = () => {
    return (
        <main className="update-maintenance">
            <HeaderGoToBack>Modifier le changement</HeaderGoToBack>

            <h2 className="update-maintenance__date">Changement du 02/08/2021</h2>
            <form className="update-maintenance__form">
                <div className="update-maintenance__form-group">
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
                <div className="update-maintenance__form-btns">
                    <button className="btn btn-primary w-100 text-center">
                        Valider les modifications
                    </button>
                    <button className="btn btn-danger w-100 text-center">
                        Supprimer ce changement
                    </button>
                </div>
            </form>
        </main>
    );
};

export default UpdateMaintenance;
