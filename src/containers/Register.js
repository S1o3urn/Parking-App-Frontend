import React, { Component } from "react";
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {validateEmail} from "./Helpers.js";

//check login page for more comments



export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      role: ""
    };
  }

  validateForm() {
    return validateEmail(this.state.email) && this.state.password.length > 0 && 
    this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
    this.state.password === this.state.password2 && this.state.role != null;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleClick = event =>{
    var self = this;
    var usrf = this.state.firstName;
    var usrl = this.state.lastName;
    var pass = this.state.password;
    var mail = this.state.email;
    var usrn = this.state.username;
    var renter = true;
    var seller = true;
    
    // if (this.state.role === "Renter"){
    //   renter = true;
    //   seller = false;
    // }

    // else if (this.state.role === "Seller"){
    //   renter = false;
    //   seller = true;
    // }

    var headers1 = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    var data = {
          firstName: usrf,
          lastName: usrl,
          id: usrn,
          password: pass,
          email: mail,
          isRenter: renter,
          isSeller: seller,
          parkingManager:
          {
              pkey: "1"
          },
        headers: headers1
      };

    axios.post("https://parking-system-ecse428.herokuapp.com/user", data)
        .then((function (response){
            if(response.status == 200){
                var email = mail;
                var password = pass;
                var header = email + ":" + password;
                var base64 = require('base-64');
                header = base64.encode(header);

                var headers = {
                    'Authorization': 'Basic ' + header,
                    'Method': 'email',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                };

                var data = {};
                axios.post("https://parking-system-ecse428.herokuapp.com/user/authenticate", data, {headers: headers} )
                    .then((function (response){
                        if(response.status == 200){
                            self.props.userHasAuthenticated(true);
                            localStorage.setItem('myData', JSON.stringify(response.data));
                            self.props.history.push("/browse");
                        }
                    })).catch(function (error){
                    var errorMsg = error.response.data;
                    this.setState({error: errorMsg})
                    console.log(error.response);
                    console.log('Failed');
                });
            }
        }))
        .catch(e => {
        var errorMsg = e.response.data;
        this.setState({error: errorMsg})
    });

  };

  render() {

    return (
      <p className="Login">
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
            <div style={{"color": "red"}}>
              <p>
                {this.state.error}
              </p>
            </div>
        </FormGroup>
        <FormGroup controlId="firstName" bsSize="medium">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              autoFocus
              type="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="medium">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              autoFocus
              type="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="medium">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          {/* <FormGroup controlId="role" bsSize="medium">
              <ControlLabel>Role</ControlLabel><br/>
              <select value={this.state.role}  onChange={this.handleChange} id="role">
                  <option value="Renter">Renter</option>
                  <option value="Seller">Seller</option>
              </select>
              <p></p>
              <p>{this.state.value}</p>
          </FormGroup> */}
          <FormGroup controlId="username" bsSize="medium">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="medium">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2" bsSize="medium">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="medium"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleClick}
          >
            Register
          </Button>
        </form>
      </p>
    );
  }
}