import React,{Component} from "react";
import { Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';

export default class Create_spot extends Component{

  state = {
    pkey : "",
    addressNumber : "",
    streetName : "",
    postalCode : "",
    avgRating : "",
    currentPrice : ""
  }


  //changes appropriate state variables for whatever is typed into the fields
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  test = () => {
    console.log(this.state)
  }

  create = () => {

    console.log("GOT HERE")
    const data = {
      "pkey" : String(this.state.pkey),
      "addressNumber" : String(this.state.addressNumber),
      "streetName" : String(this.state.streetName),
      "postalCode" : String(this.state.postalCode),
      "avgRating" : String(this.state.avgRating),
      "currentPrice" : String(this.state.currentPrice),
      "user" :
      {
        "firstName" : "Alex",
        "lastName" : "Doe",
        "id" : "433",
        "password" : "scrum",
        "email" : "alex.doe@mail.mcgill.ca",
        "isRenter" : "true",
        "isSeller" : "false",
        "parkingManager" :
        {
          "pkey" : "1"
        }
      },
      "parkingManager" :
      {
        "pkey" : "1"
      }
    }
    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}

      axios.post('https://parking-system-ecse428.herokuapp.com/spot', data, headers );

    }

    render() {

      return (

        <div>
        <FormGroup controlId="streetName" bsSize="small">
        <ControlLabel>Street Name</ControlLabel>
        <FormControl
        autoFocus
        value={this.state.streetName}
        onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="addressNumber" bsSize="small">
        <ControlLabel>Address Number</ControlLabel>
        <FormControl
        autoFocus
        value={this.state.addressNumber}
        onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="postalCode" bsSize="small">
        <ControlLabel>Postal Code</ControlLabel>
        <FormControl
        autoFocus
        value={this.state.postalCode}
        onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="currentPrice" bsSize="small">
        <ControlLabel>Price</ControlLabel>
        <FormControl
        autoFocus
        value={this.state.currentPrice}
        onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="avgRating" bsSize="small">
        <ControlLabel>Rating</ControlLabel>
        <FormControl
        autoFocus
        value={this.state.avgRating}
        onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="pkey" bsSize="small">
        <ControlLabel>ID (3 digit number)</ControlLabel>
        <FormControl
        autoFocus
        value={this.state.pkey}
        onChange={this.handleChange}
        />
        </FormGroup>

        <button onClick={this.create}>ASDK</button>
        </div>
      );
    }
  }
