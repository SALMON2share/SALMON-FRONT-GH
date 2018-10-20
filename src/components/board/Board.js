import React, {Component} from 'react';
import Header from "../Header/Header";
import Button from "@material-ui/core/es/Button/Button";
import {getBoardsData} from "../../utils/Connection";
import {LinkContainer} from "react-router-bootstrap";
import Card from "@material-ui/core/es/Card/Card";
import QRCode from "qrcode-react";

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boards: [],
        };
    }

    componentDidMount() {
        this.getBoards();
    }

    getBoards() {
        getBoardsData()
            .then((result) => {
                console.log("status1: " + result);
                if (result.status === 200) {
                    console.log("here 2");
                    this.setState({
                        boards: result.data.boards
                    });
                }
                else {
                    this.setState({});
                    console.log("status3: " + result);
                }
            })
            .catch(error => {
                console.log("status4: " + error);
                this.setState({});
            });
    }

    render() {

        const fab = {
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 7,
            backgroundColor: '#3197ff',
        };


        let boardsCards = this.state.boards.map((board, index) =>
            <Card key={index} className=" bg-white  m-3 col-sm-5">

                <div className="row p-2">

                    <QRCode className="col-4 m-2" value={window.location.href.replace('boards', '') + "board?id=" + board.tagCode}
                            logoWidth="100px"/>

                    <LinkContainer to={"/board?id=" + board.tagCode} className="col-7 vertical-center">
                        <a className="nav-link text-dark font-weight-bold ">
                            <h3>{board.title}</h3>
                        </a>
                    </LinkContainer>
                </div>
            </Card>
        );

        return (
            <div className="App container">
                <Header/>
                <LinkContainer to="/" style={fab}>
                    <Button variant="fab" >
                        <a className="text-white">
                            +
                        </a>
                    </Button>
                </LinkContainer>

                <div className="row">
                    {boardsCards}
                </div>
            </div>
        );
    }
}

export default Board;


// import React, {Component} from 'react';
// import Header from "../Header/Header";
// import ResourceCard from "./ResourceCard";
// import Button from "@material-ui/core/es/Button/Button";
// import Dialog from "@material-ui/core/es/Dialog/Dialog";
// import AddLink from "../AddLink/AddLink";
//
// class ReferencesDashboard extends Component {
//
//   state = {
//     open: false,
//   };
//
//   handleClickOpen = () => {
//     this.setState({open: true});
//   };
//
//   handleClose = () => {
//     this.setState({open: false});
//   };
//
//
//   render() {
//     const fab = {
//       position: 'fixed',
//       bottom: 20,
//       right: 20,
//     };
//     return (
//       <div className="App container">
//
//         <Header/>
//
//         {/*<div className="row">*/}
//         {/*<ReferenceCard url="https://www.youtube.com/watch?v=5jVnLbdqR6U"/>*/}
//         {/*<ReferenceCard url="https://www.youtube.com/watch?v=KMX1mFEmM3E"/>*/}
//         {/*<ReferenceCard url="https://www.youtube.com/watch?v=oa9cnWTpqP8"/>*/}
//         {/*</div>*/}
//
//         <Button variant="fab" color="primary" style={fab} onClick={this.handleClickOpen}>
//           +
//         </Button>
//
//         <div className="row" id="card-container">
//           <ResourceCard url="https://www.youtube.com/watch?v=Zc54gFhdpLA"/>
//           {/*<ResourceCard url="https://www2.informatik.hu-berlin.de/top/lehre/WS06-07/se_se/folien/petrinetze.pdf"/>*/}
//           <ResourceCard url="https://www.youtube.com/watch?v=TOsMcgIK95k&list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz"/>
//           <ResourceCard url="https://www.youtube.com/watch?v=taClnxU-nao&list=PLqmFiiNyAKRNPP-JPqZnMWRvIpQpCoAFd"/>
//           <ResourceCard url="https://www.youtube.com/watch?v=6ik0M-AWrn8"/>
//           <ResourceCard url="https://www.youtube.com/watch?v=-5de3kJZ60w"/>
//           <ResourceCard url="https://www.youtube.com/watch?v=EmYVZuczJ6k"/>
//         </div>
//
//
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//           fullWidth="75%"
//         >
//           <AddLink open={this.state.open} context={this}/>
//         </Dialog>
//       </div>
//     );
//   }
// }
//
// export default ReferencesDashboard;
