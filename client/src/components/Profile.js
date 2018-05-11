import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
class Profile extends Component {

  state = {
    username: "",
    email: ""
  }

  componentDidMount() {
    API.getUser("5af5e0248f6ccf6109924ca1").then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    });
  }

  render() {
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>{this.state.username}</p>
        <p>{this.state.email}</p>
      </div>
    );
  }
}

export default withAuth(Profile);