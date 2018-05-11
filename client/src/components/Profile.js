import React, { Component } from 'react';
import withAuth from './withAuth';

class Profile extends Component {

  render() {
    return (
      <div className="Profile">
        <h1>On the profile page!</h1>
      </div>
    );
  }
}

export default withAuth(Profile);