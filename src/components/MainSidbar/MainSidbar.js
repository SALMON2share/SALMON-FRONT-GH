import React from "react";
import Sidebar from "react-sidebar";
import DemoCards from "../DemoCards/DemoCards";
import "./index.css";
import Header from "../Header/Header";

class MainSidbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden"
  };
  sidebar: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    bottom: 0,
    transition: "transform .3s ease-out",
    WebkitTransition: "-webkit-transform .3s ease-out",
    willChange: "transform",
    overflowY: "auto"
  };
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    transition: "left .3s ease-out, right .3s ease-out"
  };
  overlay: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .3s ease-out, visibility .3s ease-out",
    backgroundColor: "rgba(0,0,0,.3)"
  };
  dragHandle: {
    zIndex: 1,
    position: "fixed",
    top: 0,
    bottom: 0
  };

  onSetSidebarOpen = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    return (
      <div className="size">
        <Sidebar
          sidebar={<DemoCards />}
          open={this.props.sidebarOpen && this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "#69b5ff", width: "430px" } }}
          pullRight={true}
        >
          <Header
            toggleSidebar={
              this.props.toggleSidebar
                ? this.props.toggleSidebar
                : this.onSetSidebarOpen
            }
          />
          <p>sosiusss</p>
        </Sidebar>
      </div>
    );
  }
}

MainSidbar.defaultProps = {
  sidebarOpen: true
};
export default MainSidbar;
