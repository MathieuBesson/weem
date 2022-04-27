import { post } from "./request";

const defaultHeaders = new Headers({
    "Content-Type": "application/json",
});

export const register = (username, password, number = null, mail = null) => {
    return post("http://weem.com/api/users", {
        email: mail,
        password: password,
        name: username,
        phone: number,
    }).then((result) => {
        login(mail, password);
    });
};

export const login = (username, password) => {
    return post("http://weem.com/api/login_check", {
        username: username,
        password: password,
    }).then((result) => {
        // On sauvegarde le token 

        // On récupère les infos du premier véhicule s'il existe 

        // + les infos du user 
    });
};
