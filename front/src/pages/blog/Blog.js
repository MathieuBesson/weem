import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonIcon from "../../components/ButtonIcon";
import Loader from "../../components/Loader";
import { ROUTES } from "../../utils/routes";
import loupe from "./../../assets/images/icons/loupe.svg";
import seeMore from "./../../assets/images/icons/see-more.svg";
import ArticleLargePreview from "./ArticleLargePreview";
import ArticleSmallPreview from "./ArticleSmallPreview";

const Blog = () => {
    const [articles, setArticles] = useState([
        {
            title: "Quand faut-il changer un filtre à huile ?",
            type: "nouveau",
            head: true,
        },
        {
            title: "Comment vérifier son niveau d'huile moteur ?",
            type: "populaire",
            head: true,
        },
        {
            title: "Tout savoir sur l'entretien de votre voiture",
            head: false,
        },
        {
            title: "Découvrez nos comparatifs neuf/occasion",
            head: false,
        },
        {
            title: "Forums auto : Une mine d'or de conseils",
            head: false,
        },
        {
            title: "Site 100% automobile : Conseils et astuces",
            head: false,
        },
        {
            title: "Achat ou location ? Quelle est la meilleure stratégie",
            head: false,
        },
        {
            title: "Notre sélection d'accessoire pour votre voiture",
            head: false,
        },
    ]);

    return (
        <main className="blog">
            <h1 className="blog__title">Conseils et astuces</h1>
            <div className="blog__search-bar">
                <input
                    className="blog__search-bar-input"
                    type="text"
                    placeholder="Rechercher un sujet..."
                />
                <div className="blog__search-bar-btn">
                    <span
                        className="icon blog__search-bar-btn-icon"
                        style={{ maskImage: `url(${loupe})` }}
                    ></span>
                </div>
            </div>
            <div className="blog__main-article">
                {articles.map(
                    (article) =>
                        article.head && (
                            <ArticleLargePreview
                                title={article.title}
                                type={article.type}
                            />
                        )
                )}
            </div>
            <div className="blog__second-article">
                <h2 className="blog__second-article-title">Plus d'articles</h2>
                {articles.map(
                    (article) =>
                        !article.head && (
                            <ArticleSmallPreview
                                title={article.title}
                                type={article.type}
                            />
                        )
                )}
            </div>
            <div className="blog__see-more">
                <a className="blog__see-more-link">Voir plus</a>
                <span
                    className="icon blog__see-more-icon"
                    style={{ maskImage: `url(${seeMore})` }}
                ></span>
            </div>
        </main>
    );
};

export default Blog;
