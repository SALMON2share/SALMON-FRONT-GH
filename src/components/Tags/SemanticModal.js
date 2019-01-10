import React, { Component } from "react";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import { updateSemanticTags } from "../../utils/Connection";
import QRCode from "qrcode-react";
import { LinkContainer } from "react-router-bootstrap";
import SemanticTags from "./SemanticTags";
import tag from "./Tags.png";
import YTSearch from "youtube-api-search";
import { connect } from "react-redux";
import { addDemoCard } from "../../actions";
const YT_API = "AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw";

class SemanticModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            boardLink: "",
            QRcode: "",
            items: props.tags
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({
            title: event.target.value
        });
    };

    componentWillMount() {
        if (
            this.state.items &&
            this.state.items !== undefined &&
            this.state.items.length > 0
        ) {
            let temp = this.state.items.filter(item => item.key === "tag1");
            if (temp.length > 0) {
                this.setState({ title: temp[0].value });
            } else {
                temp = this.state.items.filter(item => item.key === "tag1");
                if (temp.length > 0) this.setState({ title: temp[0].value });
            }
        }
    }
    validateForm() {
        return this.state.title.length > 0;
    }

    //function to search youtube video
    searchYoutube(query) {
        YTSearch({ key: YT_API, term: query }, videos => {
            videos.map(video => {
                let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
                this.props.onAddResource(url);
            });
        });
    }

    createNewBoard(event) {
        this.searchYoutube(this.state.title);
        let title = this.state.title;
        let data = {};
        data.title = this.state.title;
        data.hashKey = this.props.hashkey;
        data.username = this.props.username;
        this.state.items.map(item => {
            data[item.key] = item.value;
        });
        updateSemanticTags(data)
            .then(result => {
                if (result.status === 200) {
                    console.log("successfull");
                } else {
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
            marginTop: 30
        };
        const imageStyle = {
            width: "220px"
        };
        console.log("props in semantic modal", this.props);
        return (
            <div className="App container" style={mystyle}>
                <div className="col-12 col-md-12 registration-clean-newboard">
                    <form
                        method="post"
                        onSubmit={this.createNewBoard.bind(this)}
                    >
                        {/*<img src="Tags.png" className="imageStyle" alt="SemanticTags" />*/}
                        <img src={tag} style={imageStyle} />

                        <h2> Recommended Semantic Tags </h2>

                        <div className="form-group">
                            <TextField
                                id="title"
                                label="Title"
                                placeholder="type board title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                margin="none"
                                className="form-control"
                                style={{ height: "40px" }}
                            />
                        </div>
                        <div className="form-group">
                            <SemanticTags
                                tags={this.props.tags}
                                title={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={!this.validateForm()}
                            >
                                OK
                            </Button>
                        </div>
                        {this.state.boardLink.length > 0 ? (
                            <div>
                                <QRCode
                                    value={
                                        (this.state.QRcode =
                                            window.location.href +
                                            "board?id=" +
                                            this.state.boardLink)
                                    }
                                />
                                {/*we should add pdf core link aboove*/}
                                <LinkContainer
                                    to={"board?id=" + this.state.boardLink}
                                >
                                    <a className="nav-link text-dark font-weight-bold">
                                        {this.state.QRcode}
                                    </a>
                                </LinkContainer>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAddResource: url => {
            dispatch(addDemoCard(url));
        }
    };
}
const mapStateToProps = state => {
    return { list: state.listDemoCards };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SemanticModal);
