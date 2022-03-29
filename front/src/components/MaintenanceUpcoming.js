import react, { useState } from "react";

import "./../styles/components/MaintenanceUpcoming.scss";
import CarPartPreview from "./../components/CarPartPreview";
import pneuAvant from "./../assets/images/icons/pneu-avant.svg";

const MaintenanceUpcoming = () => {
    return (
        <div className="maintenance-upcomming">
            <h3 className="maintenance-upcomming__title">
                Vos entretiens à venir
            </h3>
            <div className="maintenance-upcomming__car-part-group">
                <CarPartPreview
                    icon={pneuAvant}
                    name="Pneus avants"
                    time={1}
                />
                <CarPartPreview
                    icon={pneuAvant}
                    name="Pneus avants"
                    time={3}
                />
                <CarPartPreview
                    icon={pneuAvant}
                    name="Pneus avants"
                    time={10}
                />
            </div>
            <button className="btn btn-thirdary w-100">
                Voir l'état des autres pièces
            </button>
        </div>
    );
};

export default MaintenanceUpcoming;
