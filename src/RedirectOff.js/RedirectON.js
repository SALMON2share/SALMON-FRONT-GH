import React from "react";
import "./Logo.css";

const Logo = (props) => {
    return (
        <div>
            <img className= "sogo" src={props.address} alt="SalmonProject"/>
        </div>
    );
};

export default Logo;

