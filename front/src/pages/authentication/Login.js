import React, { useState } from "react";
import eye from "../../assets/images/icons/eye-outline.webp";
import bgImageWelcome from "./../../assets/images/background/background-welcome.webp";

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
        <div className="login bg-cover">
            <img
                className="bg-cover__img"
                src={bgImageWelcome}
            />

            <div>
                <div className="login-title">Se connecter</div>
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <input
                            type="text"
                            placeholder="Téléphone ou adresse mail*"
                            className="login__input-box"
                            value={enteredUsername}
                            onChange={usernameChangeHandler}
                        />
                    </div>
                    <div className="login__password-div">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Mot de passe *"
                            className="login__input-box login__password-div-password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                        />
                        <a
                            onClick={togglePassword}
                            className="login__password-div-password-shown"
                        >
                            <img src={eye} />
                        </a>
                    </div>

                    <div className="login__forget-password">
                        <div className="login__forget-password-div">
                            <a
                                href="#"
                                className="login__forget-password-div-forget-password"
                            >
                                Mot de passe oublié ?
                            </a>
                        </div>

                        <div
                            className={`login__error-message ${
                                !isValid ? "invalid" : ""
                            }`}
                        >
                            Téléphone / Adresse mail ou Mot de passe incorrect !
                        </div>

                        <a href="#" className="btn btn-primary">Se connecter</a>
                        <a href="#" className="btn btn-transparent">
                            S'inscrire &nbsp;➜
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
