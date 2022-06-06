import Login from "./../pages/authentication/Login";
import Register from "./../pages/authentication/Register";
import Onboarding from "./../pages/authentication/Onboarding";
import InscriptionChoice from "./../pages/authentication/InscriptionChoice";
import CarInformation from "./../pages/carsCreation/CarInformation";
import PartsPrincipalInformation from "./../pages/carsCreation/PartsPrincipalInformation";

export const ROUTES = {
    inscriptionChoice: {
        url: "/",
    },
    registration: {
        url: "/inscription",
    },
    login: {
        url: "/connexion",
    },
    onboarding: {
        url: "/bienvenue",
    },
    carInformation: {
        url: "/voiture-information",
    },
    partsPrincipalInformation: {
        url: "/pieces-principales",
        params: ["carId"],
    },
    maintenanceUpcoming: {
        url: "/entretiens-a-venir",
    },
    maintenanceHistory: {
        url: "/historique-changements",
    },
    detailPart: {
        url: "/detail-piece",
        params: ["carPartId"],
    },
    maintenanceSave: {
        url: "/entretien",
        params: ["carPartMaintenanceId"],
    },

    // Nav Bar
    home: {
        url: "/home",
    },
    blog: {
        url: "/blog",
    },
    maintenanceBook: {
        url: "/carnet-entretien",
    },
    docs: {
        url: "/documents",
    },
};

export const generateParamsRoutes = (route, params = [], model = false) => {
    const arrayParams = model ? route.params : params;
    return arrayParams.reduce(
        (previousValue, currentValue) =>
            previousValue + "/" + (model ? ":" : "") + currentValue,
        ""
    );
};
