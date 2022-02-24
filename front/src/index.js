import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (window.cordona) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}
