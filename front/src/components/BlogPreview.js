import react, { useState } from "react";

// Pictures
import bgMaintenance from "./../assets/images/background/bg-maintenance.png";
// // Components
// import ButtonIcon from "./../../components/ButtonIcon";
import ArticlePreview from "./ArticlePreview";

// Styles
import "./../styles/components/BlogPreview.scss";

const BlogPreview = () => {
    return (
        <div className="blog-preview">
            <h3 className="blog-preview__title">
                Nos derniers conseils pour votre entretien !
            </h3>
            <div className="blog-preview__article-list">
                <ArticlePreview
                    bgImage={bgMaintenance}
                    title="Quand faut-il changer un filtre à huile"
                    newArticle={true}
                />
                <ArticlePreview
                    bgImage={bgMaintenance}
                    title="Quand faut-il changer un filtre à huile"
                    newArticle={true}
                />
            </div>
        </div>
    );
};

export default BlogPreview;
