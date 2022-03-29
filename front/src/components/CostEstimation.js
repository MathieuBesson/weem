import react, { useState, useEffect } from "react";

import "./../styles/components/CostEstimation.scss";
import pneuAvant from "./../assets/images/icons/pneu-avant.svg";
import CostEstimationPart from "./../components/CostEstimationPart";

const CostEstimation = () => {
    return (
        <div className="cost-estimation">
            <h3 className="cost-estimation__title">
                Estimation des coûts à venir
            </h3>
            <ul className="cost-estimation__filters">
                <li className="cost-estimation__filters-item active">
                    D'ici 3 mois
                </li>
                <li className="cost-estimation__filters-item">
                    D'ici 6 mois
                </li>
                <li className="cost-estimation__filters-item">
                    D'ici 1 an
                </li>
            </ul>

            <div className="cost-estimation__parts">
                <CostEstimationPart
                    icon={pneuAvant}
                    carPartName={"Courroie de distribution"}
                    priceMin={200}
                    priceMax={300}
                    nbMois={2}
                />
                <CostEstimationPart
                    icon={pneuAvant}
                    carPartName={"Courroie de distribution"}
                    priceMin={300}
                    priceMax={400}
                    nbMois={6}
                />
                <CostEstimationPart
                    icon={pneuAvant}
                    carPartName={"Courroie de distribution"}
                    priceMin={400}
                    priceMax={600}
                    nbMois={10}
                />
            </div>
            <div className="cost-estimation__total d-flex justify-content-between">
                <span className="cost-estimation__total-content">Total</span>
                <span className="cost-estimation__total-cost">~550€</span>
            </div>
        </div>
    );
};

export default CostEstimation;
