import React, {Component} from 'react';
import AuthService from './AuthService';
import {Link} from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  render() {
    return (
      <div className="container">

        <h1>Signup</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input className="form-control"
                   placeholder="Username goes here..."
                   name="username"
                   type="text"
                   id="username"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input className="form-control"
                   placeholder="Email goes here..."
                   name="email"
                   type="email"
                   id="email"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input className="form-control"
                   placeholder="Password goes here..."
                   name="password"
                   type="password"
                   id="pwd"
                   onChange={this.handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p><Link to="/login">Go to Login</Link></p>
      </div>
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.signup(this.state.username, this.state.email, this.state.password)
      .then(res => {
        console.log(res.data);
        this.props.history.replace('/login');
      })
      .catch(err => {
        alert(err);
      });
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
}

export default Signup;