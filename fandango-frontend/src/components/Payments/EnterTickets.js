import React, {Component} from 'react';
import fandangoLogo from './../login/fandango-logo.jpg';
import {Link} from 'react-router-dom';
import Message from '../Message/Message';
import {connect} from "react-redux";
import {doneBooking} from "../../actions";
import {bindActionCreators} from "redux";
import * as API from './../../api/apicall_for_users';
import { log1, pageNames } from "../../App";
import {selectedTrace} from '../../actions'
import * as CardValidator from '../Helper/CardValidator';
let state_regex_pattern = require('../Helper/StateRegex');
let zipcode_regex = require('../Helper/ZipcodeRegex');
let emailRegex = require('../Helper/EmailRegex');
let phoneNoRegex = require('../Helper/PhoneNumberRegex');



class EnterTickets extends Component{

    constructor(props) {
        super(props);

        this.state = {
            movie_schedule_id: this.props.schedule.movie_schedule_id,
            total_price:1,
            tax:'',
            no_of_seats:0,
            status:"A",
            price: this.props.schedule.price,
            available_seats: this.props.schedule.available_seats,
            card: '',
            name: '',
            expiration: '',
            cvv: '',
            ticketerror: '',
            ticketmessage: '',
            carderror: '',
            cardmessage: '',
            expirationerror: '',
            expirationmessage: '',
            nameerror: '',
            namemessage: '',
            cvverror: '',
            cvvmessage: '',
            ticket2error: '',
            ticket2message: '',
            credit_card_number: ''

        };
        this.handleLogs = this.handleLogs.bind(this);
    }

    handleLogs(){
        log1.info('{"event":"page_click","page_name":"Buy Tickets","count":"1"}');
    }

    componentDidMount() {

        if (this.props.user !== undefined) {
            let pages = this.props.trace;
            pages.push("Buy Tickets");
            if (this.props.user !== undefined && this.props.user.role == 3) {
                this.props.selectedTrace(pages)
            }
        }

        console.log(this.state.available_seats);
        API.getProfile()
            .then((status) => {
                this.setState({
                    credit_card_number: status.data.credit_card_number
                })
            });
    }

    handleAuthorize = (userdata) => {
        this.setState({
            ticketerror: '',
            ticketmessage: '',
            type: true
        }, () => this.handleTickets(userdata));
    }
    handleTickets = (userdata) => {

        if (this.state.no_of_seats == 0 || this.state.no_of_seats > this.state.available_seats) {
            this.setState({
                ticketmessage: 'Invalid no. of seats or You have demanded more seats than available',
                ticketerror: 1,
                type: true
            }, () => this.doPayment(userdata));
        }
        else {
            this.doPayment(userdata);
        }
    }


    doPayment = (userdata) => {
        if(this.state.ticketerror != 1) {
            API.bookMovie(userdata.payload)
                .then(
                    window.location = "/purchasehistory"
                );
        }
    }


    handleBuy = (userdata) => {
        this.setState({
            carderror: '',
            cardmessage: '',
            expirationerror: '',
            expirationmessage: '',
            nameerror: '',
            namemessage: '',
            cvverror: '',
            cvvmessage: '',
            ticket2error: '',
            ticket2message: '',
            type: true
        }, () => this.handleCard(userdata));
    }

    handleCard = (userdata) => {

        if (this.state.card == "" || !CardValidator.validateCardNumber(this.state.card) ) {
            this.setState({
                cardmessage: 'Invalid card no',
                carderror: 1,
                type: true
            }, () => this.handleExpiration(userdata));
        }
        else {
            this.handleExpiration(userdata);
        }
    }

    handleExpiration = (userdata) => {

        if ( this.state.expiration == "" || !CardValidator.validateExpiration(this.state.expiration)) {
            this.setState({
                expirationmessage: 'Invalid expiration format',
                expirationerror: 1,
                type: true
            }, () => this.handleName(userdata));
        }
        else {
            this.handleName(userdata);
        }
    }

    handleName = (userdata) => {

        if (this.state.name.length == 0 ) {
            this.setState({
                namemessage: 'Name cannot be empty',
                nameerror: 1,
                type: true
            }, () => this.handleCVV(userdata));
        }
        else {
            this.handleCVV(userdata);
        }
    }

    handleCVV = (userdata) => {

        if (this.state.cvv.length != 3 ) {
            this.setState({
                cvvmessage: 'Invalid cvv',
                cvverror: 1,
                type: true
            }, () => this.handleTickets2(userdata));
        }
        else {
            this.handleTickets2(userdata);
        }
    }

    handleTickets2 = (userdata) => {

        if (this.state.no_of_seats == 0 || this.state.no_of_seats > this.state.available_seats) {
            this.setState({
                ticket2message: 'Invalid no. of seats or You have demanded more seats than available',
                ticket2error: 1,
                type: true
            }, () => this.doPayment2(userdata));
        }
        else {
            this.doPayment2(userdata);
        }
    }

