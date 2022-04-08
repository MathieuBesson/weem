import react, { useState } from "react";

// Pictures
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";

// Components
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import CarPartPreview from "./../../components/CarPartPreview";

const ListMaintenanceParts = () => {
    return (
        <main className="list-maintenance-parts">
            <HeaderGoToBack>Choisir une pièece pour ajouter un changement</HeaderGoToBack>
            <div className="list-maintenance-parts__list">
                <CarPartPreview icon={pneuAvant} name="Pneus avants" time={1} />
                <CarPartPreview icon={pneuAvant} name="Pneus avants" time={2} />
                <CarPartPreview icon={pneuAvant} name="Pneus avants" time={6} />
                <CarPartPreview icon={pneuAvant} name="Pneus avants" time={10} active={false}/>
            </div>
        </main>
    );
};

export default ListMaintenanceParts;
