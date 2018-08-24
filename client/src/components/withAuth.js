import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            };
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/signup');
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    });
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/signup');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} match={this.props.match} />
                );
            }
            else {
                return null;
            }
        }
    };
}

