import react, { useState } from "react";
import InfoMessage from "./InfoMessage";

const PartsExplanation = ({ title, content }) => {
    return (
        <InfoMessage title={title}>
            <p className="info-message-block__content">{content}</p>
            <button className="btn btn-primary w-100">Compris!</button>
        </InfoMessage>
    );
};

export default PartsExplanation;
