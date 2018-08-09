import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import * as API from '../../api/API';
import './moviehall.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubHeader from './SubHeader';
import NavBar from '../Admin/Navigation';
var dateFormat = require('dateformat');

class SearchBill extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            isSearched: false,
            filterSelect: 1,
            bill_date: moment(),
            bill_month: 1,
            bookingList: [],
            months: [{ "name": 'January', "value": 1 }, { "name": 'February', "value": 2 }, { "name": 'March', "value": 3 },
            { "name": 'April', "value": 4 }, { "name": 'May', "value": 5 }, { "name": 'June', "value": 6 }, { "name": 'July', "value": 7 }
                , { "name": 'August', "value": 8 }, { "name": 'September', "value": 9 }, { "name": 'October', "value": 10 },
            { "name": 'November', "value": 11 }, { "name": 'December', "value": 12 }]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            bill_date: date
        });
    }

    searchBill() {
        this.setState({ submitted: true });
        if (!!this.state.bill_date || !!this.state.bill_month) {
            this.setState({ isSearched: true });
            let requestObj = {};
            if (this.state.filterSelect === 1) {
                requestObj.bill_date = moment(this.state.bill_date).format('YYYY-MM-DD');
            } else {
                requestObj.bill_month = this.state.bill_month;
            }
            if (this.props.user !== undefined && this.props.user.role === 2) {
                requestObj.hall_id = this.props.user.hall_id;
            }
            API.searchUserBooking(requestObj)
                .then((resultData) => {
                    if (!!resultData.data) {
                        this.setState({
                            bookingList: resultData.data,
                            submitted: false
                        });
                    } else {
                        this.notify("No Booking found for given Booking ID");
                    }
                }).catch(error => {
                    this.notify(error);
                });
        }
    }

    clearSearch() {
        this.setState({
            filterSelect: 1,
            bill_date: moment(),
            bill_month: 1,
            bookingList: [],
            submitted: false,
            isSearched: false
        });
    }

    render() {
        const columns = [{
            Header: 'Booking ID',
            accessor: 'bill_id',
            width: 200,
            style: { 'whiteSpace': 'unset' }
        }, {
            Header: 'Booking Date',
            accessor: 'booking_date',
            width: 200,
            style: { 'textAlign': 'right' },
            Cell: props => (<span className="visual-sub-title" style={{ 'fontWeight': '600' }}>{dateFormat(props.row._original.booking_date, "dddd, mmmm dS, yyyy")}</span>)
        }, {
            Header: 'Customer Name',
            accessor: 'first_name',
            style: { 'textAlign': 'right', 'whiteSpace': 'unset' },
            Cell: props => (<span style={{ 'color': '#80808C' }}>{props.row._original.first_name}</span>)
        }, {
            Header: 'Movie',
            accessor: 'movie_name',
            style: { 'textAlign': 'right', 'whiteSpace': 'unset' }
        }, {
            Header: 'Movie Hall',
            accessor: 'hall_name',
            style: { 'textAlign': 'right', 'whiteSpace': 'unset' }
        }, {
            Header: 'Location',
            accessor: 'first_name',
            style: { 'textAlign': 'right', 'whiteSpace': 'unset' },
            Cell: props => (<span style={{ 'color': '#80808C' }}>{props.row._original.street + ", " + props.row._original.city + ", " + props.row._original.state}</span>)
        }, {
            Header: 'Price',
            accessor: 'total_price',
            style: { 'textAlign': 'right' }
        }]

        return (
            <div className="admin-sub-header">
                <CommonHeader />
                {this.props.user.role == 2 &&
                    <SubHeader />
                }
                {this.props.user.role == 1 &&
                    <NavBar />
                }
                <ToastContainer />
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Search <span className="page-header-emphasis"> Bills</span></h2>
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-8 preferences-view">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="filterSelect" className="col-sm-2 col-form-label booking-id-font pd-right-0">Search</label>
                            <div className={'col-sm-3 pd-left-0 pd-right-0 ' + (this.state.submitted && !this.state.filterSelect ? ' has-error' : '')}>
                                <select className="form-control"
                                    id="filterSelect"
                                    name="filterSelect"
                                    required
                                    style={{ 'marginTop': '5px', 'height': '40px' }}
                                    value={this.state.filterSelect}
                                    onChange={(event) => {
                                        this.setState({
                                            filterSelect: event.target.value
                                        });
                                    }}>
                                    <option value={1}>Filter By Date</option>
                                    <option value={2}>Filter By Month</option>
                                </select>
                            </div>
                            <div className='col-md-2 datepicker-div'>
                                {this.state.filterSelect == 1 &&
                                    <DatePicker
                                        readOnly
                                        placeholderText="Select Date"
                                        selected={this.state.bill_date}
                                        onChange={this.handleChange}
                                    />
                                }
                                {this.state.filterSelect == 2 &&
                                    <select className="form-control"
                                        id="billMonth"
                                        name="billMonth"
                                        value={this.state.bill_month}
                                        onChange={(event) => {
                                            this.setState({
                                                bill_month: event.target.value
                                            })
                                        }}>
                                        {this.state.months.map((month, key) => {
                                            return <option key={key} value={month.value}>
                                                {month.name}</option>;
                                        })}
                                    </select>
                                }
                            </div>
                            <div className="col-md-3">
                                <button type="button" style={{ 'float': 'left', 'marginTop': '5px' }} className='btn btn-primary submit-btn booking-search' onClick={() => {
                                    this.searchBill();
                                }}>
                                    Search
                                </button>
                                <button type="button" style={{ 'float': 'left', 'marginTop': '5px' }} className='btn btn-default booking-search' onClick={() => {
                                    this.clearSearch();
                                }}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.isSearched &&
                    <div className="col-md-offset-2 col-md-9 pd-left-0 mr-top-25">
                        <div className="col-md-12 pd-left-0">
                            < ReactTable
                                minRows={0}
                                defaultPageSize={5}
                                noDataText="No Bills Found"
                                filterable={true}
                                pagination={true}
                                data={this.state.bookingList}
                                columns={columns} />
                        </div>
                    </div>
                }
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
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(SearchBill);