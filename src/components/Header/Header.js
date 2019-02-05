import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import StorageKeys from "../../utils/StorageKeys";
import SemanticModal from "../Tags/SemanticModal";
import { connect } from "react-redux";
import AnnotateSidebar from "../PdfAnnotator/AnnotateSidebar/AnnotateSidebar";
// styles
// import "../../node_modules/jquery/dist/jquery.min.js";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

class Header extends Component {
    constructor(props) {
        super(props);
        this.isLogin = this.isLogin.bind(this);
        this.logout = this.logout.bind(this);
        console.log("props are", this.props);
    }
    isLogin() {
        if (
            this.props.cookies &&
            this.props.cookies.get("username") !== undefined
        )
            return true;
        return false;
    }
    logout() {
        console.log("cookies are", this.props.cookies);
        this.props.cookies.remove("username", {
            path: "/"
        });
    }
    render() {
        const shadow = {
            boxShadow: "1px 1px 5px rgba(0, 0, 0, .25)",
            backgroundColor: "#27679a"
        };
        return (
            <div className="App">
                <nav
                    className="navbar navbar-expand-lg navbar-dark fixed-top"
                    style={shadow}
                >
                    <button
                        onClick={this.props.toggleSidebar}
                        className={"btn btn-primary"}
                    >
                        {" "}
                        CARD BAR{" "}
                    </button>
                    {this.isLogin() && (
                        <div style={{ marginLeft: 10 }}>
                            {this.props.cookies.get("username")}
                        </div>
                    )}
                    <div className="container mt-0">
                        <LinkContainer to="/">
                            <a className="navbar-brand text-white abs font-weight-bold">
                                SALMON
                            </a>
                        </LinkContainer>

                        <button
                            className="navbar-toggler custom-toggler navbar-toggler-right"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarToggleExternalContent"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarToggleExternalContent"
                        >
                            <ul className="navbar-nav ml-auto">
                                {/*<li className="nav-item ">*/}
                                    {/*<LinkContainer to="/Settings">*/}
                                        {/*<a className="nav-link text-white font-weight-bold">*/}
                                            {/*Settings*/}
                                        {/*</a>*/}
                                    {/*</LinkContainer>*/}
                                {/*</li>*/}
                                <li className="nav-item ">
                                    <LinkContainer to="/Annotator">
                                        <a className="nav-link text-white font-weight-bold">
                                            Annotator
                                        </a>
                                    </LinkContainer>
                                </li>
                                <li className="nav-item ">
                                    <LinkContainer to="/Collections">
                                        <a className="nav-link text-white font-weight-bold">
                                            Collection
                                        </a>
                                    </LinkContainer>
                                </li>
                                <li className="nav-item ">
                                    <LinkContainer to="/Qr-Scanner">
                                        <a className="nav-link text-white font-weight-bold">
                                            QR-Scanner
                                        </a>
                                    </LinkContainer>
                                </li>

                                {/*<li className="nav-item ">*/}
                                    {/*<LinkContainer to="/YouTubeApi">*/}
                                        {/*<a className="nav-link text-white font-weight-bold">*/}
                                            {/*YouTubeApi*/}
                                        {/*</a>*/}
                                    {/*</LinkContainer>*/}
                                {/*<li className="nav-item ">*/}
                                    {/*<LinkContainer to="/AnnotateSidebar">*/}
                                        {/*<a className="nav-link text-white font-weight-bold">*/}
                                            {/*Comments And Reply*/}
                                        {/*</a>*/}
                                    {/*</LinkContainer>*/}
                                {/*</li>*/}
                                {/*</li>*/}
                                <li className="nav-item ">
                                    <LinkContainer to="/DemoCards">
                                        <a className="nav-link text-white font-weight-bold">
                                            My Cards
                                        </a>
                                    </LinkContainer>
                                </li>
                                {/*<li className="nav-item ">*/}
                                    {/*<LinkContainer to="/SemanticModal">*/}
                                        {/*<a className="nav-link text-white font-weight-bold">*/}
                                            {/*SemanticModal*/}
                                        {/*</a>*/}
                                    {/*</LinkContainer>*/}
                                {/*</li>*/}
                                {this.isLogin() ? (
                                    <li
                                        className="nav-item "
                                        onClick={this.logout}
                                    >
                                        <LinkContainer to="/">
                                            <a className="nav-link text-white font-weight-bold">
                                                Logout
                                            </a>
                                        </LinkContainer>
                                    </li>
                                ) : (
                                    <li className="nav-item ">
                                        <LinkContainer to="/Login">
                                            <a className="nav-link text-white font-weight-bold">
                                                Login
                                            </a>
                                        </LinkContainer>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cookies: state.cookies
    };
}
export default connect(mapStateToProps)(Header);

// Header.prototype = {
//  onToggle : PropTypes.func
// };
