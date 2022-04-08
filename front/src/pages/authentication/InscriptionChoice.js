import React from "react";
import Logo from "../../assets/images/icons/logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import ButtonWeem from "../../components/ButtonWeem";

const InscriptionChoice = () => {
  return (
    <div className="inscriptionChoice">
      <img
        className="inscriptionChoice__logo"
        src={Logo}
        alt="Logo de l'entreprise, écrit 'Weem' + logo à sa gauche"
      />

      <div className="inscriptionChoice__container">
        <h2 className="inscriptionChoice__container-title">Commençons</h2>
        <div className="inscriptionChoice__container-desc">
          Suivez l'entretien de <br /> votre véhicule et stocker <br /> vos
          documents <br />
          importants
        </div>

        {/* <ButtonWeem lien={'login.js'} className="inscriptionChoice__inscriptionChoice__container-btnRegister">
              S'inscrire
          </ButtonWeem>
          <ButtonWeem className="inscriptionChoice__inscriptionChoice__container-btnConnect">
            Se connecter
          </ButtonWeem> */}
      </div>
    </div>
  );
};

export default InscriptionChoice;
