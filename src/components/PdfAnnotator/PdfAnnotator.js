import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import URLSearchParams from "url-search-params";
import MediaQuery from "react-responsive";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "react-modal";
import "./index.css";
import {
  createNewBoardData,
  getSemanticTags,
  getAnnotation,
  setAnnotation,
  updateSemanticTags
} from "../../utils/Connection";
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
  clearAllVideoResource,
  saveHighlights,
  saveTagApiType,
  addTestHighlightUrl,
  saveSelectedCollection
} from "../../actions";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
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

const DEFAULT_URL = "https://arxiv.org/pdf/cs/0408001.pdf";

const searchParams = new URLSearchParams(window.location.search);
const url = searchParams.get("url") || DEFAULT_URL;
const YT_API = "AIzaSyD6eehCtd_pX7rIgQLJV0S1I-jMoe-wOIw";
Modal.setAppElement("#root  ");

class PdfAnnotator extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      highlights:
        props.testHighlights && props.testHighlights[props.pdfURL]
          ? [...props.testHighlights[props.pdfURL]]
          : [],
      modalIsOpen: false,
      PdfzIndex: "zIndexDefault",
      url: props.pdfURL,
      default_link: true,
      new_url: props.pdfURL,
      sidebarOpen: false,
      isReply: false,
      isOkPressed: false,
      isLoadingTags: true,
      tagsLoadedMessage: "",
      isOpenTag: true
    };
    this.changeReply = this.changeReply.bind(this);
    this.getTags = this.getTags.bind(this);
    this.searchYoutube = this.searchYoutube.bind(this);
    this.addTagsToCoreLink = this.addTagsToCoreLink.bind(this);
    this.toggleIsOk = this.toggleIsOk.bind(this);
    this.setIsLoadingTagsStatus = this.setIsLoadingTagsStatus.bind(this);
    this.setNewHighlights = this.setNewHighlights.bind(this);
    this.getAllHighlights = this.getAllHighlights.bind(this);
    this.handleResponseFromTags = this.handleResponseFromTags.bind(this);
    this.onTagUpdate = this.onTagUpdate.bind(this);
    this.onDemoCardChange = this.onDemoCardChange.bind(this);
  }

  toggleIsOk = () => {
    this.setState({ isOkPressed: !this.state.isOkPressed });
  };
  setIsLoadingTagsStatus = (status, statusMessage) => {
    ////console.log("setting the tags status");
    this.setState({
      isLoadingTags: status,
      tagsLoadedMessage: statusMessage
    });
  };
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
    //console.log("close the modal");
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

  handleTags = data => {
    let result = {};
    Object.keys(data).map(key => {
      if (key !== "date") {
        if (data[key].trim() !== "") result[key] = data[key];
      }
    });
    return result;
  };
  componentWillMount() {
    //console.log("cookies are", this.props.cookies);
    if (this.props.tags !== null) {
      this.setState({ isLoadingTags: false });
    }
    if (this.props.cookies.get("username") === undefined) {
      this.props.history.push("/Login");
    } else {
      this.props.addTestHighlightUrl(this.props.pdfURL);
      //this.props.saveSelectedCollection(null);
      getSemanticTags(this.props.pdfURL)
        .then(result => {
          //console.log("result for tag is" + JSON.stringify(result));
          this.handleResponseFromTags(result);
        })
        .catch(error => {
          //console.log("status4: " + error);
          this.setIsLoadingTagsStatus(false, "unable To Load Tags");
        });
      this.getAllHighlights(this.props.pdfURL, true);
    }
  }

  /**
   * function to hadnle response coming from tags
   */

  handleResponseFromTags(result) {
    if (result) {
      switch (result.status) {
        case 200: //case for new hashkey
          let data = this.handleTags(result.data);
          data["pdfCoreLink"] = this.props.pdfURL;
          data["hashKey"] = data["hashkey"];
          data["username"] = this.props.cookies.get("username");
          //updateSemanticTags(data, true);
          this.props.saveTags(data);
          this.props.saveTagApiType(true);
          this.setIsLoadingTagsStatus(false, "Tags Loaded Succesfully");
          this.setIsLoadingTagsStatus(false, "new pdflink is added");
          break;
        case 201: //case if pdfcore exist
          data = this.handleTags(result.data);
          this.props.saveTags(data);
          this.props.saveTagApiType(false);
          this.setIsLoadingTagsStatus(false, "Tags Loaded Succesfully");
          //alert("this pdf is stored with hashkey of "+result.data.hashkey+" and the user "+result.data.user.trim()+" in date "+result.data.date.trim());
          break;
        case 302: //case for existing hashkey
          data = this.handleTags(result.data);
          this.props.saveTags(data);
          this.props.saveTagApiType(false);
          this.setIsLoadingTagsStatus(false, "Tags Loaded Succesfully");
          alert(
            "this pdf is stored with hashkey of " +
              result.data.hashkey +
              " and the user " +
              result.data.user.trim() +
              " in date " +
              result.data.date.trim()
          );
          break;
        default:
          //case if no tags are found
          this.setIsLoadingTagsStatus(false, "unable To Load Tags");
          this.props.saveTags([]);
          this.props.saveTagApiType(true);
      }
    } else {
      this.setIsLoadingTagsStatus(false, "unable To Load Tags");
      this.props.saveTags([]);
      this.props.saveTagApiType(true);
    }
  }

  /**
   * on updating tags show a snackbar
   */

  onTagUpdate = isUpdated => {
    if (isUpdated) {
      this.setIsLoadingTagsStatus(false, "Tags updated successfully");
    } else {
      this.setIsLoadingTagsStatus(false, "unable to update tags");
    }
  };
  /**
   * fetch all highlights
   */
  getAllHighlights(pdfCore, addToStore = false) {
    getAnnotation(pdfCore)
      .then(result => {
        if (
          addToStore &&
          result &&
          result.data &&
          result.data.pdfCore === pdfCore
        ) {
          let listOfHighlights = JSON.parse(result.data.annotate);
          this.addHighlightAtMount(listOfHighlights);
        }
        this.forceUpdate();
      })
      .catch(error => {
        //console.log("error in annotation " + error);
      });
  }

  /**
   * set new Highlights
   */
  setNewHighlights(payload) {
    //console.log("payload is", payload);
    setAnnotation(payload)
      .then(result => {
        this.getAllHighlights(payload.pdfCore);
      })
      .catch(error => {});
  }
  //when component recev tags, this lifecycle method will fetch the youtube videos
  shouldComponentUpdate(props, state) {
    if (props.tags !== null && props.tags !== this.props.tags) {
      if (props.tags !== undefined) {
        if (props.tags.tag3 !== undefined) this.searchYoutube(props.tags.tag3);
        else this.searchYoutube(props.tags.tag1);
      }
    }
    if (
      props.testHighlights !== null &&
      props.testHighlights !== this.props.testHighlights
    ) {
      this.setState({ highlights: [...props.testHighlights[props.pdfURL]] });
      //whenever the highlights changed locally update it also on the server
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

    //console.log("Saving highlight", highlight);
    let temp = [{ ...highlight, id: getNextId(), reply: [] }, ...highlights];
    this.setState({
      highlights: temp
    });
    this.setNewHighlights({
      annotation: temp,
      pdfCore: this.props.pdfURL
    });
    this.props.saveHighlights({
      pdfURL: this.props.pdfURL,
      highlights: temp
    });
  }

  addHighlightAtMount(highlights) {
    let temp = this.state.highlights.slice();
    temp = temp.concat(highlights);
    //console.log("temp is", temp);
    this.setState({
      highlights: temp
    });
    this.props.saveHighlights({
      pdfURL: this.props.pdfURL,
      highlights: temp
    });
  }

  updateHighlight(highlightId, position, content) {
    //console.log("Updating highlight", highlightId, position, content);

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

  myCallback = pdfURL => {
    let url_link = pdfURL;
    this.props.saveURL(pdfURL);
    this.props.addTestHighlightUrl(pdfURL);
    this.props.saveSelectedCollection(null);
    this.setState({ isOpenTag: true });
    this.props.clearAllVideoResource(null);
    this.getAllHighlights(pdfURL, true);
    this.setState({
      modalIsOpen: false,
      PdfzIndex: "zIndexDefault",
      default_link: false
    });
    this.handleMe(url_link);
  };

  addTagsToCoreLink = result => {
    this.handleResponseFromTags(result);
  };

  getRecommendedQueryForYoutube = () => {
    let query = "";
    let max = 0;
    let min = 0;
    if (this.props.tags !== null && this.props.tags !== undefined) {
      Object.keys(this.props.tags).map(key => {
        if (key.match("^tag") !== null) {
          max++;
        }
      });
      let random = parseInt(Math.random() * (+max - +min) + +min);
      query = this.props.tags["tag" + random];
    }
    return query !== undefined ? query.trim() : "";
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
              //console.log("response is", res);
              if (res.headers["content-type"].match("^text/html")) {
                alert("this is unsafe pdf");
              } else {
                var blob_url = URL.createObjectURL(res.data);
                this.setState({ default_link: true, new_url: blob_url });
                this.props.saveURL(url_link);
              }
            } else {
              var blob = new Blob([res.data], { type: "text/html" });
              var blob_url = URL.createObjectURL(blob);
              var iframeDoc = (document.querySelector(
                "#myiframe"
              ).src = blob_url);
              var new_url = blob_url.split("blob:");
              //console.log(new_url);
              this.setState({ url: new_url[1], default_link: false });
              this.props.saveURL(url_link);
            }
          })
          .catch(e => {
            alert(
              "Sorry, we are unable to add this pdf, please try different pdf"
            );
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
    //console.log("on click modal open was clicked");
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

  onDemoCardChange = () => {
    //console.log("demo card has updated", this.state.highlights);
    this.setNewHighlights({
      annotation: this.state.highlights,
      pdfCore: this.props.pdfURL
    });
  };

  renderPdfLoader = highlights => {
    try {
      return (
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
                        {
                          boundingRect: viewportToScaled(boundingRect)
                        },
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
      );
    } catch (error) {
      console.log("error is", error);
    }
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
    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>
        <Header toggleSidebar={() => this.onSetSidebarOpen()} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.tagsLoadedMessage !== ""}
          autoHideDuration={6000}
          onClose={() => this.setState({ tagsLoadedMessage: "" })}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.tagsLoadedMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.setState({ tagsLoadedMessage: "" })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        {this.state.sidebarOpen && (
          <MainSidbar
            sidebarOpen={this.state.sidebarOpen}
            toggleSidebar={() => this.onSetSidebarOpen()}
            onClickModalOpen={() => this.onClickModalOpen()}
            closeModal={() => this.closeModal()}
            recommendedQuery={this.getRecommendedQueryForYoutube()}
          />
        )}
        {/*<SemanticModal/>*/}

        <MediaQuery minDeviceWidth={1224}>
          <AnnotateSidebar
            highlights={highlights}
            onClickReply={this.changeReply}
            isReply={this.state.isReply}
            url={this.props.pdfURL}
            resetHighlights={this.resetHighlights}
            username={this.props.cookies.get("username")}
            onDemoCardChange={this.onDemoCardChange}
          />
        </MediaQuery>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Add New Board"
        >
          <button className="close" onClick={this.closeModal.bind(this)}>
            &times;
          </button>
          <AddNewPdfCore
            callbackFromParent={this.myCallback}
            addTagsToCoreLink={this.addTagsToCoreLink}
            setIsLoadingTagsStatus={this.setIsLoadingTagsStatus}
          />
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
            {this.props.tags &&
              this.props.tags !== undefined &&
              this.state.isOpenTag &&
              (!this.state.isOkPressed ? (
                <SemanticModal
                  hashkey={this.props.tags.hashkey}
                  username={this.props.cookies.get("username")}
                  pdfCoreLink={this.state.new_url}
                  toggleIsOk={this.toggleIsOk}
                  onClose={() => this.setState({ isOpenTag: false })}
                  onTagUpdate={this.onTagUpdate}
                />
              ) : (
                <Button
                  style={{
                    marginTop: 100,
                    width: "100%"
                  }}
                >
                  <img
                    onClick={this.toggleIsOk}
                    src="../../../images/reload.png"
                    style={{
                      width: 30,
                      height: 30,
                      position: "absolute",
                      left: "20%"
                    }}
                    alt="reload tags"
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: "23%"
                    }}
                  >
                    Reload Tags
                  </span>
                </Button>
              ))}
            {this.state.isLoadingTags && (
              <div style={{ marginTop: 50 }}>
                <Button variant="contained" color="primary">
                  Loading Tags
                  <CircularProgress
                    size={24}
                    style={{
                      color: "#c13d4a",
                      marginLeft: 20
                    }}
                  />
                </Button>
              </div>
            )}
            {this.renderPdfLoader(highlights)}
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
    cookies: state.cookies,
    isInitial: state.isInitial,
    selectedCollection: state.selectedCollection
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
    },
    saveHighlights: payload => {
      dispatch(saveHighlights(payload));
    },
    saveTagApiType: payload => {
      dispatch(saveTagApiType(payload));
    },
    addTestHighlightUrl: payload => {
      dispatch(addTestHighlightUrl(payload));
    },
    saveSelectedCollection: payload => {
      dispatch(saveSelectedCollection(payload));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PdfAnnotator);
