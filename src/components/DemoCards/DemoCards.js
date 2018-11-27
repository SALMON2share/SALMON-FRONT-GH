import React, { Component } from "react";
import ResourceCard from "./ResourseCard.js";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AddLink from "../addLink/AddLink";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { list: state.listDemoCards };
};
class DemoCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const fab = {
      position: "fixed",
      bottom: 20,
      right: 20
    };
    const { list } = this.props;
    return (
      <div className="App container">
        {/*<Header/>*/}
        <Button
          variant="fab"
          color="primary"
          style={fab}
          onClick={this.handleClickOpen}
        >
          +
        </Button>
        // todo
        <div className="row" id="card-container">
          {list.map((item, index) => {
            return <ResourceCard value={item} location={index} key={index} />;
          })}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth="75%"
        >
          <AddLink open={this.state.open} context={this} />
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DemoCards);
