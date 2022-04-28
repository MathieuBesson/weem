import React, { useState } from "react";
import { useSelector } from "react-redux";

import carsImg from "../../assets/images/background/car-with-mountain.jpg";

const Onboarding = (props) => {
  const name = "Théo";

  const user = useSelector((state) => console.log(JSON.stringify(state.user)))

  return (
    <main className="onboarding">
      <div className="onboarding-title">
        Bienvenue <span className="onboarding-title-name">{name}</span>
      </div>

      <img className="onboarding-img" src={carsImg} />

      <div className="onboarding-text">
        Pour commencer à utiliser l'application, vous devez d'abord créer votre
        premier véhicule ! Vous pourrez ensuite profiter pleinement des
        fonctionnalités de l'application.
      </div>

      <button className="btn btn-primary">Créer vorte premier véhicule</button>
    </main>
  );
};

export default Onboarding;
