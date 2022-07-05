import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const ArticleLargePreview = ({ title, type }) => {
    return (
        <Link to={ROUTES.article.url}>
            <section className="article-large-preview">
                <div className="d-flex">
                    <span className="article-large-preview__type">{type}</span>
                </div>
                <h3 className="article-large-preview__title">{title}</h3>
            </section>
        </Link>
    );
};

export default ArticleLargePreview;
