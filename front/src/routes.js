import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Menu = props => {

    return(
        <Router>
            <Link to={props.to}>{props.link}</Link>

            <Route exact path={props.to} component={props.component} />

        </Router>
    )

}

export default Menu