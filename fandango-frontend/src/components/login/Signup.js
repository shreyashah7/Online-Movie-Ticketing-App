import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import fandangoLogo from './fandango-logo.jpg';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import * as API from  './../../api/apicall_for_users';
import Message from '../Message/Message'
import {log1} from "../../App";


class Signup extends Component{

    notify = (message1) => toast(message1);

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            fname: '',
            message: '',
            emailmessage: '',
            fnamemessage: '',
            password1message: '',
            password2message: '',
            password12message: '',
            emailerror: 0,
            fnameerror: 0,
            passworderror: 0
        }

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogs = this.handleLogs.bind(this);
    }

    handleLogs() {
        log1.info('{"event":"page_click","page_name":"Signup","count":"1"}');
    }

    handleSignUp = (userdata) => {
        this.setState({
            emailmessage: '',
            fnamemessage: '',
            password1message: '',
            password2message: '',
            password12message: '',
            emailerror: 0,
            fnameerror: 0,
            passworderror: 0,
            type: true
        },()=>this.handleFirstName(userdata));
    }

    handleFirstName =(userdata) => {

        if(this.state.fname.length == 0){
            this.setState({
                fnamemessage: 'First Name should not be empty',
                fnameerror: 1,
                type: true
            },()=>this.handleEmail(userdata));
        }
        else{
            this.handleEmail(userdata);
        }
    }

    handleEmail = (userdata) => {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        if (!re.test(this.state.email) ) {
            this.setState({
                emailmessage: 'Invalid Email Address',
                emailerror: 1,
                type: true
            },()=>this.handleEmailLength(userdata));
        }
        else{
            this.handleEmailLength(userdata)
        }

    }

    handleEmailLength =(userdata) => {

        if(this.state.email.length == 0){
            this.setState({
                emailmessage: 'Email should not be empty',
                emailerror: 1,
                type: true
            },()=>this.handlePassword1(userdata));
        }
        else{
            this.handlePassword1(userdata);
        }
    }


    handlePassword1 =(userdata) => {

        if(this.state.password.length == 0){
            this.setState({
                password1message: 'Password should not be empty',
                passworderror: 1,
                type: true
            },()=>this.handlePassword2(userdata));
        }
        else{
            this.handlePassword2(userdata);
        }
    }

    handlePassword2 =(userdata) => {

        if(this.state.password2.length == 0){
            this.setState({
                password2message: 'Password should not be empty',
                passworderror: 1,
                type: true
            },()=>this.handlePassword12(userdata));
        }
        else{
            this.handlePassword12(userdata);
        }
    }

    handlePassword12 =(userdata) => {

        if(this.state.password != this.state.password2){
            this.setState({
                password12message: 'Passwords do not match',
                passworderror: 1,
                type: true
            },()=>this.AfterValidation(userdata));
        }
        else{
            this.AfterValidation(userdata);
        }
    }

    AfterValidation= (userdata) => {
        if( this.state.fnameerror != 1 && this.state.emailerror != 1 && this.state.passworderror!= 1){
            API.doSignup(userdata)
                .then((status) => {
                    if(status.message == 'The password is too weak' || status.message == 'User Already Exist in the system with this email address.') {

                        this.setState({

                                    message: status.message
                                })

                    }
                    else{
                        
                        this.setState({
                            message: ''
                        })
                        this.notify(status.meta.message);
                    }
                });
        }

    }


    render(){
        return(
            <div className="site-wrep signin vipsignin" onClick={this.handleLogs}>
                <ToastContainer />
                <div>
                    <header id="registration-header" className="registration-header" role="banner">
                        <nav  className="nav-bar">
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

                                        <span>Already have a Fandango VIP Account?</span> &nbsp;<Link to="/login" className="cta">SIGN IN</Link>


                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>

                <div className="sign-form" style={{ minHeight: '550px'}}>
                    <div className="sub-panel">
                        <p className="join-header">FANDANGO<span className="page-header-emphasis">VIP</span>

                            <span className="registration-caption hide-for-small-only">(And Become eligible for VIP+ Points)</span>
                            <span className="registration-caption show-for-small-only">(And Become eligible for VIP+ Points)</span>

                        </p>
                        <label htmlFor="FirstnameBox" >First Name</label>
                        <input
                            type="text"
                            id="FirstnameBox"
                            onChange={(event)=>{
                                this.setState({
                                    fname:event.target.value,
                                    type:true
                                });
                            }}
                            required
                            autoFocus
                        />
                        <Message message={this.state.fnamemessage}/>
                        <label htmlFor="UsernameBox" >Email Address</label>
                        <input
                            type="text"
                            id="UsernameBox"
                            onChange={(event)=>{
                                this.setState({
                                    email:event.target.value,
                                    type:true
                                });
                            }}
                            required
                        />
                        <Message message={this.state.emailmessage}/>
                        <label htmlFor="PasswordBox" >Password</label>
                        <input
                            type="password"
                            id="PasswordBox"
                            onChange={(event)=>{
                                this.setState({
                                    password:event.target.value,
                                    type:true
                                });
                            }}
                            required

                        />
                        <Message message={this.state.password1message}/>
                        <small className="password-instruction">Password should be alphanumeric with one symbol, one uppercase letter and  at-least 8 in length.</small>
                        <label htmlFor="ConfirmPasswordBox" >Confirm Password</label>
                        <input
                            type="password"
                            id="ConfirmPasswordBox"
                            onChange={(event)=>{
                                this.setState({
                                    password2:event.target.value,
                                    type:true
                                });
                            }}
                            required
                        />
                        <Message message={this.state.password2message}/>
                        <Message message={this.state.password12message}/>
                        <button className="btn-cta full-width" alternatetext="Join Now for Free" onClick={()=> this.handleSignUp(this.state)}>Join Now For Free</button>
                        <Message  message={this.state.message} />
                    </div>

                </div>




            </div>
        )


    }
}

export default (Signup);