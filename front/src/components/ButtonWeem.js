import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// import "../styles/modals/ButtonWeem.sass";

const ButtonWeem = ({ lien }, props) => {
  const classes = "buttonWeem__button " + props.className;

  return (
    <Router>
      <Link
        type={props.type}
        className={classes}
        onClick={props.onClick}
        to={lien}
      >
        {props.children}
      </Link>
    </Router>
  );
};

export default ButtonWeem;
