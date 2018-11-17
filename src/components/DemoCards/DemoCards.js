import React, {Component} from "react";
import ResourceCard from "./ResourseCard.js";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import AddLink from "../addLink/AddLink";

class DemoCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      resource: [
        {
          url: "https://www.youtube.com/watch?v=Zc54gFhdpLA",
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0,
        },
        {
          url:
            "https://www.youtube.com/watch?v=TOsMcgIK95k&list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz",
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0,
          name: "second"
        },
        {
          url:
            "https://www.youtube.com/watch?v=taClnxU-nao&list=PLqmFiiNyAKRNPP-JPqZnMWRvIpQpCoAFd",
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0,
          name: "third"
        },
        {
          url: "https://www.youtube.com/watch?v=6ik0M-AWrn8",
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0,
          name: "forth"
        },
        {
          url: "https://www.youtube.com/watch?v=-5de3kJZ60w",
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0,
          name: "fifth"
        },
        {
          url: "https://www.youtube.com/watch?v=EmYVZuczJ6k",
          pinLocation: false,
          like: false,
          dislike: false,
          count: 0,
          name: "sixth"
        }
      ]
    };
    this.onClickMinus = this.onClickMinus.bind(this);
    this.onClickPlus = this.onClickPlus.bind(this);
    this.onClickPin = this.onClickPin.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * function to sort the resources
   */
  sortResource = temp => {
    let sorted = temp.filter(item => item.pinLocation === false);
    sorted.sort((a, b) => {
      return b.count - a.count;
    });
    // Merge stay items and sorted items
    var result = [];
    var sortedIndex = 0;

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].pinLocation !== true) {
        result.push(sorted[sortedIndex]);
        sortedIndex++;
      } else result.push(temp[i]);
    }
    return result;
  };

  /**
   * function to like cards
   */
  onClickPlus = index => {
    let temp = this.state.resource.slice();
    /**
     * to like only only once uncomment this line of code
     */
    // if (temp[index].like === false) {
    //   temp[index].count = temp[index].count + 1;
    // }
    temp[index].count = temp[index].count + 1; //comment this line of code to like only once
    temp[index].like = true;
    temp[index].dislike = false;
    let result = this.sortResource(temp);
    this.setState({
      resource: result
    });
  };

  /**
   * function to dislike cards
   */
  onClickMinus = index => {
    let temp = this.state.resource.slice();
    /**
     * to dislike only only once uncomment this line of code
     */
    // if (temp[index].dislike === false) {
    //   temp[index].count = temp[index].count - 1;
    // }
    temp[index].count = temp[index].count - 1; //comment this line of code to dislike only once
    temp[index].dislike = true;
    temp[index].like = false;
    let result = this.sortResource(temp);
    this.setState({
      resource: result
    });
  };

  onClickPin = index => {
    let temp = this.state.resource.slice();
    temp[index].pinLocation = !temp[index].pinLocation;
    let result = this.sortResource(temp);
    this.setState({
      resource: result
    });
  };
  render() {
    const fab = {
      position: "fixed",
      bottom: 20,
      right: 20
    };
    return (
      <div className="App container">
        {/*<Header/>*/}

        <Button
          variant="fab"
          color="primary"
          style={fab}
          onClick={this.handleClickOpen}
        >
          +
        </Button>
          // todo
        <div className="row" id="card-container">
          {this.state.resource.map((item, index) => {
            return (
              <ResourceCard
                value={item}
                index={index}
                onClickMinus={this.onClickMinus}
                onClickPlus={this.onClickPlus}
                onClickPin={this.onClickPin}
                key={index}
              />

                // todo : pelase try to sort commponent itself not the string inside :-D thanks like  ==> <ResourceCard url="https://www.youtube.com/watch?v=6ik0M-AWrn8"/>
                //           <ResourceCard url="https://www.youtube.com/watch?v=-5de3kJZ60w"/>
                //           <ResourceCard url="https://www.youtube.com/watch?v=EmYVZuczJ6k"/>
            );
          })}
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth="35%"
        >
          <AddLink open={this.state.open} context={this} />
        </Dialog>
      </div>
    );
  }
}

export default DemoCards;
