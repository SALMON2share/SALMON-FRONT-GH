import React, {Component} from "react";

import URLSearchParams from "url-search-params";
import type {T_Highlight, T_NewHighlight} from "react-pdf-highlighter";
import {AreaHighlight, Highlight, PdfHighlighter, PdfLoader, Popup, Tip} from "react-pdf-highlighter";

import testHighlights from "./AnnotateSidebar/test-highlights.js";
import Spinner from "../spinner/Spinner";
import Button from "@material-ui/core/es/Button/Button";
import Modal from 'react-modal';
import "./index.css";
import {createNewBoardData} from "../../utils/Connection";
import axios from 'axios';
import Header from "../Header/Header";
import AnnotateSidebar from "./AnnotateSidebar/AnnotateSidebar";
import AddNewPdfCore from "./AddNewPDFcore/AddNewPdfCore";

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
        PdfzIndex: 'zIndexDefault',
        url: DEFAULT_URL,
        default_link: true,
        new_url: DEFAULT_URL
    };

    state: State;

    openModal = () => {
        this.setState({
            modalIsOpen: true,
            PdfzIndex: 'zIndexChanged'
        });
    }

    afterOpenModal =  ()  => {
        // references are now sync'd and can be accessed.
    }

    closeModal =  ()  => {
        this.setState({
            modalIsOpen: false,
            PdfzIndex: 'zIndexDefault'
        });
    }

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

    myCallback = (dataFromChild) => {
        createNewBoardData(dataFromChild)
            .then((result) => {
                console.log(dataFromChild);
                let url_link = dataFromChild.pdflink;
                if (result.status === 200) {
                    let boardTagCode = result.data.boardTagCode;
                    this.setState({
                        boardLink: boardTagCode
                    });
                }
                else {
                    // console.log("status3: " + result);
                    this.setState({
                        modalIsOpen: false,
                        PdfzIndex: 'zIndexDefault',
                        default_link: false
                    });
                    this.handleMe(url_link);
                }
            })
            .catch(error => {
                console.log("status4: " + error);
            });
    }


    handleMe = (url_link) => {
        axios({
            method: 'get',
            url: url_link
        }).then(res => {
            this.setState({
                default_link: true,
                new_url: url_link
            })
        }).catch(error => {
            axios({
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/' + url_link,
                headers: {'Origin': url_link}
            }).then(res => {
                if (/pdf/.test(url_link)) {
                    var blob = new Blob([res.data], {type: "application/pdf"});
                    var blob_url = URL.createObjectURL(blob);
                    var iframeDoc = document.querySelector('#myiframe').src = blob_url;
                    var new_url = blob_url.split('blob:');
                    console.log(new_url)
                    this.setState({
                        url: new_url[1],
                        default_link: false
                    })
                } else {
                    var blob = new Blob([res.data], {type: "text/html"});
                    var blob_url = URL.createObjectURL(blob);
                    var iframeDoc = document.querySelector('#myiframe').src = blob_url;
                    var new_url = blob_url.split('blob:');
                    console.log(new_url)
                    this.setState({
                        url: new_url[1],
                        default_link: false
                    })
                }
            }).catch(error => {
                console.log(error, 'YOu have an error')
            })
        });
    }

    render() {
        const fab = {
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 7,
            backgroundColor: '#3197ff',
        };

        const fab_demo = {
            position: 'fixed',
            bottom: 20,
            left: 20,
            zIndex: 7,
            backgroundColor: '#3197ff',
        }

        const {highlights} = this.state;
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '9999'
            }
        };
        const framed = {
            width: 1100
        }

        const isdefault = this.state.default_link;

        return (
            <div className="App" style={{ display: "flex", height: "100vh" }}>
                <Header/>
                <AnnotateSidebar
                    highlights={highlights}
                    resetHighlights={this.resetHighlights}
                />
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)} onRequestClose={this.closeModal.bind(this)} style={customStyles} contentLabel="Add New Board">
                    <button className="close" onClick={this.closeModal.bind(this)}>&times;</button>
                    <AddNewPdfCore callbackFromParent={this.myCallback}/>
                </Modal>


                <Button style={fab_demo} variant="fab" onClick={this.handleMe}>GetPDF</Button>
                <br/>
                <Button style={fab} onClick={this.openModal.bind(this)} variant="fab" >
                    <a className="text-white">
                        +
                    </a>
                </Button>
                {isdefault ? (<div className={this.state.PdfzIndex}
                                   style={{
                                       height: "100vh",
                                       width: "75vw",
                                       overflowY: "scroll",
                                       position: "relative",
                                   }}
                    >
                        <PdfLoader url={this.state.new_url} beforeLoad={<Spinner/>}>
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
                                                this.addHighlight({content, position, comment});

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
                                                        {boundingRect: viewportToScaled(boundingRect)},
                                                        {image: screenshot(boundingRect)}
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

                    </div>) :
                    (<iframe style={framed} id="myiframe" src="about:blank"></iframe>)}
            </div>
        );
    }
}

export default PdfAnnotator;
