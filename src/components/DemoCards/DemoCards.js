import React, { Component } from "react";
import ResourceCard from "./ResourseCard.js";
import RecommendCard from "./RecommendCard";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AddLink from "../addLink/AddLink";
import AddModalYT from "../YoutubeAPIV3/AddModalYT";
import YTSearch from "youtube-api-search";
import "./ResourceCard.css";
import  "../Header/Header"
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { addDemoCard } from "../../actions";
import Header from "../Header/Header";
import RelevantCard from "./RelevantCard.js";
const mapStateToProps = state => {
  return {
    list: state.listDemoCards,
    selectedCollection: state.selectedCollection,
    pdfURL: state.pdfURL
  };
};
const YT_API = "AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw";
class DemoCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalIsOpen: false,
      youtubeURL: null,
      query: "",
      recommendedURL: "",
      isLoading: false
    };
    this.setYoutubeUrl = this.setYoutubeUrl.bind(this);
    this.searchYoutube = this.searchYoutube.bind(this);
  }

  /**
   * A module will be open to add new card
   */
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //function to search youtube video
  searchYoutube() {
    this.setState({ isLoading: true });
    console.log("in search youtube", this.props);
    YTSearch({ key: YT_API, term: this.props.recommendedQuery }, videos => {
      videos.map((video, index) => {
        console.log("video are", video);
        if (index === 0) {
          let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
          console.log("searched url is", url);
          this.setState({ recommendedURL: url });
        }
      });
    });
  }
  setYoutubeUrl = url => {
    console.log("props here", this.props);
    this.setState({ youtubeURL: url, modalIsOpen: true });
    if (this.props.onClickModalOpen instanceof Function) {
      this.props.onClickModalOpen();
    }
  };
  componentDidMount() {
    this.searchYoutube();
  }
  render() {
    const fab = {
      position: "fixed",
      bottom: 775,
      right: 20,
      zIndex: 3
    };
    const { list } = this.props;
    console.log("props in demo", this.props);
    return (
      <div className="App container">
        <Header/>
        <AddModalYT
          modalIsOpen={this.state.modalIsOpen}
          closeModal={() => {
            this.setState({ modalIsOpen: false });
            if (this.props.closeModal instanceof Function) {
              this.props.closeModal();
            }
          }}
          url={this.state.youtubeURL}
        />
        <Button
          variant="fab"
          color="primary"
          style={fab}
          onClick={this.handleClickOpen}
        >
          +
        </Button>
        {this.props.selectedCollection &&
          this.props.pdfURL.trim() !==
            this.props.selectedCollection.pdfURL.trim() && (
            <div className="row" id="card-container">
              <span
                style={{
                  fontSize: 20,
                  color: "#fff",
                  marginLeft: 10
                }}
              >
                {"LOCAL COLLECTION RECOMMENDATION"}
              </span>
              <RelevantCard />
            </div>
          )}

        <div className={"row recommendedSection"} id="card-container">
          <span
            style={{
              fontSize: 20,
              color: "#fff",
              marginLeft: 10
            }}
          >
            {"DISCOVER NEW CARD"}
          </span>
          <RecommendCard
            url={this.state.recommendedURL}
            setYoutubeUrl={this.setYoutubeUrl}
          />
        </div>
        <div className="row" id="card-container">
          <span
            style={{
              fontSize: 20,
              color: "#fff",
              marginLeft: 10
            }}
          >
            {"SORTED RECOMMENDATION LINKS"}
          </span>
          {list.map((item, index) => {
            return (
              <ResourceCard
                value={item}
                location={index}
                key={index}
                setYoutubeUrl={this.setYoutubeUrl}
              />
            );
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
function mapDispatchToProps(dispatch) {
  return {
    onAddResource: url => {
      dispatch(addDemoCard(url));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemoCards);
