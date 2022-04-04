import react, { useState } from "react";

const ArticlePreview = ({ bgImage, title, newArticle }) => {
    return (
        <section
            className="article-preview"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(47, 51, 72, 0.4) 0%, #2F3348 100%), url(${bgImage})`,
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
