import React, { useState, useEffect } from "react";
import eye from "../../assets/images/icons/eye-outline.webp";
import bgImageWelcome from "./../../assets/images/background/background-welcome.webp";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../utils/api";
import { setToken } from "./../../store/store";
import { useGetAuthToken } from "./../../utils/auth";
import { ROUTES } from "./../../utils/routes";

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { haveStateToken, haveCookieToken } = useGetAuthToken();

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isValid, setIsValid] = useState({
        username: true,
        password: true,
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const constantes = useSelector((state) => state.constantes);
    const [isLoginLaunchOk, setIsLoginLaunchOk] = useState(false);

    const login = useFetch({
        endpoint: "login",
        launchRequest: isLoginLaunchOk,
        dataBody: {
            username: enteredUsername,
            password: enteredPassword,
        },
    });

    useEffect(() => {
        if (haveStateToken || haveCookieToken) {
            navigate(ROUTES.home.url);
        }
        if (login.isSucceed) {
            dispatch(setToken(login.data.token));
            navigate(ROUTES.home.url);
        }

        console.log(login);
        if (!login.isSucceed && login.queryCounter !== 0) {
            login.resetQuery();
        }
    }, [login.isSucceed]);

    useEffect(() => {
        console.log(login);
        if (!login.isSucceed && login.queryCounter !== 0) {
            login.resetQuery();
            setIsLoginLaunchOk(false);
        }
    }, [login.queryCounter]);

    const validOrNotInput = (condition, varName) => {
        setIsValid({
            ...isValid,
            [varName]: condition,
        });
    };

    const getUserRegex = (regex) => {
        return new RegExp(constantes.User[regex]);
    };

    const usernameChangeHandler = (event) => {
        validOrNotInput(event.target.value.trim().length > 3, "username");
        setEnteredUsername(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        validOrNotInput(
            getUserRegex("REGEX_PASSWORD").test(event.target.value),
            "password"
        );
        setEnteredPassword(event.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        const allAreValid = Object.values(isValid).every(
            (value) => value === true
        );
        const allAreNotEmpty = [enteredUsername, enteredPassword].every(
            (value) => value !== ""
        );
        console.log(allAreValid && allAreNotEmpty);

        setIsLoginLaunchOk(allAreValid && allAreNotEmpty);
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <main className="authentication bg-cover">
            <img className="bg-cover__img" src={bgImageWelcome} />

            <div>
                <h1 className="authentication-title">Se connecter</h1>
                {login.error !== null && (
                    <div>
                        <p className="input-standard-error-message invalid text-left">
                            {login.error}
                        </p>
                    </div>
                )}
                <form onSubmit={formSubmitHandler}>
                    <div className="authentication__password-div">
                        <input
                            type="text"
                            placeholder="Téléphone ou adresse mail*"
                            className="authentication__input-box"
                            value={enteredUsername}
                            onChange={usernameChangeHandler}
                        />
                        <p
                            className={`input-standard-error-message ${
                                !isValid.username && "invalid"
                            }`}
                        >
                            Votre nom doit faire au minimum 3 caractère
                        </p>
                    </div>
                    <div className="authentication__password-div">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="Mot de passe *"
                            className="authentication__input-box authentication__password-div-password"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                        />
                        <a
                            onClick={togglePassword}
                            className="authentication__password-div-password-shown"
                        >
                            <img src={eye} />
                        </a>
                        <p
                            className={`input-standard-error-message ${
                                !isValid.password && "invalid"
                            }`}
                        >
                            Votre mot de passe doit faire 8 caractère dont une
                            lettre et un nombre
                        </p>
                    </div>
                    <a href="#" className="authentication__forgot-password">
                        Mot de passe oublié ?
                    </a>
                    <button className="btn btn-primary">Se connecter</button>
                    <Link
                        to={ROUTES.registration.url}
                        className="btn btn-transparent"
                    >
                        S'inscrire &nbsp;➜
                    </Link>
                </form>
            </div>
        </main>
    );
};

export default Login;
