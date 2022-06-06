export const getPartState = (months) => {
    let carPartState = null;
    switch (true) {
        case months <= 2:
            carPartState = "Mauvais état";
            break;
        case months <= 6:
            carPartState = "Etat intermédiaire";
            break;
        default:
            carPartState = "Bon état";
            break;
    }

    return carPartState;
};

export const getColorAlert = (months) => {
    let colorAlert = null;
    switch (true) {
        case months <= 2:
            colorAlert = "red";
            break;
        case months <= 6:
            colorAlert = "orange";
            break;
        default:
            colorAlert = "green";
            break;
    }

    return colorAlert;
};
