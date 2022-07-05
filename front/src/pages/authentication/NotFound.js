import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { ROUTES } from "../../utils/routes";

const NotFound = () => {
    const [isLoading, setLoading] = useState(true);

    const onLoadEffect = () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(onLoadEffect, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="not-found">
            <>
                <h1 className="not-found__title">Oops...</h1>
                <p className="not-found__404">404</p>
                <Link to={ROUTES.home.url} className="btn btn-primary">
                    Retourner à l'acceuil
                </Link>
            </>
        </main>
    );
};

export default NotFound;
