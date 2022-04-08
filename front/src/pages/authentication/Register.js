import React, { useState } from "react";
import eye from "../../assets/images/icons/eye-outline.webp";
import bgImageWelcome from "./../../assets/images/background/background_welcome.webp";

const Register = (props) => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredNumberMail, setEnteredNumberMail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    let username = "test";

    const usernameChangeHandler = (event) => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredUsername(event.target.value);
    };

    const numberMailChangeHandler = (event) => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredNumberMail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        setEnteredConfirmPassword(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (enteredUsername !== username) {
            setIsValid(false);
            return console.log("Invalid");
        }

        setEnteredUsername("");
        setEnteredNumberMail("");
        setEnteredPassword("");
        setEnteredConfirmPassword("");
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    return (
        <div className="register bg-cover">
            <img className="bg-cover__img" src={bgImageWelcome} />
            <div>
                <div className="register-title">S'inscrire</div>
                <form onSubmit={formSubmitHandler}>
                    <div>
                        <input
                            type="text"
                            placeholder="Prénom*"
                            className="register__input-box"
                            value={enteredUsername}
                            onChange={usernameChangeHandler}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Téléphone ou adresse mail*"
                            className="register__input-box"
                            value={enteredNumberMail}
                            onChange={numberMailChangeHandler}
                        />
                    </div>
                    <div className="register__password-div">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Mot de passe *"
                            className="register__input-box"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                        />
                        <a
                            onClick={togglePassword}
                            className="register__password-div-password-shown"
                        >
                            <img src={eye} />
                        </a>
                    </div>

                    <div className="register__password-div">
                        <input
                            type={confirmPasswordShown ? "text" : "password"}
                            placeholder="Confirmation du mot de passe *"
                            className="register__input-box"
                            value={enteredConfirmPassword}
                            onChange={confirmPasswordChangeHandler}
                        />
                        <a
                            onClick={toggleConfirmPassword}
                            className="register__password-div-password-shown"
                        >
                            <img src={eye} />
                        </a>
                    </div>

                    <a href="#" className="register__password-forgot-password">
                        Mot de passe oublié ?
                    </a>

                    <button className="btn btn-primary">S'inscrire</button>
                </form>
                <a className="btn btn-transparent">S'inscrire &nbsp;➜</a>
            </div>
        </div>
    );
};

export default Register;
