import React from "react";
import './index.css';

class CollectionList extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      items: 10,
      loadingState: false
    };
  }

  componentDidMount() {

    this.refs.iScroll.addEventListener("scroll", () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
        this.loadMoreItems();
      }
    });
  }

  displayItems() {
    var items = [];
    for (var i = 0; i < this.state.items; i++) {
      items.push(<li key={i} className='PDFcore'>PDFcore {i}</li>);
    }
    return items;
  }

  loadMoreItems() {
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({ items: this.state.items + 10, loadingState: false });
    }, 100);
  }

  render() {
    return (
      <div className="BackGorundColor" style={{ margin : "25px" , width: "340px"}}>
        {/*style={{ overflow: "auto" , width: "340px"}}*/}
        <div className='Title2Style'>
          <p style={{ margin : "5px"}} >COLLECTION NAME </p>
        </div>

        <div className='ItemStyle' ref="iScroll" style={{ height: "200px", overflow: "auto" , width: "340px"}}>
          <ul>
            {this.displayItems()}
          </ul>
          {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}
        </div>

        <div className='TagListsstyleHeader'>
          <p  style={{ margin : "5px"}}>List of Tags</p>
        </div>

      </div>

    );
  }
}
export default CollectionList;
