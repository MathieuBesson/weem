import react, { useState } from "react";

// Pictures
import pneuAvant from "./../../assets/images/icons/pneu-avant.svg";

// Components
import ButtonIcon from "./../../components/ButtonIcon";
import HeaderGoToBack from "./../../components/HeaderGotToBack";
import CarPartPreview from "./../../components/CarPartPreview";

// Styles
import "./../../styles/pages/homeMaintenance/Home.scss";

const MaintenanceUpcoming = () => {
    return (
        <div className="maintenance-upcomming">
            <HeaderGoToBack>Vos entretien à venir</HeaderGoToBack>
            <CarPartPreview icon={pneuAvant} name="Pneus avants" time={1} />
            <CarPartPreview icon={pneuAvant} name="Pneus avants" time={2} />
            <CarPartPreview icon={pneuAvant} name="Pneus avants" time={6} />
            <CarPartPreview icon={pneuAvant} name="Pneus avants" time={10} />
        </div>
    );
};

export default MaintenanceUpcoming;
