import { Link } from "react-router-dom";
import share from "../../assets/images/icons/share.svg";
import backArrow from "../../assets/images/icons/back-arrow.svg";
import { ROUTES } from "../../utils/routes";

const Article = () => {
    return (
        <main className="article-detail">
            <div className="article-detail__cover">
                <Link to={ROUTES.blog.url}>
                    <div className="article-detail__cover-back">
                        <span
                            className="icon article-detail__cover-back-icon"
                            style={{ maskImage: `url(${backArrow})` }}
                        ></span>
                    </div>
                </Link>
                <div className="d-flex article-detail__cover-presentation">
                    <div className="d-flex article-detail__cover-presentation-type-block">
                        <span className="article-detail__cover-presentation-type-block-label">
                            nouveau
                        </span>
                    </div>
                    <h3 className="article-detail__cover-presentation-title">
                        Quand faut-il changer un filtre à huile ?
                    </h3>
                </div>
            </div>
            <div className="article-detail__content">
                <p>
                    Pour conserver votre moteur en parfait état, pensez à faire
                    remplacer votre filtre à huile régulièrement comme spécifié
                    par les recommandations constructeur de votre véhicule.
                </p>
                <p>Pourquoi surveiller son filtre à huile voiture ?</p>
                <p>
                    Le filtre à huile permet de purifier l’huile moteur par
                    filtration. Le filtre favorise ainsi la bonne lubrification
                    du moteur en réduisant les frictions, engendrant une
                    diminution de la consommation de carburant. Changer
                    régulièrement son filtre à huile et réaliser une vidange du
                    moteur permet de maintenir les pièces du moteur en bon état.
                </p>
                <p>
                    Nos experts en pneumatique et entretien courant du véhicule
                    vous conseillent d’effectuer en moyenne un changement du
                    filtre à huile tous les 20 000 Km.
                </p>
                <h4>À quel moment remplacer son filtre à huile ?</h4>
                <p>
                    Les raisons de remplacement du filtre à huile, sont diverses
                    et dépendent de l’utilisation que vous faites de votre
                    véhicule mais également de votre environnement de conduite :
                </p>
                <ul>
                    <li>
                        Les trajets courts qui entraînent une multiplication des
                        à-coups
                    </li>
                    <li>
                        Les conditions de conduite (température élevée, régions
                        sablonneuses, bords de mer, etc.)
                    </li>
                    <li>
                        Le type d’huile utilisée Ces différents facteurs peuvent
                        entraîner une dégradation plus rapide du filtre à huile
                        et donc nécessiter un changement plus rapide de ce
                        dernier.
                    </li>
                </ul>
                <h4>Les filtres à huile de la gamme Bosch</h4>
                <ul>
                    <li>
                        Bloc = cartouche filtrante entourée d’un bloc d’acier =
                        à fixer directement sur le moteur
                    </li>
                    <li>
                        Cartouche = cartouche dans un boîtier cylindrique, seule
                        la cartouche se change
                    </li>
                </ul>
                <h4>Comment changer son filtre à huile ?</h4>
                <p>
                    Vous avez constaté une perte de puissance de votre véhicule
                    et le niveau de votre huile est bon ? Euromaster a fait le
                    choix de vous proposer des filtres à huile de la gamme
                    Bosch, le numéro 1 en Europe, à travers ses différents
                    services dédiés à l’entretien de votre véhicule (forfait
                    vidange, révision voiture, vidange moteur)
                </p>
                <em>Écrit par : Lucas Recrosio</em>
            </div>
            <button className="share-btn">
                Partager l'article
                <span
                    className="icon share-btn__icon"
                    style={{ maskImage: `url(${share})` }}
                ></span>
            </button>
        </main>
    );
};

export default Article;
