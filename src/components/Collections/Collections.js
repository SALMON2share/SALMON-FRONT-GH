import React from "react";
import { IndexLink, Link } from "react-router";
// import MainSidbar from "../MainSidbar/MainSidbar";
// import SideNav2 from "../MainSidbar/SideNav";
import Header from "../Header/Header";
import CollectionList from "./CollectionList";
import { getCollections } from "../../utils/Connection";
import { saveCollections } from "../../actions";
import "./index.css";
import MainSidbar from "../MainSidbar/MainSidbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import ScrollbarSearch from "./Search Scrollbar/ScrollbarSearch";
import { connect } from "react-redux";

class PDFCollections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  componentDidMount() {
    getCollections()
      .then(result => {
        console.log("result for collection is" + result);
        this.props.saveCollections(result.data);
      })
      .catch(error => {
        console.log("Error in getting collection: " + error);
      });
  }

  makeCollection(collections) {
    let collectionArray = [];
    let collectionSet = new Set();
    if (
      collections !== null &&
      collections !== undefined &&
      collections.length > 0
    ) {
      if (this.state.searchText.trim() !== "") {
        collections = collections.filter(collection => {
          if (collection.metadataCollection !== undefined)
            return (
              collection.metadataCollection.title
                .toLowerCase()
                .match(this.state.searchText.toLowerCase()) !== null
            );
          else return true;
        });
      }
      collections.map(collection => {
        if (collectionSet.has(collection.metadataCollection.id)) {
          let parentCollectionIndex = collectionArray.findIndex(
            row => row.id === collection.metadataCollection.id
          );
          if (parentCollectionIndex !== -1) {
            collectionArray[parentCollectionIndex].childCollection.push(
              collection
            );
          }
        } else {
          let obj = {};
          obj.id = collection.metadataCollection.id;
          obj.semanticTags = collection.metadataCollection.semanticTags;
          obj.title = collection.metadataCollection.title;
          obj.pdfURL = collection.metadataCollection.pdfCore;
          obj.childCollection = [];
          obj.childCollection.push(collection);
          collectionSet.add(collection.metadataCollection.id);
          collectionArray.push(obj);
        }
      });
    }
    return collectionArray;
  }
  sortCollections(collections) {
    return collections.sort((a, b) => b.percentage - a.percentage);
  }
  makeCollectionTitle = () => {
    let ar = [];
    if (
      this.props.collections !== null &&
      this.props.collections !== undefined
    ) {
      ar = this.makeCollection(this.props.collections).map(item => {
        let obj = {};
        obj.name = item.title;
        return obj;
      });
    }

    return ar;
  };
  render() {
    const { props } = this;
    const styles = {
      CollectionList: {
        display: "inline-block"
      },
      absolute: {
        position: "absolute"
        // textAlign: "center",
        // marginLeft: "-87px",
        // margin: "-3% ",
      },
      progressCircle: {
        marginTop: 300
      }
    };
    console.log("props are", props.collections);
    return (
      <div>
        <Header />
        <h2 className="TesxtStyle"> Collection's </h2>
        <p>{props.children}</p>
        {/*<MainSidbar/>*/}

        <p className="TesxtStyle">
          {/*<input type="text" onChange={props.changed}  style={styles.absolute}/>*/}
          <ScrollbarSearch
            style={styles.absolute}
            updateSearch={value => this.setState({ searchText: value })}
            collectionTitle={this.makeCollectionTitle()}
          />
        </p>

        {this.props.collections ? (
          this.makeCollection(props.collections).map((collection, index) => {
            return (
              <span style={styles.CollectionList} key={index}>
                <CollectionList
                  collection={collection}
                  history={this.props.history}
                />
              </span>
            );
          })
        ) : (
          <div style={styles.progressCircle}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    collections: state.collections
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveCollections: payload => {
      dispatch(saveCollections(payload));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PDFCollections);
