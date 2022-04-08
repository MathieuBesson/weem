import React from "react";
import Logo from "../../assets/images/icons/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";

import bgImageWelcome from "./../../assets/images/background/background-welcome.webp";

const InscriptionChoice = () => {
    return (
        <div className="inscription-choice bg-cover">
            <img className="inscription-choice__bg bg-cover__img" src={bgImageWelcome} />
            <img
                className="inscription-choice__logo"
                src={Logo}
                alt="Logo de l'entreprise, écrit 'Weem' + logo à sa gauche"
            />

            <div className="inscription-choice__container">
                <h2 className="inscription-choice__container-title">
                    Commençons
                </h2>
                <div className="inscription-choice__container-desc">
                    Suivez l'entretien de <br /> votre véhicule et stocker{" "}
                    <br /> vos documents <br />
                    importants
                </div>

                <button className="btn btn-primary">S'inscrire</button>
                <button className="btn btn-thirdary">Se connecter</button>
            </div>
        </div>
    );
};
export default InscriptionChoice;
