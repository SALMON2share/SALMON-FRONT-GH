import "./ResourceCard.css";
import React, { Component } from "react";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import {
  parseUrlData,
  setRelevantCollection,
  updateSemanticTags
} from "../../utils/Connection";
import NoImagePreview from "../images/no-preview.jpg";
import { GridLoader } from "react-spinners";
import { connect } from "react-redux";
import "./ResourceCard.css";
import RelevantSemanticTags from "./RelevantSemanticTags";
import CollectionSemanticTags from "../Collections/TagsForCollections";
import _ from "lodash";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
class RelevantCard extends Component {
  constructor(props) {
    super(props);
  }

  getTags = () => {
    try {
      let tags = [];
      let uniqueTags = Object.keys(this.props.mainTags).map(key => {
        if (
          key.match("^tag") !== null &&
          this.props.mainTags[key] !== undefined &&
          this.props.mainTags[key] !== null
        ) {
          let str = this.props.mainTags[key].trim().replace(/ /g, "");
          return str;
        }
      });
      console.log("unique tags are", uniqueTags);
      if (
        this.props.selectedCollection.semanticTags !== null &&
        this.props.selectedCollection.semanticTags !== undefined
      )
        tags = this.props.selectedCollection.semanticTags.trim().split(",");

      if (tags.length > 0) {
        tags = tags.filter(tag => uniqueTags.indexOf(tag) < 0);
      }
      console.log(
        "filter tags",
        tags.filter(tag => uniqueTags.indexOf(tag) < 0)
      );
      return tags;
    } catch (error) {
      return [];
    }
  };

  callInitialTags(relevantData) {
    try {
      let data = {};
      data.username = this.props.cookies.get("username");
      data.pdfCoreLink = this.props.pdfURL;
      data.pdfCore = this.props.pdfURL;
      data.relevantData = relevantData;
      let count = 1;
      // console.log("call updateSemantic with", relevant);
      Object.keys(this.props.mainTags).map(key => {
        if (key === "hashkey") {
          data["hashKey"] = this.props.mainTags[key];
        } else {
          if (key.match("^tag") !== null) {
            data["tag" + count] = this.props.mainTags[key];
            count++;
          } else data[key] = this.props.mainTags[key];
        }
      });
      updateSemanticTags(data, true)
        .then(result => {
          if (result.status === 200) {
            console.log("successfull", result);
          } else {
            console.log("successfull", result);
          }
        })
        .catch(error => {
          console.log("status4: " + error);
        });
    } catch (error) {
      console.log("error is", error);
    }
  }
  setRelevantCollection(payload) {
    //console.log("payload is", payload);
    setRelevantCollection(payload)
      .then(result => {
        console.log("result is", result);
        this.callInitialTags(result.data);
      })
      .catch(error => {});
  }

  getPdfCoreId = isRelevant => {
    let pdfCore = null;
    if (
      this.props.selectedCollection.childCollection !== null &&
      this.props.selectedCollection.childCollection !== undefined
    ) {
      pdfCore = this.props.selectedCollection.childCollection.filter(
        row => row.pdfCore === this.props.pdfURL
      );
    }
    console.log(pdfCore);
    if (pdfCore.length > 0) {
      this.setRelevantCollection({
        relevant: isRelevant,
        id: pdfCore[0].id
      });
    }
  };
  render() {
    const card = {
      maxWidth: 400,
      width: 400,
      marginBottom: 20,
      marginLeft: 20,
      marginTop: 8,
      title: {
        fontSize: 14
      },
      image: {},
      pos: {
        marginBottom: 124
      }
    };

    const media = {
      height: 0,
      paddingTop: "56.25%" // 16:9
    };

    const loader = {
      margin: 20
    };

    const { classes, selectedCollection } = this.props;
    return (
      <div className="m-2 col-centered">
        <div
          style={{
            marginTop: 30
          }}
        >
          {this.props.selectedCollection && (
            <Card style={card}>
              <span style={{ color: "#000", fontSize: 20 }}>
                {`Is this PDFCore related to the topic `}
                <b>{selectedCollection.title}</b>
              </span>
              <CardContent className={"Disc"}>
                <RelevantSemanticTags tags={this.getTags()} />
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                  onClick={() => this.getPdfCoreId(1)}
                >
                  {"Relevant"}
                </Button>
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                  onClick={() => this.getPdfCoreId(-1)}
                >
                  {"NonRelevant"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("tags in relevant card is", state);
  return {
    selectedCollection: state.selectedCollection,
    pdfURL: state.pdfURL,
    mainTags: state.tags,
    cookies: state.cookies
  };
}
export default connect(mapStateToProps)(withStyles(styles)(RelevantCard));
