import React, { useState, useEffect, Component } from "react";
import eye from "../../assets/images/icons/eye-outline.webp";
import bgImageWelcome from "./../../assets/images/background/background-welcome.webp";
import { Link } from "react-router-dom";
import { useFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const REGEX_MAIL = new RegExp("^[A-Za-z0-9+_.-]+@(.+)$");
    const REGEX_PHONE_NUMBER = new RegExp("(0|(\\+33)|(0033))[1-9][0-9]{8}");
    const REGEX_PASSWORD = new RegExp("^([A-Za-z]|[0-9]){8,}$");

    const navigate = useNavigate();
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredNumberMail, setEnteredNumberMail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
    const [isValid, setIsValid] = useState({
        username: true,
        numberMail: true,
        password: true,
        confirmPassword: true,
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
    const [isRegistrationLaunchOk, setIsRegistrationLaunchOk] = useState(false);

    const registration = useFetch({
        endpoint: "register",
        launchRequest: isRegistrationLaunchOk,
        dataBody: {
            email: enteredNumberMail,
            password: enteredPassword,
            name: enteredUsername,
        },
    });

    useEffect(() => {
        if (registration.isSucceed) {
            navigate("/onboarding");
        }

        if(registration.error !== null){
            setIsRegistrationLaunchOk(false)
        }
    }, [registration.queryCounter]);

    const validOrNotInput = (condition, varName) => {
        setIsValid({
            ...isValid,
            [varName]: condition,
        });
    };

    const usernameChangeHandler = (event) => {
        validOrNotInput(event.target.value.trim().length > 3, "username");
        setEnteredUsername(event.target.value);
    };

    const numberMailChangeHandler = (event) => {
        const numberMail = event.target.value.trim();
        validOrNotInput(
            REGEX_PHONE_NUMBER.test(numberMail) || REGEX_MAIL.test(numberMail),
            "numberMail"
        );
        setEnteredNumberMail(numberMail);
    };

    const passwordChangeHandler = (event) => {
        validOrNotInput(REGEX_PASSWORD.test(event.target.value), "password");
        setEnteredPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        const confirmPassword = event.target.value;
        validOrNotInput(
            REGEX_PASSWORD.test(confirmPassword) &&
                confirmPassword == enteredPassword,
            "confirmPassword"
        );
        setEnteredConfirmPassword(confirmPassword);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const allAreValid = Object.values(isValid).every(
            (value) => value === true
        );
        const allAreNotEmpty = [
            enteredUsername,
            enteredNumberMail,
            enteredPassword,
        ].every((value) => value !== "");

        setIsRegistrationLaunchOk(allAreValid && allAreNotEmpty);
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmPassword = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
    };

    return (
        <main className="register bg-cover">
            <img className="bg-cover__img" src={bgImageWelcome} />
            <div>
                <div className="register-title">S'inscrire</div>
                <form>
                    {registration.error}
                    <div>
                        <input
                            type="text"
                            placeholder="Prénom*"
                            className="register__input-box"
                            value={enteredUsername}
                            onChange={usernameChangeHandler}
                        />
                        <p
                            className={`register__error-message ${
                                !isValid.username && "invalid"
                            }`}
                        >
                            Votre nom doit faire au minimum 1 caractère
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Téléphone ou adresse mail*"
                            className="register__input-box"
                            value={enteredNumberMail}
                            onChange={numberMailChangeHandler}
                        />
                        <p
                            className={`register__error-message ${
                                !isValid.numberMail && "invalid"
                            }`}
                        >
                            Votre mail ou téléphone n'est pas valide
                        </p>
                    </div>
                    <div className="register__password-div">
                        <div>
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
                                <img className="eye" src={eye} />
                            </a>
                            <p
                                className={`register__error-message ${
                                    !isValid.password && "invalid"
                                }`}
                            >
                                Votre mot de passe doit faire 8 caractère dont
                                une lettre et un nombre
                            </p>
                        </div>
                    </div>

                    <div className="register__password-div">
                        <div>
                            <input
                                type={
                                    confirmPasswordShown ? "text" : "password"
                                }
                                placeholder="Confirmation du mot de passe *"
                                className="register__input-box"
                                value={enteredConfirmPassword}
                                onChange={confirmPasswordChangeHandler}
                            />
                            <a
                                onClick={toggleConfirmPassword}
                                className="register__password-div-password-shown"
                            >
                                <img className="eye" src={eye} />
                            </a>
                            <p
                                className={`register__error-message ${
                                    !isValid.confirmPassword && "invalid"
                                }`}
                            >
                                La confirmation du mot de passe doit être
                                identique au mot de passe
                            </p>
                        </div>
                    </div>

                    <a href="#" className="register__password-forgot-password">
                        Mot de passe oublié ?
                    </a>

                    <button
                        className="btn btn-primary"
                        onClick={formSubmitHandler}
                    >
                        S'inscrire
                    </button>
                </form>
                <Link to="/connexion" className="btn btn-transparent">
                    Se connecter &nbsp;➜
                </Link>
            </div>
        </main>
    );
};

export default Register;
