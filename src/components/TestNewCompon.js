import React from "react";
import {IndexLink, Link} from "react-router";
import PdfAnnotator from "../AnnotatorCore/components/PdfAnnotator";
// import Header from "./header/Header";
// import Button from "@material-ui/core/es/Button/Button";

// import PdfLoader from "../AnnotatorCore/components/PdfLoader";


export default class TestNewCompon extends React.Component {
    render() {

        return (
            <div>
                {/*<div className="App container">*/}

                    {/*<Header/>*/}

                    {/*<h1> Sosis test </h1>*/}

                        {/*<Button variant="fab" >*/}

                        {/*</Button>*/}
                    {/*<PdfAnnotator/>*/}
                  <PdfAnnotator pdfDocument={'https://arxiv.org/pdf/1708.08021.pdf'}/>
                        {/*/!*<PdfAnnotator />*!/*/}
                {/*</div>*/}
            </div>
        );
    }
}
