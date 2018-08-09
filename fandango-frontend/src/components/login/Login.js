import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fandangoLogo from './fandango-logo.jpg';
import { connect } from 'react-redux';
import { loginUser } from "../../actions";
import * as API from './../../api/apicall_for_users';
import Message from '../Message/Message'
import './login.css'
import {log1} from "../../App";


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            message: '',
            emailmessage: '',
            passwormessage: '',
            emailerror: 0,
            passworderror: 0


        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogs = this.handleLogs.bind(this);
    }

    handleSubmit = (userdata) => {
        this.setState({
            emailmessage: '',
            passwordmessage: '',
            emailerror: 0,
            passworderror: 0,
            type: true
        }, () => this.handleEmail(userdata));
    }

    handleEmail = (userdata) => {

        if (this.state.email.length == 0) {
            this.setState({
                emailmessage: 'Email should not be empty',
                emailerror: 1,
                type: true
            }, () => this.handlePassword(userdata));
        }
        else {
            this.handlePassword(userdata);
        }
    }

    handlePassword = (userdata) => {

        if (this.state.password.length == 0) {
            this.setState({
                passwordmessage: 'Password should not be empty',
                passworderror: 1,
                type: true
            }, () => this.AfterValidation(userdata));
        }
        else {
            this.AfterValidation(userdata);
        }
    }

    AfterValidation = (userdata) => {

        if (this.state.emailerror != 1 && this.state.passworderror != 1) {
            API.doLogin(userdata)
                .then((status) => {
                    console.log("status :",status);
                    if (status !== undefined && status.meta !== undefined && status.meta.message == "login successful") {
                        this.props.loginUser(status.data);
                        console.log("YOu need:" + this.props.user.role);
                        console.log("YOu also need:" + this.props.user.userId);
                        if (this.props.user.role === 1) {
                            this.props.redirectURL("/admin");
                        } else if (this.props.user.role === 2) {
                            this.props.redirectURL("/mhadmin");
                        } else if (this.props.user.role === 3) {
                            this.props.redirectURL("/home");
                        }
                    }
                    else {
                        this.setState({
                            message: status.data,
                        });
                    }
                });
        };
    }

    handleLogs() {
        log1.info('{"event":"page_click","page_name":"Login","count":"1"}');
    }

    render() {
        return (
            <div className="site-wrep signin vipsignin"  onClick={this.handleLogs}>
                <div>
                    <header id="registration-header" className="registration-header" role="banner">
                        <nav className="nav-bar">
                            <div className="row">
                                <div className="large-11 large-centered columns">
                                    <ul className="inline-items">
                                        <li className="site-logo">
                                            <Link className="fandango-logo" to="/">
                                                <img src={fandangoLogo} alt="Fandango Logo" className="brand-img" />
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="registration-mode right">

                                        <span>Don't have a Fandango VIP Account?</span> &nbsp;<Link to="/signup" className="cta">Join now for free</Link>


                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>

                <div className="open-form">
                    <div className="sub-panel">
                        <p className="join-header">FANDANGO<span className="page-header-emphasis">VIP</span>

                            <span className="registration-caption hide-for-small-only"></span>
                            <span className="registration-caption show-for-small-only"></span>

                        </p>

                        <label htmlFor="UsernameBox" >Email Address</label>
                        <input
                            type="text"
                            id="UsernameBox"
                            onChange={(event) => {
                                this.setState({
                                    email: event.target.value,
                                    type: true
                                });
                            }}
                            required
                        />
                        <Message message={this.state.emailmessage} />
                        <label htmlFor="PasswordBox" >Password</label>
                        <input
                            type="password"
                            id="PasswordBox"
                            onChange={(event) => {
                                this.setState({
                                    password: event.target.value,
                                    type: true
                                });
                            }}
                            required
                        />
                        <Message message={this.state.passwordmessage} />
                        <button className="btn-cta full-width" alternatetext="Sign In" onClick={() => this.handleSubmit(this.state)}>Sign In</button>
                        <Message message={this.state.message} />

                    </div>

                </div>


            </div>
        )


    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser: loginUser }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Login);
