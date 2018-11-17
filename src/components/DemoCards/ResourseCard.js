import React, { Component } from "react";
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

class ResourceCard extends Component {
  constructor(props) {
    super(props);
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
  onClickPlus = event => {
    this.setState({
      count: this.state.count + 1
    });
  };
  onClickMinus = event => {
    this.setState({
      count: this.state.count - 1
    });
  };

  componentDidMount() {
    this.parseUrl(this.state.url);
  }

  render() {
    const card = {
      width: 390,
      minHeight: 55,
      maxHeight: 500,
    };
    const media = {
      height: 0,
      paddingTop: "56.25%" // 16:9
    };

    const loader = {
      margin: 25
    };

    let finalImageURL = this.state.imgURL;

    if (finalImageURL == null) {
      finalImageURL = NoImagePreview;
    }

    let pin = null;
    if (this.state.PinActive) {
      pin = (
        <div>
          <Pin click={this.togglePin} />
        </div>
      );
    } else {
      pin = (
        <div>
          <UnPin click={this.togglePin} />
        </div>
      );
    }
    let Outh = null;

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
              <CardContent>
                <a href={this.state.url} target="_blank">
                  <Typography gutterBottom variant="headline" component="h5">
                    {this.state.title}
                  </Typography>
                </a>
                <label className="text-black-50 small font-weight-bold">
                  {this.props.value.name}
                  {/* {this.state.previewLinkData.domain} */}
                </label>
                <Typography component="p">{this.state.disc}</Typography>
              </CardContent>
              {/*icons from: https://fontawesome.com/icons*/}
              <CardActions>
                <IconButton
                  aria-label="Add to favorites"
                  onClick={() => this.props.onClickPlus(this.props.index)}
                >
                  <i className="fas fa-angle-double-up text-dark" />
                </IconButton>
                <label className="text-black-50 small font-weight-bold">
                  {this.props.value.count}
                </label>
                <IconButton
                  aria-label="Add to favorites"
                  onClick={() => this.props.onClickMinus(this.props.index)}
                >
                  <i className="fas fa-angle-double-down text-black-50" />
                </IconButton>
                {this.props.value.pinLocation ? (
                  <Pin click={() => this.props.onClickPin(this.props.index)} />
                ) : (
                  <UnPin
                    click={() => this.props.onClickPin(this.props.index)}
                  />
                )}
              </CardActions>
            </Card>
          </div>
        ) : (
          <div>
            <Card style={card}>
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

export default ResourceCard;
