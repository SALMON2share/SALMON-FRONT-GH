import React, { Component } from "react";

import URLSearchParams from "url-search-params";
import { PdfLoader, PdfHighlighter, Tip, Highlight, Popup, AreaHighlight } from "react-pdf-highlighter";

import testHighlights from "../../test-highlights.js";
import Spinner from "../spinner/Spinner";
import AnnotateSidebar from "../PdfAnnotator/AnnotateSidebar/AnnotateSidebar";
import Button from "@material-ui/core/es/Button/Button";
import $ from 'jquery';
import Modal from 'react-modal';
import NewBoard from '../home/NewBoard.js';

import type { T_Highlight, T_NewHighlight } from "react-pdf-highlighter";
import "./index.css";
import Header from "../Header/Header";
//import MainSidbar from "../MainSidbar/MainSidbar";

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

Modal.setAppElement('#root  ');

class PdfAnnotator extends Component<Props, State> {

    state = {
        highlights: testHighlights[url] ? [...testHighlights[url]] : [],
        modalIsOpen: false,
        PdfzIndex: 'zIndexDefault'
    };

    state: State;

    openModal = () => {
        this.setState({
            modalIsOpen: true,
            PdfzIndex: 'zIndexChanged'
        });
      };

    afterOpenModal =  ()  => {
    // references are now sync'd and can be accessed.
    };

    closeModal =  ()  => {
        this.setState({
            modalIsOpen: false,
            PdfzIndex: 'zIndexDefault'
        });
    };

    resetHighlights = () => {
        this.setState({
            highlights: []
        });
    };

    scrollViewerTo = (highylight: any) => {};

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

    getHighlightById(id: string) {
        const { highlights } = this.state;

        return highlights.find(highlight => highlight.id === id);
    }

    addHighlight(highlight: T_NewHighlight) {
        const { highlights } = this.state;

        console.log("Saving highlight", highlight);

        this.setState({
            highlights: [{ ...highlight, id: getNextId() }, ...highlights]
        });
    }


    updateHighlight(highlightId: string, position: Object, content: Object) {
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

    showFile(blob){
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], {type: "application/pdf"});

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download="file.pdf";
        link.click();
        setTimeout(function(){
          window.URL.revokeObjectURL(data),100});
      }

    getData = () => {
        $.getJSON('http://anyorigin.com/go?url=http%3A//africau.edu/images/default/sample.pdf&callback=?', function(data){
            console.log(data.contents);
        });
        // axios({
        //     url: 'http://africau.edu/images/default/sample.pdf',
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     },
        //     responseType: 'text', // important
        //   }).then((response) => {
        //     console.log(response);
        //   });

        // fetch('http://africau.edu/images/default/sample.pdf',
        // {neha kakkar
        //     mode: 'cors',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Headers': 'X-Custom-Header'
        //     }
        // }
        // )
        //     .then(res => res.json())
        //     .then(json => {
        //       console.log(json);
        //     });
    };
    render() {
      const fab = {
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 7,
        backgroundColor: '#3197ff',
      };

      const { highlights } = this.state;
      const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          zIndex: '9999'
        }
      };

        return (
            <div className="App" style={{ display: "flex", height: "100vh" }}>
                <Header/>
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)} onRequestClose={this.closeModal.bind(this)} style={customStyles} contentLabel="Add New Board">
                    <button className="close" onClick={this.closeModal.bind(this)}>&times;</button>
                    <NewBoard/>
                </Modal>
                <AnnotateSidebar
                    highlights={highlights}
                    resetHighlights={this.resetHighlights}
                />
                {/* <Button onClick={this.getData} >Fetch API</Button> */}
                 {/* <LinkContainer to="/" style={fab}>
                  <Button variant="fab" >
                    <a className="text-white">
                      +
                    </a>
                  </Button>
                </LinkContainer> */}

                {/*<br/>*/}

                <Button style={fab} onClick={this.openModal.bind(this)} variant="fab" >
                    <a className="text-white">
                      +
                    </a>
                  </Button>

                <div className={this.state.PdfzIndex}
                    style={{
                        height: "100vh",
                        width: "75vw",
                        overflowY: "scroll",
                        position: "relative",
                    }}
                >

                    <PdfLoader url={url} beforeLoad={<Spinner />}  >
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
            </div>
        );
    }
}

export default PdfAnnotator;
