import react, { useState } from "react";
import iconBack from "./../../assets/images/icons/back.svg";
import carWithMountain from "./../../assets/images/background/car-with-mountain.jpg";

import "./../../styles/pages/carsCreation/PartsPrincipalInformation.scss";
import CarPartCard from "./../../components/CarPartCard";
import InfoMessage from "./../../components/InfoMessage";

const PartsPrincipalInformation = () => {
    return (
        <div className="parts-principal-information">
            <div className="parts-principal-information__header">
                <span
                    className="icon icon-back"
                    style={{ backgroundImage: `url(${iconBack})` }}
                ></span>
                <h2 className="parts-principal-information__header-title">
                    Renseignements des pièces et des entretiens
                </h2>
            </div>
            <InfoMessage 
                title="Plus qu'une étape" 
                message="Maintenant que vous avez créé votre véhicule, il ne vous reste plus qu’à remplir les données à propos des différentes pièces !"
                img={carWithMountain}
            />
            <div className="parts-principal-information__part-recurrent">
                <h3 className="parts-principal-information__part-recurrent-title">
                    Entretiens récurrents
                </h3>
                <div className="parts-principal-information__part-recurrent-group d-flex flex-wrap justify-content-between">
                    <button className="parts-principal-information__part-recurrent-group-btn">
                        Contrôle technique
                    </button>
                    <button className="parts-principal-information__part-recurrent-group-btn">
                        Contrôle technique
                    </button>
                    <button className="parts-principal-information__part-recurrent-group-btn">
                        Vidange
                    </button>
                    <button className="parts-principal-information__part-recurrent-group-btn">
                        Vidange
                    </button>
                </div>
            </div>
            <div className="parts-principal-information__part-principal">
                <h3 className="parts-principal-information__part-principal-title">
                    Pièces principales
                </h3>
                <div className="parts-principal-information__part-principal-group d-flex flex-wrap justify-content-between">
                    <CarPartCard
                        carPartImg="./logo192.png"
                        carPartName="Pneus avant"
                    />
                    <CarPartCard
                        carPartImg="./logo192.png"
                        carPartName="Pneus arrières"
                    />
                    <CarPartCard
                        carPartImg="./logo192.png"
                        carPartName="Freins"
                    />
                </div>
            </div>
            <p className="parts-principal-information__disclaimer">
                Texte de warning sur l’impact de ces changements sur les
                résultats de l’appli
            </p>
            <div className="car-informations__form-buttons d-flex">
                <button className="btn btn-primary col-12">Suivant</button>
            </div>
        </div>
    );
};

export default PartsPrincipalInformation;