    doPayment2 = (userdata) => {
        if(this.state.carderror != 1 && this.state.expirationerror != 1 && this.state.nameerror != 1 && this.state.cvverror != 1 && this.state.ticket2error != 1) {
            API.bookMovie(userdata.payload)
                .then(
                    window.location = "/purchasehistory"
                );
        }
    }

    renderCard(){
        console.log(this.state.credit_card_number);
        if(this.state.credit_card_number === null || this.state.credit_card_number === undefined ){
            return(
                <div></div>
            )
        }
        else{

            return(

                <div>
                    CARD NO: {this.state.credit_card_number}<br />


                    Tickets:
                    <input
                        type="number"
                        style={{ width:'50px', marginLeft: '42%'}}
                        onChange={(event) => {
                            this.setState({
                                no_of_seats: event.target.value,
                                total_price: this.state.price * event.target.value,
                                tax: 0.09 * (this.state.price * event.target.value) ,

                                type: true
                            });
                        }}
                    />
                    <Message message={this.state.ticketmessage} />

                    <br />

                    <button type="button"  className="btn" style={{backgroundColor: '#F15500',color: 'white'}}
                            onClick={ () => this.handleAuthorize(this.props.doneBooking(this.state))}>USE THIS CARD</button>

                <hr />
                </div>


            )
        }
    }



    render(){
        return(
            <div className="site-wrep signin vipsignin" style={{ }} onClick={this.handleLogs}>
                <div>
                    <header id="registration-header" class="registration-header" role="banner">
                        <nav  className="nav-bar">
                            <div className="row">
                                <div className="large-11 large-centered columns">
                                    <ul className="inline-items">
                                        <li className="site-logo">
                                            <Link className="fandango-logo" to="/">
                                                <img src={fandangoLogo} alt="Fandango Logo" class="brand-img" />
                                            </Link>
                                        </li>
                                    </ul>
                                    <div class="registration-mode right">
                                        You're a guaranteed ticket away from the perfect movie night.

                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>

                <div className="open-form" style={{ minHeight: '525px', marginTop: '25px', paddingBottom: '50px'}}>
                    <div className="sub-panel">
                        <p className="join-header">FANDANGO<span class="page-header-emphasis">VIP</span>

                            <span className="registration-caption hide-for-small-only"></span>
                            <span className="registration-caption show-for-small-only"></span>

                        </p>

                        <hr />

                        <Link to="/movietickets">Select a new Showtime</Link>
                        <hr />
                        Price: $ {this.state.price} <br />
                        Available Seats: {this.state.available_seats}
                        <hr />
                        {this.renderCard()}

                        <div>
                            ENTER YOUR CARD<br />

                            Tickets:
                            <input
                                type="number"
                                style={{ width:'50px', marginLeft: '42%'}}
                                onChange={(event) => {
                                    this.setState({
                                        no_of_seats: event.target.value,
                                        total_price: this.state.price * event.target.value,
                                        tax: 0.09 * (this.state.price * event.target.value) ,

                                        type: true
                                    });
                                }}
                            />
                            <Message message={this.state.ticket2message} />


                            <label for="CardnumberBox" >CARD NUMBER:</label>
                            <input
                                type="number"
                                id="CardnumberBox"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        card: event.target.value,
                                        type: true
                                    });
                                }}
                            />
                            <Message message={this.state.cardmessage} />

                            <label for="ExpirationBox" >EXPIRATION DATE:(mm/yy format) </label>
                            <input
                                type="text"
                                id="ExpirationBox"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        expiration: event.target.value,
                                        type: true
                                    });
                                }}
                            />
                            <Message message={this.state.expirationmessage} />


                            <label for="NameBox" >NAME ON THE CARD: </label>
                            <input
                                type="text"
                                id="NameBox"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        name: event.target.value,
                                        type: true
                                    });
                                }}
                            />
                            <Message message={this.state.namemessage} />


                            <label for="ZipBox" >CVV: </label>
                            <input
                                type="number"
                                id="ZipBox"
                                required
                                onChange={(event) => {
                                    this.setState({
                                        cvv: event.target.value,
                                        type: true
                                    });
                                }}
                            />
                            <Message message={this.state.cvvmessage} />

                            <br />

                        </div>

                        <button
                            type="button"
                            className="btn btn-warning"
                            style={{ backgroundColor: "#F15500"}} onClick={ () => this.handleBuy(this.props.doneBooking(this.state))}>BUY TICKETS</button>

                        <Link to="/movietickets"><button
                            type="button"
                            className="btn btn-warning"
                            style={{ backgroundColor: "#F15500", marginLeft: '5px'}} >CANCEL PAYMENT</button></Link>

                    </div>

                </div>



            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        booking: state.doneBooking,
        schedule: state.selectedSchedule,
        user: state.loginUser,
        trace: state.selectedTrace
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ doneBooking: doneBooking, selectedTrace: selectedTrace }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(EnterTickets);
