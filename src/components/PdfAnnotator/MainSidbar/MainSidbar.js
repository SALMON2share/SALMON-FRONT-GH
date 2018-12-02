import React from "react";
import Sidebar from "react-sidebar";
import DemoCards from "../../DemoCards/DemoCards";
import "./index.css";
import AnnotateSidebar from "../AnnotateSidebar/AnnotateSidebar";

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

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <div className="size">
        <Sidebar
           sidebar={<DemoCards/>}
          // sidebar={<AnnotateSidebar/>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "#69b5ff", width : "260px" } }}
        >
          <p>sosiusss</p>
          {/*<button onClick={() => this.onSetSidebarOpen(true)} className="ButtonPosition">*/}
            {/*Show Link and Video sidebar*/}
          {/*</button>*/}
        </Sidebar>

      </div>
    );
  }
}

export default MainSidbar;












// import React from "react";
// import Sidebar from "react-sidebar";
// import './index.css';
//
// const mql = window.matchMedia(`(min-width: 100px)`);
//
// class MainSidbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sidebarDocked: mql.matches,
//       sidebarOpen: true
//     };
//
//     this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
//     this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
//   }
//
//   componentWillMount() {
//     mql.addListener(this.mediaQueryChanged);
//   }
//
//   componentWillUnmount() {
//     mql.removeListener(this.mediaQueryChanged);
//   }
//
//   onSetSidebarOpen(open) {
//     this.setState({ sidebarOpen: open });
//   }
//
//   mediaQueryChanged() {
//     this.setState({ sidebarDocked: mql.matches, sidebarOpen: true });
//   }
//
//   render() {
//     return (
//       <Sidebar
//         className = "Sos"
//         sidebar={<b>Sidebar content</b>}
//         open={this.state.sidebarOpen}
//         docked={this.state.sidebarDocked}
//         onSetOpen={this.onSetSidebarOpen}
//       >
//         <p>salam sosis</p>
//         <b>Main content</b>
//         <p>salam sosis</p>
//         <p>salam sosis</p>
//       </Sidebar>
//     );
//   }
// }
//
// export default MainSidbar;
