import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import {Link} from 'react-router-dom';
import avengers from './../MoviesList/avengers.jpg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { log1, pageNames } from "../../App";
import * as API from './../../api/apicall_for_users';
import {selectedTrace} from '../../actions'


class PurchaseHistory extends Component{


    constructor(props){
        super(props);

        this.state={
            purchases: []
        };
        this.handleLogs = this.handleLogs.bind(this);
    }

    componentDidMount(){
        let pages = this.props.trace;
        pages.push("Purchase History");
        if (this.props.user !== undefined && this.props.user.role == 3) {
            this.props.selectedTrace(pages)
        }

        API.getPurchaseHistory({})
            .then((result) => {
                console.log(result);
                this.setState({
                    purchases: result.data
                });
            });
    }

    handleLogs(){
        log1.info('{"event":"page_click","page_name":"Purchase history","count":"1"}');
    }

    renderPurchases() {
        if (this.state.purchases.length == 0) {
            return(
                <h2 style={{textAlign: 'left', marginTop: '20px', marginLeft: '14%'}}>YOU HAVE MADE NO PURCHASES</h2>
            )
        }
        else {
            return this.state.purchases.map((purchase) => {

                return (
                    <div className="col-md-offset-3 col-md-6 list-moviedetails"
                         style={{marginTop: '20px', height: '150px'}}>
                        <div className="img-style" style={{height: '150px'}}>
                            <img src={purchase.photos} className="img-peculiar" style={{height: '150px'}}/>
                        </div>
                        <div className="movie-heading" style={{width: '400px', paddingTop: '10px'}}>
                            <h4> {purchase.movie_name}</h4>
                        </div>
                        <div style={{position: 'absolute', textAlign: 'left', marginLeft: '140px', marginTop: '60px'}}>
                            <h5> {purchase.hall_name}</h5>
                        </div>
                        <div style={{position: 'absolute', textAlign: 'left', marginLeft: '140px', marginTop: '85px'}}>
                            <h5> Tickets: {purchase.no_of_seats}</h5>
                        </div>

                        <div style={{position: 'absolute', textAlign: 'left', marginLeft: '140px', marginTop: '110px'}}>
                            <h5> Total Price: ${purchase.total_price}</h5>
                        </div>


                    </div>
                );
            });
        }
    }

    render(){
        return(
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

                    {this.renderPurchases()}
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
export default connect(mapStateToProps, matchDispatchToProps)(PurchaseHistory);
