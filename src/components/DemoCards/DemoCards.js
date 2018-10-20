import React, {Component} from 'react';
import Header from "../Header/Header";
import ResourceCard from "./ResourseCard.js";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AddLink from "../addLink/AddLink";

class DemoCards extends Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    const fab = {
      position: 'fixed',
      bottom: 20,
      right: 20,
    };
    return (
      <div className="App container">

        <Header/>

        <Button variant="fab" color="primary" style={fab} onClick={this.handleClickOpen}>
          +
        </Button>

        <div className="row" id="card-container">
          <ResourceCard url="https://www.youtube.com/watch?v=Zc54gFhdpLA"/>
          {/*<ResourceCard url="https://www2.informatik.hu-berlin.de/top/lehre/WS06-07/se_se/folien/petrinetze.pdf"/>*/}
          <ResourceCard url="https://www.youtube.com/watch?v=TOsMcgIK95k&list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz"/>
          <ResourceCard url="https://www.youtube.com/watch?v=taClnxU-nao&list=PLqmFiiNyAKRNPP-JPqZnMWRvIpQpCoAFd"/>
          <ResourceCard url="https://www.youtube.com/watch?v=6ik0M-AWrn8"/>
          <ResourceCard url="https://www.youtube.com/watch?v=-5de3kJZ60w"/>
          <ResourceCard url="https://www.youtube.com/watch?v=EmYVZuczJ6k"/>
        </div>


        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth="75%"
        >
          <AddLink open={this.state.open} context={this}/>
        </Dialog>
      </div>
    );
  }
}

export default DemoCards;
