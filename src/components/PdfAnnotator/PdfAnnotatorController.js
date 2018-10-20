import React from "react";
import { IndexLink, Link } from "react-router";
// import MainSidbar from "../MainSidbar/MainSidbar";
// import SideNav2 from "../MainSidbar/SideNav";
import Header from "../Header/Header";
import PdfAnnotator from "./PdfAnnotator";
import MainSidbar from "../PdfAnnotator/MainSidbar/MainSidbar";


const PdfAnnotatorController = (props) => {
  return (
    <div>
      <Header/>
      <MainSidbar/>
      <PdfAnnotator/>
    </div>
  );
};

export default PdfAnnotatorController;
