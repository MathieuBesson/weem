import react, { useState } from "react";
import iconFile from "./../assets/images/icons/file.svg";

import "./../styles/components/InvoicePreviewItem.scss";

const InvoicePreviewItem = ({ carPartName }) => {
    return (
        <section className="invoice-preview-item">
            <h4 className="invoice-preview-item__title">
                Entretien : {carPartName}
            </h4>
            <button className="invoice-preview-item__btn btn btn-thirdary w-100">
                Ajouter la facture
                <span
                    className="icon icon-next"
                    style={{ maskImage: `url(${iconFile})` }}
                ></span>
            </button>
        </section>
    );
};

export default InvoicePreviewItem;
