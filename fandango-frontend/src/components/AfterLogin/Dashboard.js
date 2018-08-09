import React, { Component } from 'react';
import './dashboard.css';
import HomeHeader from './HomeHeader';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { log1, pageNames } from "../../App";
import {selectedTrace} from '../../actions'

class Dashboard extends  Component {

    constructor(props){
        super(props);
        this.handleLogs = this.handleLogs.bind(this);
    }

    componentDidMount() {
        let pages = this.props.trace;
        pages.push("User Dashboard");
        if (this.props.user !== undefined && this.props.user.role == 3) {
            this.props.selectedTrace(pages)
        }
    }

    handleLogs(){
        log1.info('{"event":"page_click","page_name":"User Dashboard","count":"1"}');
    }

    render() {
        return (
            <div onClick={this.handleLogs}>
                <div className="site-wrap">
                    <HomeHeader/>

                    <div id="TICKETS_SECTION_1">
                        <div id="TICKETS_DIV_2">
                            <div id="TICKETS_DIV_3">
                                <h1 id="H1_4">FANDANGO <span id="SPAN_5">VIP<span id="SPAN_6"></span></span></h1>
                                <nav className="page-navigation">
                                    <ul className="page-navigation-list">
                                        <li className="page-navigation-item" style={{ paddingTop: '15px', color: 'white'}}><Link className="page-navigation-link" to="/dashboard">Account Settings</Link></li>
                                        <li className="page-navigation-item"><Link className="page-navigation-link" to="/purchasehistory">Purchase History</Link></li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-offset-2 col-md-8 account-view">
                        <h2 className="account-font">BASIC INFORMATION</h2>
                        <p className="account-details">Change your personal information of your Fandango VIP account here..</p>
                        <div className="account-edit">
                            <Link to="/preferences">
                                <button type="button" className="btn btn-default btn-sm" style={{ backgroundColor: "#3d3d3d", color: "white"}}>
                                    <span className="glyphicon glyphicon-edit" style={{ color: "white"}}></span> Edit
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-offset-2 col-md-8 account-view">
                        <h2 className="account-font">CHANGE EMAIL</h2>
                        <p className="account-details">Change the email address of your Fandango VIP account..</p>
                        <div className="account-edit">
                            <Link to="/preferences">
                                <button type="button" className="btn btn-default btn-sm" style={{ backgroundColor: "#3d3d3d", color: "white"}}>
                                    <span className="glyphicon glyphicon-edit" style={{ color: "white"}}></span> Edit
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-offset-2 col-md-8 account-view">
                        <h2 className="account-font">CHANGE PHONE</h2>
                        <p className="account-details">Change the phone number of your Fandango VIP account..</p>
                        <div className="account-edit">
                            <Link to="/preferences">
                                <button type="button" className="btn btn-default btn-sm" style={{ backgroundColor: "#3d3d3d", color: "white"}}>
                                    <span className="glyphicon glyphicon-edit" style={{ color: "white"}}></span> Edit
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-offset-2 col-md-8 account-view">
                        <h2 className="account-font">CHANGE PASSWORD</h2>
                        <p className="account-details">Change the password of your Fandango VIP account..</p>
                        <div className="account-edit">
                            <Link to="/preferences">
                                <button type="button" className="btn btn-default btn-sm" style={{ backgroundColor: "#3d3d3d", color: "white"}}>
                                    <span className="glyphicon glyphicon-edit" style={{ color: "white"}}></span> Edit
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-offset-2 col-md-8 account-view">
                        <h2 className="account-font">PAYMENT METHOD</h2>
                        <p className="account-details">Save a credit/debit card to your account. It's faster and OPTIONAL!!..</p>
                        <div className="account-edit">
                            <Link to="/preferences">
                                <button type="button" className="btn btn-default btn-sm" style={{ backgroundColor: "#3d3d3d", color: "white"}}>
                                    <span className="glyphicon glyphicon-edit" style={{ color: "white"}}></span> Edit
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.loginUser,
        trace: state.selectedTrace
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectedTrace: selectedTrace}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);