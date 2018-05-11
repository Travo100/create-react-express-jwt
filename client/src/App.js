import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {

  state = {
    userId: this.props.user.id,
    profileLink: ""
  }

  componentDidMount() {
    const profileLinkURL = `/profile/${this.state.userId}`
    this.setState({
      profileLink: profileLinkURL
    });
  }

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/signup');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user.email}</h2>
        </div>
        <p className="App-intro">
          <Link type="button" className="form-submit" to={this.state.profileLink}>Edit Profile</Link>
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </p>
      </div>
    );
  }
}

export default withAuth(App);
