import React from "react";
import { IndexLink, Link } from "react-router";
// import MainSidbar from "../MainSidbar/MainSidbar";
// import SideNav2 from "../MainSidbar/SideNav";
import Header from "../Header/Header";
import CollectionList from "./CollectionList";
import './index.css';


const PDFCollections = (props) => {
  const divStyle = {
    display: 'flex',
    alignItems: 'center'
  };
  return (
    <div>
      <Header/>
      <p>SALMON COLLECTION</p>
      <p>SALMON COLLECTION</p>
      <h2 className='TesxtStyle'> Collections </h2>
      <p>{props.children}</p>
      {/*<MainSidbar/>*/}
      <p>SALMON COLLECTION</p>
      <p className='TesxtStyle'>Search For collections</p>
      <input type='text' onChange={props.changed}/>
      <div className= 'divStyle'>
        <CollectionList/>
        <CollectionList/>
        <CollectionList/>
      </div>
    </div>
  );
};

export default PDFCollections;

