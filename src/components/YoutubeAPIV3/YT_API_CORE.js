import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import _ from "lodash";
import SearchBar from "./Searchbar";
import VideoList from "./VideoList";
import VideoPlayer from "./VIdeoPlayer";
import { connect } from "react-redux";
import { addDemoCard } from "../../actions";
import MainSidbar from "../MainSidbar/MainSidbar";
const mapDispatchToProps = dispatch => {
  return {
    onAddResource: url => {
      dispatch(addDemoCard(url));
    }
  };
};
const YT_API = "AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw";
class YT_API_CORE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      pdftitelQuery: "petrinets"
    };

    this.searchYoutube(this.state.pdftitelQuery);
  }

  videoSearch = _.debounce(term => {
    this.searchYoutube(term);
  }, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term }, videos => {
      videos.map(video => {
        let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        this.props.onAddResource(url);
      });
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return (
      <div>
        <MainSidbar
          onClickModalOpen={() => console.log("modal open")}
          closeModal={() => console.log("modal closed")}
        />
        <div className="container">
          <SearchBar
            onChange={searchTerm => {
              this.videoSearch(searchTerm);
            }}
          />
          <VideoPlayer video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => {
              this.setState({ selectedVideo });
            }}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  mapDispatchToProps
)(YT_API_CORE);
