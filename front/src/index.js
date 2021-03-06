import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Onboarding from "./pages/authentication/Onboarding";

const startApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<App />}></Route>
                </Routes>
            </BrowserRouter>,
        </Provider>,
        document.getElementById("root")
    );
};

// if (window.cordona) {
//     document.addEventListener("deviceready", startApp, false);
// } else {
    startApp();
// }
