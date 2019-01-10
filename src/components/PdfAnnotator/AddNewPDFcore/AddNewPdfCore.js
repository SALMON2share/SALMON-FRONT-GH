import React, { Component } from "react";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./imageStyle.css";
import { getSemanticTags } from "../../../utils/Connection";

class AddNewPdfCore extends Component {
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      QRcode: "",
      PDFcoreLink: "",
      pdfCore: "",
      isRequesting: false
    };
  }
  getTag(event) {
    this.setState({
      isRequesting: true
    });
    getSemanticTags(this.state.PDFcoreLink)
      .then(result => {
        console.log("status1: " + JSON.stringify(result));
        this.props.callbackFromParent(this.state.PDFcoreLink, result.data);
      })
      .catch(error => {
        this.props.callbackFromParent(this.state.PDFcoreLink, null);
        console.log("status4: " + error);
      });
    event.preventDefault();
  }

  static isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
    );
    /**
     *
     * Check whether the input file is PDF ? sent the link to SALMON-API
     *
     *
     **/
    var ext = userInput.substring(userInput.lastIndexOf(".") + 1);
    if (ext == "pdf") {
      return res != null;
    }
  }

  validateForm() {
    return (
      this.state.PDFcoreLink.length > 0 &&
      AddNewPdfCore.isUrlValid(this.state.PDFcoreLink)
    );
  }

  render() {
    const mystyle = {
      marginTop: -60
    };
    return (
      <div className="App container" style={mystyle}>
        <div className="col-12 col-md-12 registration-clean-newboard">
          {/*<form action="//localhost:8080/SalmonController_war_exploded/action/tag.do">*/}
          <form onSubmit={this.getTag.bind(this)} className="add-link-clean">
            <h2>Add new pdf-Core </h2>
            <img
              src="../../../images/SALMON.png"
              className="imageStyle"
              alt="newboard"
            />
            <div className="form-group">
              <TextField
                id="PDFcoreLink"
                label="PDFcoreLink"
                placeholder="type PDF link"
                name="PDFcoreLink"
                value={this.state.PDFcoreLink}
                onChange={this.handleChange}
                margin="normal"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!this.validateForm()}
              >
                Add
              </Button>
            </div>
            {this.state.isRequesting && <CircularProgress color="primary" />}
            {/*{this.state.boardLink.length > 0 ? (*/}
            {/*<div>*/}
            {/*/!*<QRCode value={this.state.QRcode = window.location.href + "board?id=" + this.state.boardLink}/>*!/*/}
            {/*<LinkContainer to={"board?id=" + this.state.boardLink}>*/}
            {/*<a className="nav-link text-dark font-weight-bold">*/}
            {/*{this.state.QRcode}*/}
            {/*</a>*/}
            {/*</LinkContainer>*/}
            {/*</div>*/}
            {/*) : (null)}*/}
          </form>
        </div>
      </div>
    );
  }
}

export default AddNewPdfCore;
