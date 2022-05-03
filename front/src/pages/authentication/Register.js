import React, { useState, useEffect } from "react";
import eye from "../../assets/images/icons/eye-outline.webp";
import bgImageWelcome from "./../../assets/images/background/background-welcome.webp";
import { Link } from "react-router-dom";
import { useFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./../../store/store";
import { useGetAuthToken } from "./../../utils/auth";

const Register = (props) => {
    const constantes = useSelector((state) => state.constantes);
    const {haveStateToken, haveCookieToken} = useGetAuthToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
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
    const [isLoginLaunchOk, setIsLoginLaunchOk] = useState(false);

    const registration = useFetch({
        endpoint: "register",
        launchRequest: isRegistrationLaunchOk,
        dataBody: {
            email: enteredNumberMail,
            password: enteredPassword,
            name: enteredUsername,
        },
    });

    const login = useFetch({
        endpoint: "login",
        launchRequest: isLoginLaunchOk,
        dataBody: {
            username: enteredNumberMail,
            password: enteredPassword,
        },
    });

    useEffect(() => {
        if(haveStateToken || haveCookieToken){
            navigate("/onboarding");
        }

        if (registration.error !== null) {
            setIsRegistrationLaunchOk(false);
        }

        if (registration.isSucceed) {
            setIsLoginLaunchOk(true);
        }

        if (login.isSucceed) {
            dispatch(setToken(login.data.token));
            navigate("/onboarding");
        }
    }, [registration.queryCounter, login.isSucceed]);

    const getUserRegex = (regex) => {
        return new RegExp(constantes.User[regex]); 
    }

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
            getUserRegex("REGEX_PHONE_NUMBER").test(numberMail) ||
            getUserRegex("REGEX_MAIL").test(numberMail),
            "numberMail"
        );
        setEnteredNumberMail(numberMail);
    };

    const passwordChangeHandler = (event) => {
        validOrNotInput(
            getUserRegex("REGEX_PASSWORD").test(event.target.value),
            "password"
        );
        setEnteredPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        const confirmPassword = event.target.value;

        validOrNotInput(
            getUserRegex("REGEX_PASSWORD").test(confirmPassword) &&
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
        <main className="authentication bg-cover">
            <img className="bg-cover__img" src={bgImageWelcome} />
            <div>
                <h1 className="authentication-title">S'inscrire</h1>
                {registration.error !== null && (
                    <div>
                        <p className="authentication__error-message invalid text-left">
                            {registration.error}
                        </p>
                    </div>
                )}
                <form>
                    <div>
                        <input
                            type="text"
                            placeholder="Prénom*"
                            className="authentication__input-box"
                            value={enteredUsername}
                            onChange={usernameChangeHandler}
                        />
                        <p
                            className={`authentication__error-message ${
                                !isValid.username && "invalid"
                            }`}
                        >
                            Votre nom doit faire au minimum 3 caractère
                        </p>
                    </div>

                    <div className="authentication__password-div">
                        <input
                            type="text"
                            placeholder="Téléphone ou adresse mail*"
                            className="authentication__input-box"
                            value={enteredNumberMail}
                            onChange={numberMailChangeHandler}
                        />
                        <p
                            className={`authentication__error-message ${
                                !isValid.numberMail && "invalid"
                            }`}
                        >
                            Votre mail ou téléphone n'est pas valide
                        </p>
                    </div>
                    <div className="authentication__password-div">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Mot de passe *"
                            className="authentication__input-box"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                        />

                        <a
                            onClick={togglePassword}
                            className="authentication__password-div-password-shown"
                        >
                            <img className="eye" src={eye} />
                        </a>
                        <p
                            className={`authentication__error-message ${
                                !isValid.password && "invalid"
                            }`}
                        >
                            Votre mot de passe doit faire 8 caractère dont une
                            lettre et un nombre
                        </p>
                    </div>

                    <div className="authentication__password-div">
                        <div>
                            <input
                                type={
                                    confirmPasswordShown ? "text" : "password"
                                }
                                placeholder="Confirmation du mot de passe *"
                                className="authentication__input-box"
                                value={enteredConfirmPassword}
                                onChange={confirmPasswordChangeHandler}
                            />
                            <a
                                onClick={toggleConfirmPassword}
                                className="authentication__password-div-password-shown"
                            >
                                <img className="eye" src={eye} />
                            </a>
                            <p
                                className={`authentication__error-message ${
                                    !isValid.confirmPassword && "invalid"
                                }`}
                            >
                                La confirmation du mot de passe doit être
                                identique au mot de passe
                            </p>
                        </div>
                    </div>

                    <a href="#" className="authentication__forgot-password">
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
