import react, { useEffect, useState } from "react";

// Pictures
import iconDate from "./../../assets/images/icons/date.svg";

// Components
import MaintenanceUpcomingPreview from "../../components/MaintenanceUpcomingPreview";
import HeaderGoToBack from "../../components/HeaderGotToBack";
import MaintenanceHistoryItem from "../../components/MaintenanceHistoryItem";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../utils/api";
import moment from "moment";
import { useSelector } from "react-redux";

const UpdateMaintenance = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [isValidDate, setIsValidDate] = useState(true);

    const { carPartMaintenanceId } = useParams();
    console.log(carPartMaintenanceId);

    const carPartMaintenance = useFetch({
        endpoint: "carPartMaintenance",
        launchRequest: true,
        dataQuery: {
            justValue: carPartMaintenanceId,
        },
    });
    const carPartMaintenanceSave = useFetch({
        endpoint: "carPartMaintenanceSave",
        dataQuery: {
            justValue: carPartMaintenanceId,
        },
        dataBody: {
            dateLastChange: date !== "" ? date : null,
            note: note !== "" ? note : null,
        },
    });
    const carPartMaintenanceDelete = useFetch({
        endpoint: "carPartMaintenanceDelete",
        dataQuery: {
            justValue: carPartMaintenanceId,
        },
    });

    useEffect(() => {
        if (carPartMaintenance.isSucceed) {
            const maintenance = carPartMaintenance.data;
            setDate(moment(maintenance.dateLastChange).format("YYYY-MM-DD"));
            setNote(maintenance.note);
        }
    }, [carPartMaintenance.isSucceed]);

    const handleChangeDate = (e) => {
        const value = e.target.value;
        setDate(value);
        setIsValidDate(moment(value, "YYYY-MM-DD", true).isValid());
    };

    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    const handleSaveChange = (e) => {
        e.preventDefault();
        if (isValidDate && date !== "") {
            carPartMaintenanceSave.setLaunchRequest(true);
            navigate(-1);
        }
    };

    const handleDeleteChange = (e) => {
        e.preventDefault();
        carPartMaintenanceDelete.setLaunchRequest(true);
        navigate(-1);
    };

    return (
        <main className="update-maintenance">
            <HeaderGoToBack>Modifier le changement</HeaderGoToBack>

            <h2 className="update-maintenance__date">
                Changement du{" "}
                {moment(carPartMaintenance.data.dateLastChange).format(
                    "DD/MM/YYYY"
                )}
            </h2>
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
                            value={date}
                            onChange={handleChangeDate}
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
                        value={note}
                        onChange={handleChangeNote}
                    ></textarea>
                </div>
                <div className="update-maintenance__form-btns">
                    <button
                        onClick={handleSaveChange}
                        className="btn btn-primary w-100 text-center"
                    >
                        Valider les modifications
                    </button>
                    <button
                        onClick={handleDeleteChange}
                        className="btn btn-danger w-100 text-center"
                    >
                        Supprimer ce changement
                    </button>
                </div>
            </form>
        </main>
    );
};

export default UpdateMaintenance;
