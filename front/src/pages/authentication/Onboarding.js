import React, { useState } from "react";

import carsImg from "../../assets/images/specialists/Onboarding.webp";

const Onboarding = (props) => {
  const name = "Théo";

  return (
    <div className="unboarding">
      <div className="unboarding-title">
        Bienvenue <span className="unboarding-title-name">{name}</span>
      </div>

      <img className="unboarding-img" src={carsImg} />

      <div className="unboarding-text">
        Pour commencer à utiliser l'application, vous devez d'abord créer votre
        premier véhicule ! Vous pourrez ensuite profiter pleinement des
        fonctionnalités de l'application.
      </div>

      <button className="btn btn-primary">Créer vorte premier véhicule</button>
    </div>
  );
};

export default Onboarding;
