import Login from "./../pages/authentication/Login";
import Register from "./../pages/authentication/Register";
import Onboarding from "./../pages/authentication/Onboarding";
import InscriptionChoice from "./../pages/authentication/InscriptionChoice";
import CarInformation from "./../pages/carsCreation/CarInformation";
import PartsPrincipalInformation from "./../pages/carsCreation/PartsPrincipalInformation";

export const ROUTES = {
    inscriptionChoice : {
        url: "/"
    },
    registration : {
        url: "/inscription"
    },
    login : {
        url: "/connexion"
    },
    onboarding : {
        url: "/bienvenue"
    },
    carInformation : {
        url: "/voiture-information"
    },
    partsPrincipalInformation : {
        url: "/pieces-principales",
        params: [
            'carId'
        ]
    },
    home : {
        url: "/home"
    },
}