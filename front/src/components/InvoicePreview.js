import react, { useState } from "react";
import iconCross from "./../assets/images/icons/cross.svg";

import "./../styles/components/InvoicePreview.scss";
import InvoicePreviewItem from "./InvoicePreviewItem"

const InvoicePreview = ({ carPartNames }) => {
    return (
        <div className="invoice-preview">
            <h3 className="invoice-preview__title">
                Vous avez {carPartNames.length} entretien{carPartNames.length > 1 && 's'} sans factures associées
            </h3>

            {carPartNames.map(carPartName =>    
                <InvoicePreviewItem 
                    carPartName={carPartName}
                />
            )}
        </div>
    );
};

export default InvoicePreview;
