import react, { useState } from "react";

import "./../styles/components/ArticlePreview.scss";

const ArticlePreview = ({ bgImage, title, newArticle }) => {
    return (
        <section
            className="article-preview"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            {newArticle && (
                <button className="article-preview__new">Nouveau</button>
            )}
            <h4 className="article-preview__title">{title}</h4>
        </section>
    );
};

export default ArticlePreview;
