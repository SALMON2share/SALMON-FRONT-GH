import React, { Component } from "react";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import { createNewBoardData } from "../../utils/Connection";
import QRCode from "qrcode-react";
import { LinkContainer } from "react-router-bootstrap";
import SemanticTags from "./SemanticTags";
import tag from './Tags.png';

class SemanticModal extends Component {

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
        let title = this.state.title;
        createNewBoardData(title)
            .then((result) => {
                console.log("status1: " + result);
                if (result.status === 200) {
                    let boardTagCode = result.data.boardTagCode;
                    this.setState({
                        boardLink: boardTagCode
                    });
                }
                else {
                    console.log("status3: " + result);
                }
            })
            .catch(error => {
                console.log("status4: " + error);
            });
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
                    {/*<img src="Tags.png" className="imageStyle" alt="SemanticTags" />*/}
                    <img src={tag} className="imageStyle" />

                    <h2> Recommanded Semantic Tags </h2>

                    <div className="form-group">
                        <TextField
                            id="title"
                            label="Title"
                            placeholder="type board title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            margin="normal"
                            className="form-control"/>
                    </div>
                    <div className="form-group">
                         <SemanticTags/>
                    </div>
                    <div className="form-group">
                        <Button variant="contained" color="primary" type="submit" disabled={!this.validateForm()}>
                            Edit Tags
                        </Button>
                    </div>
                    {this.state.boardLink.length > 0 ? (
                        <div>
                            <QRCode value={this.state.QRcode = window.location.href + "board?id=" + this.state.boardLink}/>
                            {/*we should add pdf core link aboove*/}
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

export default SemanticModal;
