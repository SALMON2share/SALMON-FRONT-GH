import React from "react";
import type { T_Highlight } from "/Users/farbodaprin/Desktop/pdfanoo29/node_modules/react-pdf-highlighter";
type T_ManuscriptHighlight = T_Highlight;
//import PropTypes from "prop-types";

type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void
};

const updateHash = highlight => {
  window.location.hash = `highlight-${highlight.id}`;
};

const AnnotateSidebar =({ highlights, resetHighlights }: Props) => {

  return (
    <div className="sidebar" style={{ width: "30vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <p style={{ fontSize: "0.6rem" }}>
        </p>
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>
      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <div>
                  </div>
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <a href="##" onClick={resetHighlights}>
            Reset highlights
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default AnnotateSidebar;
