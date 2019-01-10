import React, {Component} from 'react';
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";
import Header from "../Header/Header";
import StorageKeys from "../../utils/StorageKeys";
import {registerData} from "../../utils/Connection";
import CRIMG from "./createUser.png";
import "./CrImg.css";


class Register extends Component {

    renderPasswordConfirmError= event => {

      if (this.state.validating && this.state.userpass !== this.state.confirmPassword) {
            this.state.validatingConfirmPass = false;
            return (
                <div>
                    <label id="validConfirmPass" className="error" ref="errorMsg" style={{color: "#ff0834", fontSize:"small", float:"left"}} >Not match! Please rewrite the same password.</label>
                </div>
            );
        }
        else
            this.state.validatingConfirmPass = true ;
    };

    constructor(props) {
        super(props);

        this.state = {
          username: "",
          userpass: "",
            confirmPassword: "",
            validating: false,
            validatingConfirmPass: false,
            isRequesting: true,
            errorMessage: " "
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    isConfirmedPassword() {
            this.state.validating = true;
    }

    validateForm() {
      return this.state.validatingConfirmPass === true && this.state.username.length > 0
        && this.state.userpass.length > 0 && this.state.confirmPassword.length > 0;
    }

    // componentDidMount() {
    //     if (localStorage.getItem(StorageKeys.USER_ID) != null && localStorage.getItem(StorageKeys.USER_ID).length > 0 ){
    //         this.props.history.push('/');
    //     }
    // }
  // register(event) {
  //   this.setState({
  //     isRequesting: true
  //   });
  //   registerData(this.state.username, this.state.userpass)
  //     .then((result) => {
  //       console.log("status1: " + result);
  //       if (result.status === 200) {
  //         console.log("status2: ");
  //         this.setState({
  //           isRequesting: false
  //         });
  //         let username = result.data.message.username;
  //         // let username = result.data.message._id;
  //         //let _photoURL = result.data.message.photo;
  //         localStorage.setItem(StorageKeys.EMAIL, username);
  //         //localStorage.setItem(StorageKeys.USER_ID, _userId);
  //         //localStorage.setItem(StorageKeys.PHOTO_URL, _photoURL);
  //         // to know about localStorage https://blog.logrocket.com/the-complete-guide-to-using-localstorage-in-javascript-apps-ba44edb53a36
  //         this.props.history.push("/");
  //       }
  //       else {
  //         this.setState({
  //           isRequesting: false,
  //           errorMessage: result.response.data.message
  //         });
  //         console.log("status3: " + result);
  //       }
  //     })
  //     .catch(error => {
  //       console.log("status4: " + error);
  //       this.setState({
  //         isRequesting: false,
  //         errorMessage: error.response.data.message
  //       });
  //       debugger;
  //         if (this.state.errorMessage == '430') {
  //             alert("SOSIS");
  //         }
  //     });
  //   // event.preventDefault();
  // }
    render() {
      debugger;
      return (
        <div className="App">
            <Header/>
            <div className="registration-clean">
              <form action="//localhost:8080/SalmonController_war_exploded/user/userRegister.do">
                    <h2 className="text-center">Create Account</h2>
                <img className="Img" src={CRIMG} alt="Create Account"/>
                    <div className="form-group">
                        <TextField
                          id="username"
                          label="Username"
                          placeholder="type your email"
                          name="username"
                          type="email"
                          value={this.state.username}
                          onChange={this.handleChange}v
                          margin="normal"
                          className="form-control"/>
                    </div>
                    <div className="form-group">
                        <TextField
                          id="userpass"
                          label="userpass"
                          placeholder="type your password"
                          name="userpass"
                          type="password"
                          value={this.state.userpass}
                          onChange={this.handleChange}
                          margin="normal"
                          className="form-control"/>
                    </div>
                    <div className="form-group">
                        <TextField
                            id="confirmPassword"
                            label="Password Confirmation"
                            placeholder= "repeat your password"
                            name="confirmPassword"
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            onFocus={this.isConfirmedPassword.bind(this)}
                            margin="normal"
                            className="form-control"/>
                    </div>
                    {this.renderPasswordConfirmError()}
                    <div className="form-group">
                        <Button variant="contained" color="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </div>
      </div>)
    }
}


export default Register;


// class Register extends Component {
//   state = {
//     username: '',
//     userpass: '',
//     isRequesting: true
//   };
//   postDataHandler = () => {
//     const sendData = {
//       username: this.state.username,
//       userpass: this.state.userpass
//
//     };
//
//   };
//
//   render() {
//     return (
//       <div >
//         <h1>Register</h1>
//         <label>Email</label>
//         <form action="//localhost:8080/SalmonController_war_exploded/user/userRegister.do">
//           <input type="text" value={this.state.username}
//                  onChange={(event) => this.setState({username: event.target.value})} name="username"/>
//           <input type="password" value={this.state.userpass}
//                  onChange={(event) => this.setState({userpass: event.target.value})} name="userpass"/>
//           <button onClick={this.postDataHandler}>Add Post</button>
//         </form>
//
//       </div>
//     );
//   }
// }
//
// export default Register;

// http://localhost:8080

{/*<form action="//localhost:8080/SalmonController_war_exploded/user/userRegister.do">*/}