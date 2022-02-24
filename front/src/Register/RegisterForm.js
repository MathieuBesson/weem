import React, { useState } from "react";

import "./RegisterForm.css";

const RegisterForm = (props) => {

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">S'inscrire</h1>
      <form>
          <input
            type="text"
            placeholder="Prénom"
            className="loginForm__input loginForm__text"
          />
          <input
            type="text"
            placeholder="Téléphone ou adresse mail"
            className="loginForm__input loginForm__text"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="loginForm__input"
          />
          <input
          type="password"
          placeholder="Confirmation du mot de passe"
          className="loginForm__input"
        />


        <div className="test">

          <div className="loginForm__divConnect" >
            <button type="submit" className="loginForm__connect">S'inscrire</button>
          </div>
        </div>

      </form>

      <div>
        {/* A remplacer par des imgs */}
        <a>Facebook</a>
        <a>Google</a>
      </div>

      <a href="www.google.com">Se connecter ></a>
    </div>
  );
};

export default RegisterForm;
