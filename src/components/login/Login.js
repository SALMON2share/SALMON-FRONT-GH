import React, { Component } from "react";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import Header from "../Header/Header";
import { LinkContainer } from "react-router-bootstrap";
import { loginData } from "../../utils/Connection";
import Logo from "../LOGO/Logo";
import "./Login.css";
import SalmonLoginLogoAdd from ".//sharing and learing material online.png";
import { connect } from "react-redux";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRequesting: false,
      errorMessage: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  login(event) {
    this.setState({
      isRequesting: true
    });
    loginData(this.state.email, this.state.password)
      .then(result => {
        console.log("status1: " + result.status);
        if (result.status === 200) {
          this.setState({
            isRequesting: false
          });
          if (result.data.state === true) {
            this.props.cookies.set("username", result.data.userName, {
              path: "/"
            });
          }
          this.props.history.push("/Annotator");
        } else {
          this.setState({
            isRequesting: false,
            errorMessage: "Invalid username or password"
          });
        }
      })
      .catch(error => {
        console.log("status4: " + error);
        this.setState({
          isRequesting: false,
          errorMessage: "Invalid username or password"
        });
      });
    event.preventDefault();
  }

  componentDidMount() {
    console.log("cookies are", this.props);
    if (this.props.cookies.get("username") !== undefined) {
      this.props.history.push("/Annotator");
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="login-clean">
          {/**
           Here we can set if its request base or via json
           we should comment preventDefault if we need to send data via URL
           **/}
          {/*<form method="post" action="//localhost:8080/user/userLogin.do">*/}
          <form onSubmit={this.login.bind(this)}>
            <h2 className="sr-only">Login Form</h2>
            <div>
              <Logo address={SalmonLoginLogoAdd} />
            </div>
            {this.state.errorMessage.length > 0 ? (
              <div className="alert alert-danger font-weight-bold">
                {this.state.errorMessage}
              </div>
            ) : null}
            <div className="form-group">
              <TextField
                id="email"
                label="Email"
                placeholder="type your email"
                name="username"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                margin="normal"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <TextField
                id="password"
                label="Password"
                placeholder="type your password"
                name="userpass"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!this.validateForm()}
              >
                Login
              </Button>
            </div>
            {/*<LinkContainer to="/ForgotPassword" style={{ color: '#B22222' }}>*/}
            {/*<a>*/}
            {/*Forgot my password*/}
            {/*</a>*/}
            {/*</LinkContainer>*/}
            <br />
            <LinkContainer to="/Register" style={{ color: "#3267b2" }}>
              <a>Create Account</a>
            </LinkContainer>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state are", state);
  return {
    cookies: state.cookies
  };
}

export default connect(mapStateToProps)(LoginComponent);
