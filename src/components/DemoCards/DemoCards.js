import React, { Component } from "react";
import ResourceCard from "./ResourseCard.js";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AddLink from "../addLink/AddLink";
import AddModalYT from "../YoutubeAPIV3/AddModalYT";
import YTSearch from "youtube-api-search";
import "./ResourceCard.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { addDemoCard } from "../../actions";
import Header from "../Header/Header";
const mapStateToProps = state => {
  return { list: state.listDemoCards };
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
    YTSearch({ key: YT_API, term: this.state.query }, videos => {
      videos.map(video => {
        let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        this.props.onAddResource(url);
      });
      this.setState({ isLoading: false });
    });
  }
  setYoutubeUrl = url => {
    console.log("props here", this.props);
    this.setState({ youtubeURL: url, modalIsOpen: true });
    if (this.props.onClickModalOpen instanceof Function) {
      this.props.onClickModalOpen();
    }
  };
  shouldComponentUpdate(props, state) {
    if (state.query !== this.state.query) return false;
    return true;
  }
  render() {
    const fab = {
      position: "fixed",
      bottom: 775,
      right: 20
    };
    const { list } = this.props;
    return (

      <div className="App container">
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
        <Header/>
        <Button
          variant="fab"
          color="primary"
          style={fab}
          onClick={this.handleClickOpen}
        >
          +
        </Button>
        <div className={"recommendedSection"} />
        <div className="row" id="card-container">
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
