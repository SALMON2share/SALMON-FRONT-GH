import React from "react";
import { IndexLink, Link } from "react-router";
import SalmonLogo from "./sharing and learing material online.png"
import "./Logo.css";

const Logo = (props) => {
  return (
    <div>
      <img className= "sogo" src={SalmonLogo} alt="SalmonProject"/>
    </div>
  );
};

export default Logo;

