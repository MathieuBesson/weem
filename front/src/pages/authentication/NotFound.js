import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const NotFound = () => {
  console.log("hjbd")

  return (
    <main className="not-found">
      <h1 className="not-found__title">Oops...</h1>
      <p className="not-found__404">404</p>


      <Link to={ROUTES.home.url} className="btn btn-primary">Retourner à l'acceuil</Link>
    </main>
  );
};

export default NotFound;
