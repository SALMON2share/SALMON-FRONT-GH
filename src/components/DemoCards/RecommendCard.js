import "./ResourceCard.css";
import React, { Component } from "react";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import { parseUrlData } from "../../utils/Connection";
import NoImagePreview from "../images/no-preview.jpg";
import { GridLoader } from "react-spinners";
import "./ResourceCard.css";

export default class RecommendCard extends Component {
  constructor(props) {
    super(props);
    console.log(parseUrlData(props));
    this.state = {
      previewLinkData: "",
      isUrlDataFetched: true,
      title: "",
      disc: "",
      imgURL: "",
      url: props.url,
      pinActive: true,
      count: 0,
      userIdentification: true,
      modalIsOpen: false
    };
  }

  parseUrl(url) {
    parseUrlData(url).then(response => {
      console.log("return from connection function: >>> " + response);
      if (response.status === 200) {
        if (response.data.hasOwnProperty("title")) {
          this.setState({
            previewLinkData: response.data,
            title: response.data.title,
            disc: response.data.excerpt,
            imgURL: response.data.lead_image_url,
            url: response.data.url,
            isUrlDataFetched: true
          });
        } else {
          this.setState({
            previewLinkData: " -- ",
            title: "no title",
            disc: "no description",
            url: "error in url",
            isUrlDataFetched: true
          });
        }
      } else {
        this.setState({
          previewLinkData: " -- ",
          title: "no title",
          disc: "no description",
          url: "error in url",
          isUrlDataFetched: true
        });
      }
    });
  }

  componentDidMount() {
    this.parseUrl(this.props.url);
  }

  shouldComponentUpdate(props, state) {
    if (props && props.url !== this.props.url) {
      this.setState({
        previewLinkData: "",
        isUrlDataFetched: true,
        title: "",
        disc: "",
        imgURL: "",
        url: props.url
      });
      this.parseUrl(props.url);
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

    let finalImageURL = this.state.imgURL;

    if (finalImageURL == null) {
      finalImageURL = NoImagePreview;
    }
    console.log("info==>", this.props);
    return (
      <div className="m-2 col-centered">
        {this.state.isUrlDataFetched ? (
          <div
            style={{
              marginTop: 30
            }}
          >
            <Card style={card}>
              {finalImageURL !== "" && (
                <img
                  style={{ height: 100, width: "100%" }}
                  src={finalImageURL}
                  onClick={() =>
                    this.props.setYoutubeUrl(this.state.previewLinkData.url)
                  }
                />
              )}
              <CardContent className={"Disc"}>
                <a
                  href={this.state.url}
                  target="_blank"
                  className={"cardContent"}
                >
                  <div class="text ellipsis">
                    <span class="text-concat">{this.state.title}</span>
                  </div>
                </a>
                <div class="disc-text ellipsis">
                  <span class="disc-text-concat">{this.state.disc}</span>
                </div>
              </CardContent>
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
