import React, { useState } from "react";
import eye from "../../assets/images/icons/eye-outline.webp";

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
    <div className="login">
      <div>
        <div className="login-title">Se connecter</div>
        <form onSubmit={formSubmitHandler}>
          <div>
            <input
              type="text"
              placeholder="Téléphone ou adresse mail*"
              className="login__inputBox"
              value={enteredUsername}
              onChange={usernameChangeHandler}
            />
          </div>
          <div className="login__passwordDiv">
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Mot de passe *"
              className="login__inputBox login__passwordDiv-password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
            <a onClick={togglePassword} className="login__passwordDiv-passwordShown">
              <img src={eye} />
            </a>
          </div>

          <div>
            <div className="login__forgetPasswordDiv">
              <a href="" className="login__forgetPasswordDiv-forgetPassword">
                Mot de passe oublié ?
              </a>
            </div>

            <div className={`login__errorMessage ${!isValid ? "invalid" : ""}`}>
              Téléphone / Adresse mail ou Mot de passe incorrect !
            </div>

            <div className="login__connect">
              <button type="submit">
                Se connecter
              </button>
            </div>
          </div>
        </form>
        <div className="login__divRegister">
          <a href="www.google.com" className="login__divRegister-register">
            S'inscrire
          </a>
          ➜
        </div>
      </div>
    </div>
  );
};

export default Login;
