import react, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useFetch } from "../../utils/api";

// Pictures
import iconBackArrow from "./../../assets/images/icons/back-arrow.svg";
import iconNextArrow from "./../../assets/images/icons/next-arrow.svg";
import carWithMountain from "./../../assets/images/background/car-with-mountain.jpg";

// Components
import CarPartCard from "./../../components/CarPartCard";
import InfoMessage from "./../../components/InfoMessage";
import PartsExplanation from "../../components/PartsExplanation";
import FlashMessage from "./../../components/FlashMessage";
import PartsDetailsPopUp from "./../../components/PartsDetailsPopUp";
import HeaderGoToBack from "../../components/HeaderGotToBack";
import voca from "voca";
import { useSelector } from "react-redux";

const PartsPrincipalInformation = () => {
    const carPartConstantes = useSelector(
        (state) => state.constantes.AbstractCarStandardPart
    );
    const location = useLocation();
    const { carId } = location.state ? location.state : { carId: 70 };
    const [currentPartChangeSelected, setCurrentPartChangeSelected] =
        useState(null);
    const [popupActive, setPopupActive] = useState(false);

    const parts = useFetch({
        endpoint: "carParts",
        launchRequest: true,
        dataQuery: {
            keyValue: {
                "car.id": carId,
            },
        },
    });

    const handleCreateChange = (carPart) => {
        setCurrentPartChangeSelected(carPart);
        setPopupActive(true);
    };

    const setNotActivePopup = () => {
        setPopupActive(false);
    };

    console.log(parts);

    const dataLoad =
        carPartConstantes !== undefined && Array.isArray(parts.data);

    return (
        dataLoad && (
            <main className="parts-principal-information">
                <HeaderGoToBack>
                    Renseignements des pièces et des entretiens
                </HeaderGoToBack>
                <div className="parts-principal-information__part-recurrent">
                    <h3 className="parts-principal-information__part-recurrent-title">
                        Entretiens récurrents
                    </h3>
                    <div className="parts-principal-information__part-recurrent-group d-flex flex-wrap justify-content-between">
                        {parts.data.map(
                            (part, id) =>
                                part.importance ===
                                    carPartConstantes.IMPORTANCE_ID
                                        .MAINTENANCE && (
                                    <button
                                        key={id}
                                        className="parts-principal-information__part-recurrent-group-btn"
                                        onClick={() => handleCreateChange(part)}
                                    >
                                        {voca.capitalize(part.name)}
                                    </button>
                                )
                        )}
                    </div>
                </div>
                <div className="parts-principal-information__part-principal">
                    <h3 className="parts-principal-information__part-principal-title">
                        Pièces principales
                    </h3>
                    <div className="parts-principal-information__part-principal-group d-flex flex-wrap justify-content-between">
                        {parts.data.map(
                            (part, id) =>
                                part.importance ===
                                    carPartConstantes.IMPORTANCE_ID.PRIMARY && (
                                    <CarPartCard
                                        key={id}
                                        carPart={part}
                                        handleCreateChange={handleCreateChange}
                                    />
                                )
                        )}
                    </div>
                </div>
                <p className="parts-principal-information__disclaimer">
                    Texte de warning sur l’impact de ces changements sur les
                    résultats de l’appli
                </p>
                <div className="car-informations__form-buttons d-flex">
                    <button className="btn btn-primary col-12">Suivant</button>
                </div>
                {/* <PartsExplanation 
                title="Courroie de distribution"
                content="Une courroie de distribution permet de distribuer la puissance du moteur aux quatres roues grâce à une bande en caoutchouc appelée “Courroie”. En moyenne, une courroie de distribution tient 120 000km."
            />
            <InfoMessage title="Plus qu'une étape">
                <p className="info-message-block__content">Maintenant que vous avez créé votre véhicule, il ne vous reste plus qu’à remplir les données à propos des différentes pièces !</p>
                <p className="info-message-block__content">Vous pouvez également en savoir plus sur l’utilité des pièces en restant appuyé sur une des pièces !</p>
                <img className="info-message-block__img" src={carWithMountain} />
                <p className="info-message-block__next-block">
                    <span className="info-message-block__next-block-content">
                        Continuer
                    </span>
                    <span
                        className="icon icon-next"
                        style={{ backgroundImage: `url(${iconNextArrow})` }}
                    ></span>
                </p>
            </InfoMessage> 
            <FlashMessage type="success" active={true}>
                Changements enregistrés, vous pouvez les modifier à tout moment depuis la tab-bar
            </FlashMessage>
        */}
                <PartsDetailsPopUp
                    carPart={currentPartChangeSelected}
                    active={popupActive}
                    setNotActivePopup={setNotActivePopup}
                />
            </main>
        )
    );
};

export default PartsPrincipalInformation;
