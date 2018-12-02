import React from "react";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import { IndexLink, Link } from "react-router";
import "../dashboardTest/ReferenceCard.css";

const Rredirect = props => {
    return (
        <div>
            <IconButton onClick={props.click} className="ml-auto">
                <i className="fas fa-thumbtack fa_custom" />
            </IconButton>
        </div>
    );
};

export default Pin;
