import { connect } from "react-redux";
import { checkLogin } from '../../api/apicall_for_users';
import React, { Component } from 'react';
import Loading from './loading.gif';
import { Route, Redirect } from 'react-router-dom'
let RoutingMap = require('./RoutingMap');

class PrivateRoute extends Component {

    constructor(props) {
        super(props);
        this.state = null
    }

    async componentDidMount() {
        try {
            const data = await checkLogin({});
            this.setState(data);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const response = this.state;
        if (response === null) {
            return <div><img style={{ 'textAlign': 'center', 'marginTop': '100px' }} src={Loading} /></div>
        } else {
            console.log("response :", response["data"]);
            if (typeof response["data"] === "object") {
                console.log("insdie if")
                if (this.props.dataprops.location.pathname == '/login') {
                    if (response["data"].role == 1) {
                        this.props.SetSession(response["data"]);
                        return <Redirect to={{
                            pathname: '/home',
                        }} />;
                    } else if (response["data"].role == 2) {
                        this.props.SetSession(response["data"]);
                        return <Redirect to={{
                            pathname: '/mhadmin',
                        }} />;
                    } else if (response["data"].role == 3) {
                        this.props.SetSession(response["data"]);
                        return <Redirect to={{
                            pathname: '/admin',
                        }} />;
                    }
                }
                if (RoutingMap[response["data"].role].indexOf(this.props.dataprops.location.pathname) > -1) {
                    this.props.SetSession(response["data"]);
                    return <this.props.componentname {...this.props.dataprops} />
                } else {
                    this.props.SetSession(response["data"]);
                    return <Redirect to={{
                        pathname: '/pagenotfound',
                    }} />;
                }
            } else {
                if (this.props.dataprops.location.pathname == '/login') {
                    return <this.props.componentname {...this.props.dataprops} redirectURL={this.redirectURL} />
                } else {
                    return <Redirect to={{
                        pathname: '/login',
                    }} />;
                }
            }
        }
    }
    redirectURL = (url) => {
        window.location = url;
    };
}



PrivateRoute = connect(
    null,
    dispatch => {
        return {
            SetSession: (session) => {
                dispatch({
                    type: "LOGIN_USER",
                    "payload": session
                })
            }
        }
    }
)(PrivateRoute);

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        return <PrivateRoute dataprops={props} componentname={Component} />
    }} />
};

export default ProtectedRoute