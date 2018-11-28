import "./ResourceCard.css";
import React, {Component} from "react";
import Card from "@material-ui/core/es/Card/Card";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import { parseUrlData } from "../../utils/Connection";
import NoImagePreview from "../images/no-preview.jpg";
import { GridLoader } from "react-spinners";
import Pin from "../PIN/Pin";
import UnPin from "../PIN/UnPin";
import {
  onClickMinusDemoCard,
  onClickPlusDemoCard,
  onClickPin
} from "../../actions";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { list: state.listDemoCards };
};
const mapDispatchToProps = dispatch => {
  return {
    onClickPlus: index => {
      dispatch(onClickPlusDemoCard(index));
    },
    onClickMinus: index => {
      dispatch(onClickMinusDemoCard(index));
    },
    onClickPin: index => {
      dispatch(onClickPin(index));
    }
  };
};

class ResourceCard extends Component {
  constructor(props) {
    super(props);
    console.log(parseUrlData(props));
    this.state = {
      previewLinkData: "",
      isUrlDataFetched: true,
      title: "",
      disc: "",
      imgURL: "",
      url: props.value.url,
      pinActive: true,
      count: 0,
      userIdentification: true
    };
  }
    parseUrl(url) {
        parseUrlData(url).then((response) => {
            console.log("return from connection function: >>> " + response);
            if (response.status === 200) {
                if (response.data.hasOwnProperty('title')){

                    this.setState({
                        previewLinkData: response.data,
                        title: response.data.title,
                        disc: response.data.excerpt,
                        imgURL: response.data.lead_image_url,
                        url: response.data.url,
                        isUrlDataFetched: true,
                    });
                }
                else {
                    this.setState({
                        previewLinkData: " -- ",
                        title: "no title",
                        disc: "no description",
                        url: "error in url",
                        isUrlDataFetched: true,
                    });
                }
            }
            else {

                this.setState({
                    previewLinkData: " -- ",
                    title: "no title",
                    disc: "no description",
                    url: "error in url",
                    isUrlDataFetched: true,
                });
            }
        });
    }

  togglePin = () => {
    console.log("clicked on toggle");
    const pinActive1 = this.state.pinActive;
    this.setState({ pinActive: !pinActive1 });
  };

  componentDidMount() {
    this.parseUrl(this.props.value.url);
  }

  shouldComponentUpdate(props, state) {
    if (props.value && props.value !== this.props.value) {
      this.setState({
        previewLinkData: "",
        isUrlDataFetched: true,
        title: "",
        disc: "",
        imgURL: "",
        url: props.value.url
      });
      this.parseUrl(props.value.url);
    }
    return true;
  }
  render() {
    const card = {
        maxWidth: 330,
        marginBottom: 20,
        marginLeft: 20,
        marginTop: 8,
        title: {
            fontSize: 14
        },
        image :{

        },
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

    let finalImageURL = this.state.imgURL;

    if (finalImageURL == null) {
      finalImageURL = NoImagePreview;
    }
    return (
      <div className="m-2 col-centered">
        {this.state.isUrlDataFetched ? (
          <div>
              <Card style={card}>
              <CardMedia
                style={media}
                image={finalImageURL}
                title="Contemplative Reptile"
              />
                  <CardContent className={"Disc"}>
                      <a href={this.state.url} target="_blank" className={"cardContent"}>
                  <Typography gutterBottom variant="headline" component="h5">
                    {this.state.title}
                  </Typography>
                </a>
                <label className="text-black-50 small font-weight-bold">
                    {/*{this.props.value.url}*/}
                  {/* {this.state.previewLinkData.domain} */}
                </label>
                      <div className={"discText"}>
                          <Typography component="p">{this.state.disc}</Typography>
                      </div>
              </CardContent>
              {/*icons from: https://fontawesome.com/icons*/}
              <CardActions>
                <IconButton
                  aria-label="Add to favorites"
                  onClick={() => this.props.onClickPlus(this.props.location)}
                >
                  <i className="fas fa-angle-double-up text-dark" />
                </IconButton>
                <label className="text-black-50 small font-weight-bold">
                  {this.props.value.count}
                </label>
                <IconButton
                  aria-label="Add to favorites"
                  onClick={() => this.props.onClickMinus(this.props.location)}
                >
                  <i className="fas fa-angle-double-down text-black-50" />
                </IconButton>
                {this.props.value.pinLocation ? (
                  <Pin
                    click={() => this.props.onClickPin(this.props.location)}
                  />
                ) : (
                  <UnPin
                    click={() => this.props.onClickPin(this.props.location)}
                  />
                )}
              </CardActions>
            </Card>
          </div>
        ) : (
          <div>
              <Card className="Card">
              <div className="text-center" style={loader}>
                <GridLoader color={"#0098d3"} loading={true} />
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceCard);
