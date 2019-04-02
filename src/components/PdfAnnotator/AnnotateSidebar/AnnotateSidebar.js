import React from "react";
import type, { T_Highlight } from "react-pdf-highlighter";
import Button from "@material-ui/core/Button";
import AnnotateCard from "../AnnotateCard";
type T_ManuscriptHighlight = T_Highlight;
//import PropTypes from "prop-types";

type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void
};

const updateHash = highlight => {
  window.location.hash = `highlight-${highlight.id}`;
};

const   AnnotateSidebar = props => {
  const { highlights, resetHighlights } = props;
  return (
    <div className="sidebar" style={{ width: "30vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <p style={{ fontSize: "0.6rem" }} />
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and drag.
          </small>
        </p>
      </div>
      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <AnnotateCard
            updateHash={() => updateHash(highlight)}
            highlight={highlight}
            onClickReply={props.onClickReply}
            isReply={props.isReply}
            username={props.username}
            onDemoCardChange={props.onDemoCardChange}
          />
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          {/*<a href="##" onClick={resetHighlights}>*/}
            {/*Reset highlights*/}
          {/*</a>*/}
        </div>
      ) : null}
    </div>
  );
};

export default AnnotateSidebar;
