import React, { useState } from "react";

import "./LoginForm.css";

const LoginForm = (props) => {
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isValid, setIsValid] = useState(true);

  // const goalInputChangeHandler = (event) => {
  //   setEnteredValue(event.target.value);
  // };

  // const formSubmitHandler = (event) => {
  //   event.preventDefault();
  //   if (enteredValue.trim().equals === "test@weem.fr") {
  //     setIsValid(false);
  //     return console.log("Invalid");
  //   }
  //   // props.onAddGoal(enteredValue, setIsValid(true));
  // };

  return (
    <div className="loginForm">
      <h1 className="loginForm__title">Se connecter</h1>
      <form>
        <div className="loginForm__div">
          <input
            type="text"
            placeholder="Téléphone ou adresse mail"
            className="loginForm__input loginForm__text"
          />
        </div>
        <div className="loginForm__div loginForm__pwd">
          <input
            type="password"
            placeholder="Mot de passe"
            className="loginForm__input"
          />

        </div>

        <div className="test">
          <div className="loginForm__forget">
                <a href="">mot de passe oublié ?</a>
          </div>

          <div className="loginForm__divConnect" >
            <button type="submit" className="loginForm__connect">Se connecter</button>
          </div>
        </div>

      </form>

      <div>
        {/* A remplacer par des imgs */}
        <a>Facebook</a>
        <a>Google</a>
      </div>

      <a href="www.google.com">S'inscrire ></a>
    </div>
  );
};

export default LoginForm;
