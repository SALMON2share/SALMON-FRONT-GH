import React from "react";
import { IndexLink, Link } from "react-router";
import PdfAnnotator from "./PdfAnnotator";

const PdfAnnotatorController = props => {
	return (
		<div>
			<PdfAnnotator history={props.history} />
		</div>
	);
};

export default PdfAnnotatorController;
