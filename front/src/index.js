import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './pages/authentication/Login'
import Register from "./pages/authentication/Register";

const startApp = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route path="connexion" element={<Login />} />
                <Route path="inscription" element={<Register />} />
            </Routes>
        </BrowserRouter>,
        document.getElementById("root")
    );
};

if (window.cordona) {
    document.addEventListener("deviceready", startApp, false);
} else {
    startApp();
}
