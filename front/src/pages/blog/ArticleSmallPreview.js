import blogSmall1 from "../../assets/images/background/blog-small-1.png";
import blogSmall2 from "../../assets/images/background/blog-small-2.png";
import blogSmall3 from "../../assets/images/background/blog-small-3.png";
import blogSmall4 from "../../assets/images/background/blog-small-4.png";

const ArticleSmallPreview = ({ title }) => {
    const imagesblog = [blogSmall1, blogSmall2, blogSmall3, blogSmall4];

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <section className="article-small-preview">
            <img
                src={imagesblog[randomInt(0, 3)]}
                className="article-small-preview__img"
            />
            <h3 className="article-small-preview__title">{title}</h3>
        </section>
    );
};

export default ArticleSmallPreview;
