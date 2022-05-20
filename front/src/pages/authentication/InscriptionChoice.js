import React from "react";
import Logo from "../../assets/images/icons/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "./../../utils/routes";

import bgImageWelcome from "./../../assets/images/background/background-welcome.webp";

const InscriptionChoice = () => {
    return (
        <main className="inscription-choice bg-cover">
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

                <Link to={ROUTES.registration.url} className="btn btn-primary">S'inscrire</Link>
                <Link to={ROUTES.login.url} className="btn btn-thirdary">Se connecter</Link>
            </div>
        </main>
    );
};
export default InscriptionChoice;
