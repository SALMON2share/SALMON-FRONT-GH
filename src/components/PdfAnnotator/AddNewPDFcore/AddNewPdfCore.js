import React, { Component } from "react";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import { createNewBoardData } from "../../../utils/Connection";
import QRCode from "qrcode-react";
import { LinkContainer } from "react-router-bootstrap";
import "./imageStyle.css";

class AddNewPdfCore extends Component {

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            boardLink: "",
            QRcode: ""
        };
    }
    validateForm() {
        return this.state.title.length > 0;
    }

    createNewBoard(event) {
        const args_to_parent = {
            title : this.state.title,
            pdflink : this.state.pdflink
        };

        this.props.callbackFromParent(args_to_parent)
        event.preventDefault();
    }

    render() {
        const mystyle = {
            marginTop:-60
        };
        return <div className="App container" style={mystyle}>
            <div className="col-12 col-md-12 registration-clean-newboard">
                <form method="post"
                      onSubmit={this.createNewBoard.bind(this)}>
                    <h2>Add new pdf-Core </h2>
                    <img src="../../../images/SALMON.png" className="imageStyle" alt="newboard" />
                    <div className="form-group">
                        <TextField
                            id="title"
                            label="Title"
                            placeholder="type board title"
                            name="title"
                            value={this.state.email}
                            onChange={this.handleChange}
                            margin="normal"
                            className="form-control"/>
                    </div>
                    <div className="form-group">
                        <TextField
                            id="pdflink"
                            label="PDFlink"
                            placeholder="type PDF link"
                            name="PDFlink"
                            value={this.state.email}
                            onChange={this.handleChange}
                            margin="normal"
                            className="form-control"/>
                    </div>
                    <div className="form-group">
                        <Button variant="contained" color="primary" type="submit" disabled={!this.validateForm()}>
                            Add
                        </Button>
                    </div>
                    {this.state.boardLink.length > 0 ? (
                        <div>
                            {/*<QRCode value={this.state.QRcode = window.location.href + "board?id=" + this.state.boardLink}/>*/}
                            <LinkContainer to={"board?id=" + this.state.boardLink}>
                                <a className="nav-link text-dark font-weight-bold">
                                    {this.state.QRcode}
                                </a>
                            </LinkContainer>
                        </div>
                    ) : (null)}

                </form>
            </div>
        </div>
    }
}

export default AddNewPdfCore;
