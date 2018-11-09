import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './Searchbar';
import VideoList from './VideoList';
import VideoPlayer from './VIdeoPlayer'
import Header from "../Header/Header";
// import NavBar from './NavBar'

const YT_API = 'AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw';

class YT_API_CORE extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
      pdftitelQuery : "petrinets"
    };

    this.searchYoutube(this.state.pdftitelQuery);
  }

  videoSearch = _.debounce((term) => { this.searchYoutube(term)}, 300);

  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <SearchBar onChange={(searchTerm) => {this.videoSearch(searchTerm)}} />
          <VideoPlayer video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={(selectedVideo) => {this.setState({selectedVideo})}}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }

}
export default YT_API_CORE;
// ReactDOM.render(<App />, document.querySelector('.app'));
