import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import URLSearchParams from "url-search-params";
import type, { T_Highlight, T_NewHighlight } from "react-pdf-highlighter";
import {
  AreaHighlight,
  Highlight,
  PdfHighlighter,
  PdfLoader,
  Popup,
  Tip
} from "react-pdf-highlighter";
import Spinner from "../spinner/Spinner";
import Button from "@material-ui/core/es/Button/Button";
import Modal from "react-modal";
import "./index.css";
import { createNewBoardData, getSemanticTags } from "../../utils/Connection";
import axios from "axios";
import Header from "../Header/Header";
import AnnotateSidebar from "./AnnotateSidebar/AnnotateSidebar";
import MainSidbar from "../MainSidbar/MainSidbar";
import AddNewPdfCore from "./AddNewPDFcore/AddNewPdfCore";
import SemanticModal from "../Tags/SemanticModal";
import { connect } from "react-redux";
import {
  savePdfURL,
  saveTags,
  addDemoCard,
  clearAllVideoResource
} from "../../actions";
//with IFRAME
type T_ManuscriptHighlight = T_Highlight;

type Props = {};

type State = {
  highlights: Array<T_ManuscriptHighlight>
};

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

const resetHash = () => {
  window.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";

const searchParams = new URLSearchParams(window.location.search);
const url = searchParams.get("url") || DEFAULT_URL;
const YT_API = "AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw";
Modal.setAppElement("#root  ");

class PdfAnnotator extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      highlights: props.testHighlights[props.pdfURL]
        ? [...props.testHighlights[props.pdfURL]]
        : [],
      modalIsOpen: false,
      PdfzIndex: "zIndexDefault",
      url: props.pdfURL,
      default_link: true,
      new_url: props.pdfURL,
      sidebarOpen: false,
      isReply: false
    };
    this.changeReply = this.changeReply.bind(this);
    this.getTags = this.getTags.bind(this);
    this.searchYoutube = this.searchYoutube.bind(this);
  }

  changeReply = value => {
    this.setState({ isReply: value });
  };
  openModal = () => {
    this.props.saveTags(null);
    this.setState({
      modalIsOpen: true,
      default_link: false,
      PdfzIndex: "zIndexChanged"
    });
  };

  closeModal = () => {
    console.log("close the modal");
    this.setState({
      modalIsOpen: false,
      PdfzIndex: "zIndexDefault",
      default_link: true
    });
  };

  resetHighlights = () => {
    this.setState({
      highlights: []
    });
  };

  scrollViewerTo = highylight => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }
  componentWillMount() {
    console.log("cookies are", this.props.cookies);
    if (this.props.cookies.get("username") === undefined) {
      this.props.history.push("/Login");
    } else {
      getSemanticTags(this.props.pdfURL)
        .then(result => {
          console.log("status1: " + JSON.stringify(result));
          this.props.saveTags(result.data);
        })
        .catch(error => {
          console.log("status4: " + error);
        });
    }
  }
  //when component recev tags, this lifecycle method will fetch the youtube videos
  shouldComponentUpdate(props, state) {
    if (props.tags !== null && props.tags !== this.props.tags) {
      if (props.tags.tag3 !== undefined) this.searchYoutube(props.tags.tag3);
      else this.searchYoutube(props.tags.tag1);
    }
    return true;
  }

  //function to search youtube video
  searchYoutube(term) {
    YTSearch({ key: YT_API, term: term }, videos => {
      videos.map(video => {
        let url = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        this.props.onAddResource(url);
      });
    });
  }
  getHighlightById(id) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  addHighlight(highlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights]
    });
  }

  updateHighlight(highlightId, position, content) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
              ...h,
              position: { ...h.position, ...position },
              content: { ...h.content, ...content }
            }
          : h;
      })
    });
  }

  myCallback = (pdfURL, newTags) => {
    let url_link = pdfURL;
    this.props.saveURL(pdfURL);
    this.props.saveTags(newTags);
    this.props.clearAllVideoResource(null);
    this.setState({
      modalIsOpen: false,
      PdfzIndex: "zIndexDefault",
      default_link: false
    });
    this.handleMe(url_link);
  };

  handleMe = url_link => {
    if (url_link == "") return;
    axios({ url: url_link, method: "GET", responseType: "blob" })
      .then(res => {
        this.setState({ default_link: true, new_url: url_link });
      })
      .catch(e => {
        axios({
          url: "https://cors-anywhere.herokuapp.com/" + url_link,
          method: "GET",
          responseType: "blob",
          headers: { Origin: url_link }
        })
          .then(res => {
            if (/pdf/.test(url_link)) {
              var blob_url = URL.createObjectURL(res.data);
              this.setState({ default_link: true, new_url: blob_url });
              this.props.saveURL(blob_url);
            } else {
              alert(
                "thats not pdf file but you can stil add external link about it"
              );
              var blob = new Blob([res.data], { type: "text/html" });
              var blob_url = URL.createObjectURL(blob);
              var iframeDoc = (document.querySelector(
                "#myiframe"
              ).src = blob_url);
              var new_url = blob_url.split("blob:");
              console.log(new_url);
              this.setState({ url: new_url[1], default_link: false });
              this.props.saveURL(new_url[1]);
            }
          })
          .catch(e => {
            console.log("Final Error opening pdf document");
          });
      });
  };
  onchangeUrl = e => {
    this.setState({ new_url: e.target.value });
  };

  onSetSidebarOpen = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  onClickModalOpen = () => {
    console.log("on click modal open was clicked");
    this.setState({ PdfzIndex: "zIndexChanged" });
  };
  getTags = () => {
    let ar = [];
    if (this.props.tags && this.props.tags !== undefined) {
      Object.keys(this.props.tags).map(item => {
        if (item !== "hashkey") {
          ar.push({ key: item, value: this.props.tags[item] });
        }
      });
    }
    return ar;
  };
  render() {
    const fab = {
      position: "fixed",
      bottom: 20,
      right: 20,
      zIndex: 7,
      backgroundColor: "#3197ff"
    };

    const fab_demo = {
      position: "fixed",
      bottom: 20,
      left: 20,
      zIndex: 7,
      backgroundColor: "#3197ff"
    };

    const { highlights } = this.state;
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999"
      }
    };
    const framed = {
      width: 1100
    };

    const isdefault = this.state.default_link;
    console.log("props in annotate card", this.props);
    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Header toggleSidebar={() => this.onSetSidebarOpen()} />
        {this.state.sidebarOpen && (
          <MainSidbar
            sidebarOpen={this.state.sidebarOpen}
            toggleSidebar={() => this.onSetSidebarOpen()}
            onClickModalOpen={() => this.onClickModalOpen()}
            closeModal={() => this.closeModal()}
          />
        )}
        {/*<SemanticModal/>*/}
        <AnnotateSidebar
          highlights={highlights}
          onClickReply={this.changeReply}
          isReply={this.state.isReply}
          url={this.state.url}
          resetHighlights={this.resetHighlights}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Add New Board"
        >
          <button className="close" onClick={this.closeModal.bind(this)}>
            &times;
          </button>
          <AddNewPdfCore callbackFromParent={this.myCallback} />
        </Modal>
        <br />
        <Button style={fab} onClick={this.openModal.bind(this)} variant="fab">
          <a className="text-white">+</a>
        </Button>
        {isdefault ? (
          <div
            className={this.state.PdfzIndex}
            style={{
              height: "100vh",
              width: "75vw",
              overflowY: "scroll",
              position: "relative"
            }}
          >
            {this.props.tags && this.props.tags !== undefined && (
              <SemanticModal
                tags={this.getTags()}
                hashkey={this.props.tags.hashkey}
                username={this.props.cookies.get("username")}
              />
            )}
            <PdfLoader url={this.state.new_url} beforeLoad={<Spinner />}>
              {pdfDocument => (
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={event => event.altKey}
                  onScrollChange={resetHash}
                  scrollRef={scrollTo => {
                    this.scrollViewerTo = scrollTo;

                    this.scrollToHighlightFromHash();
                  }}
                  onSelectionFinished={(
                    position,
                    content,
                    hideTipAndSelection,
                    transformSelection
                  ) => (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={comment => {
                        this.addHighlight({ content, position, comment });

                        hideTipAndSelection();
                      }}
                    />
                  )}
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                  ) => {
                    const isTextHighlight = !Boolean(
                      highlight.content && highlight.content.image
                    );

                    const component = isTextHighlight ? (
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                      />
                    ) : (
                      <AreaHighlight
                        highlight={highlight}
                        onChange={boundingRect => {
                          this.updateHighlight(
                            highlight.id,
                            { boundingRect: viewportToScaled(boundingRect) },
                            { image: screenshot(boundingRect) }
                          );
                        }}
                      />
                    );

                    return (
                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={popupContent =>
                          setTip(highlight, highlight => popupContent)
                        }
                        onMouseOut={hideTip}
                        key={index}
                        children={component}
                      />
                    );
                  }}
                  highlights={highlights}
                />
              )}
            </PdfLoader>
          </div>
        ) : (
          <iframe style={framed} id="myiframe" src="about:blank" />
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    testHighlights: state.testHighlights,
    pdfURL: state.pdfURL,
    tags: state.tags,
    cookies: state.cookies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveURL: pdfURL => {
      dispatch(savePdfURL(pdfURL));
    },
    saveTags: tags => {
      dispatch(saveTags(tags));
    },
    onAddResource: url => {
      dispatch(addDemoCard(url));
    },
    clearAllVideoResource: payload => {
      dispatch(clearAllVideoResource(payload));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdfAnnotator);
