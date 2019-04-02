import React from "react";
import "./index.css";
import SemanticTags from "../Tags/SemanticTags";
import CollectionSemanticTags from "./TagsForCollections";
import { savePdfURL, saveSelectedCollection, saveTags } from "../../actions";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class CollectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      loadingState: false
    };
  }

  componentDidMount() {
    if (this.refs.iScroll !== null && this.refs.iScroll !== undefined) {
      this.refs.iScroll.addEventListener("scroll", () => {
        if (
          this.refs.iScroll !== null &&
          this.refs.iScroll !== undefined &&
          this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
            this.refs.iScroll.scrollHeight
        ) {
          this.loadMoreItems();
        }
      });
    }
  }

  displayItems(collection = null) {
    if (
      collection.childCollection === null ||
      collection.childCollection === undefined ||
      collection.childCollection.length === 0
    )
      return null;
    var items = [];
    const { classes } = this.props;
    collection.childCollection
      .sort((a, b) => b.percentage - a.percentage)
      .map((item, index) => {
        items.push(
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => {
              this.props.saveTags(null);
              this.props.saveURL(item.pdfCore);
              this.props.history.push("/Annotator");
              this.props.saveSelectedCollection(collection);
            }}
          >
            {item.title}
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <Icon className={classes.rightIcon}>redo</Icon>
          </Button>
        );
      });
    return items;
  }

  getTags = () => {
    let tags = [];
    if (
      this.props.collection.semanticTags !== null &&
      this.props.collection.semanticTags !== undefined
    )
      tags = this.props.collection.semanticTags.trim().split(",");
    return tags;
  };
  loadMoreItems() {
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({ items: this.state.items + 10, loadingState: false });
    }, 100);
  }

  render() {
    const { collection, classes } = this.props;

    return (
      <div
        className="BackGorundColor"
        style={{ margin: "25px", width: "340px" }}
      >
        {/*style={{ overflow: "auto" , width: "340px"}}*/}
        <div className="Title2Style">
          <p style={{ margin: "5px" }}>{collection.title}</p>
        </div>
        <div
          className="ItemStyle"
          ref="iScroll"
          style={{ height: "200px", overflow: "auto", width: "340px" }}
        >
          <ul>{this.displayItems(collection)}</ul>
          {this.state.loadingState ? (
            <p className="loading"> loading More Items..</p>
          ) : (
            ""
          )}
        </div>
        <div className="TagListsstyleHeader">
          <p style={{ margin: "1px" }}>Collection tags</p>
          <CollectionSemanticTags tags={this.getTags()} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    saveURL: pdfURL => {
      dispatch(savePdfURL(pdfURL));
    },
    saveSelectedCollection: collection => {
      dispatch(saveSelectedCollection(collection));
    },
    saveTags: payload => {
      dispatch(saveTags(payload));
    }
  };
}
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CollectionList)
);
