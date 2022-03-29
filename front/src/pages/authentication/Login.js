/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import eye from "../../assets/eye-outline.webp";

// import "../../styles/authentication/Login.sass";

const Login = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);

  let username = "test";

  const usernameChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredUsername !== username) {
      setIsValid(false);
      return console.log("Invalid");
    }

    setEnteredUsername("");
    setEnteredPassword("");
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login__template">
      <div className="test">
        <h1 className="">Se connecter</h1>
        <form onSubmit={formSubmitHandler}>
          <div>
            <input
              type="text"
              placeholder="Téléphone ou adresse mail*"
              className="login__input"
              value={enteredUsername}
              onChange={usernameChangeHandler}
            />
          </div>
          <div className="login__passwordDiv">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Mot de passe *"
              className="login__input login__password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
            <a onClick={togglePassword} className="login__passwordShown">
              <img src={eye} />
            </a>
          </div>

          <div className="">
            <div className="login__forgetPasswordDiv">
              <a href="" className="login__forgetPassword">
                Mot de passe oublié ?
              </a>
            </div>

            <div className={`login__errorMessage ${!isValid ? "invalid" : ""}`}>
              Téléphone / Adresse mail ou Mot de passe incorrect !
            </div>

            <div className="login__connect">
              <button type="submit" className="">
                Se connecter
              </button>
            </div>
          </div>
        </form>
        <div className="login__divRegister">
          <a href="www.google.com" className="login__register">
            S'inscrire
          </a>
          ➜
        </div>
      </div>
    </div>
  );
};

export default Login;
