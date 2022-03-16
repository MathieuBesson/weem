import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const startApp = () => {
  ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById("root")
  );
};

if (window.cordona) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}
