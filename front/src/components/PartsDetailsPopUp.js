import react, { useState } from "react";

const PartsDetailsPopUp = ({ title, active }) => {
    return (
        <div className={`part-detail ${active && 'active'}`}>
            <h3 className="part-detail__title">{title}</h3>
            <input type="date" className="part-detail__input input-secondary"/>
            <input 
                className="part-detail__input input-secondary"
                type="number"
                placeholder="Kilométrage actuel de la voiture*"
            />
            <button className="btn btn-secondary w-100">Valider</button>
        </div>
    );
};

export default PartsDetailsPopUp;
