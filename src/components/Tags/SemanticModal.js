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
import {
  addDemoCard,
  addNewTag,
  saveTags,
  clearAllVideoResource
} from "../../actions";
const YT_API = "AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw";

class SemanticModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardLink: "",
      QRcode: "",
      items: this.getTags()
    };
    this.saveTags = this.saveTags.bind(this);
    this.getTags = this.getTags.bind(this);
    this.deleteTags = this.deleteTags.bind(this);
  }

  componentDidMount() {
    this.searchYoutube();
  }
  getTags = () => {
    let ar = [];
    if (this.props.tags && this.props.tags !== undefined) {
      Object.keys(this.props.tags).map(item => {
        if (item.match("^tag") !== null) {
          ar.push({ key: item, value: this.props.tags[item] });
        }
      });
    }
    ar.sort(
      (a, b) => parseInt(a.key.slice(3, 4)) - parseInt(b.key.slice(3, 4))
    );
    return ar;
  };

  //function to search youtube video
  searchYoutube() {
    this.props.clearAllVideoResource(null);
    let searcyQuery = this.getSearchQuery();
    console.log("search query is", searcyQuery);
    YTSearch({ key: YT_API, term: searcyQuery }, videos => {
      videos.map(video => {
        let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        this.props.onAddResource(url);
      });
    });
  }

  //function to create the search query with tag1+tag2+tag3
  getSearchQuery() {
    let searchQuery = "";
    Object.keys(this.props.tags).map(key => {
      if (key.match("^tag") !== null) {
        if (key === "tag1" || key === "tag2" || key === "tag3")
          searchQuery += this.props.tags[key].trim() + " ";
      }
    });
    return searchQuery;
  }
  createNewBoard(event = null) {
    if (event !== undefined && event !== null) event.preventDefault();
    this.searchYoutube();
    let data = {};
    data.username = this.props.username;
    data.pdfCoreLink = this.props.pdfCoreLink;
    data.pdfCore = this.props.pdfCoreLink;
    console.log("tags are", this.props.tags);
    let count = 1;
    Object.keys(this.props.tags).map(key => {
      if (key === "hashkey") {
        data["hashKey"] = this.props.tags[key];
      } else {
        if (key.match("^tag") !== null) {
          data["tag" + count] = this.props.tags[key];
          count++;
        } else data[key] = this.props.tags[key];
      }
    });
    updateSemanticTags(data, this.props.isInitial)
      .then(result => {
        if (result.status === 200) {
          console.log("successfull");
          this.props.onTagUpdate(true);
          this.searchYoutube();
        } else {
          console.log("status3: " + result);
          this.props.onTagUpdate(false);
        }
      })
      .catch(error => {
        console.log("status4: " + error);
        this.props.onTagUpdate(false);
      });
    this.props.toggleIsOk();
  }
  saveTags(newTag) {
    console.log("save the new tags");
    let tagLength = this.getTags().length + 1;
    this.props.saveTags({
      key: "tag" + tagLength,
      value: newTag
    });
  }

  deleteTags(deleteKey) {
    //console.log("delete the tags at", deleteKey);
    let ar = {};
    this.getTags().map(item => {
      if (item.key !== deleteKey) {
        ar[item.key] = item.value;
      }
    });
    ar["hashkey"] = this.props.hashkey;
    console.log("delete the tags ar is", ar);
    this.searchYoutube();
    this.props.createNewTag(ar);
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
          <form method="post" onSubmit={this.createNewBoard.bind(this)}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                position: "absolute",
                top: 20,
                left: "70%",
                width: 40,
                height: 40,
                borderRadius: 20
              }}
              onClick={() => {
                this.createNewBoard();
                this.props.toggleIsOk();
              }}
            >
              X
            </Button>
            <img src={tag} style={imageStyle} />

            <h2> Recommended Semantic Tags </h2>

            <div className="form-group">
              <SemanticTags
                tags={this.getTags()}
                saveTags={this.saveTags}
                deleteTags={this.deleteTags}
              />
            </div>
            <div className="form-group">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.state.items.length === 0}
              >
                OK
              </Button>
            </div>
            {this.state.boardLink.length > 0 ? (
              <div>
                <QRCode
                  value={
                    (this.state.QRcode =
                      window.location.href + "board?id=" + this.state.boardLink)
                  }
                />
                {/*we should add pdf core link aboove*/}
                <LinkContainer to={"board?id=" + this.state.boardLink}>
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
    },
    saveTags: payload => {
      dispatch(addNewTag(payload));
    },
    createNewTag: payload => {
      dispatch(saveTags(payload));
    },
    clearAllVideoResource: payload => {
      dispatch(clearAllVideoResource(payload));
    }
  };
}
const mapStateToProps = state => {
  console.log("tags in semantic modal", state);
  return {
    list: state.listDemoCards,
    tags: state.tags,
    isInitial: state.isInitial
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SemanticModal);
