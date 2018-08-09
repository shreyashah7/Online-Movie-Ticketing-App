import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import * as API from '../../api/API';
import './moviehall.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import SubHeader from './SubHeader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var dateFormat = require('dateformat');
var _ = require('lodash');

class CancelBooking extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            bookingId: '',
            bookingList: []
        };
    }

    cancelUserBooking() {
        API.cancelUserBooking(this.state.bookingId)
            .then((resultData) => {
                if (resultData !== undefined && resultData.data !== undefined && resultData.data !== null) {
                    this.notify(resultData.meta.message);
                    let index = this.state.bookingList.findIndex(bookingObj => bookingObj.bill_id == resultData.data.bill_id);
                    let bookingObj = this.state.bookingList[index];
                    bookingObj.status = 'C';
                    let tempBookingList = _.cloneDeep(this.state.bookingList);
                    tempBookingList.splice(index, 1, bookingObj);
                    this.setState({
                        bookingList: tempBookingList
                    });
                } else {
                    this.notify("There is some issue cancelling Booking.");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    searchUserBooking() {
        this.setState({ submitted: true });
        if (!!this.state.bookingId) {
            this.setState({ bookingList: [] });
            API.searchUserBooking({ bill_id: this.state.bookingId, hall_id: this.props.user.hall_id })
                .then((resultData) => {
                    if (resultData.data !== undefined && resultData.data.length > 0) {
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
            bookingId: '',
            bookingList: [],
            submitted: false
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
            Cell: props => (<span className="visual-sub-title" >{dateFormat(props.row._original.release_date, "dddd, mmmm dS, yyyy")}</span>)
        }, {
            Header: 'Customer Name',
            accessor: 'first_name',
            style: { 'textAlign': 'right' },
            Cell: props => (<span style={{ 'color': '#80808C' }}>{props.row._original.first_name + " " + props.row._original.last_name}</span>)
        }, {
            Header: 'Movie',
            accessor: 'movie_name',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Movie Hall',
            accessor: 'hall_name',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Price',
            accessor: 'total_price',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Action',
            accessor: 'total_price',
            style: { 'textAlign': 'right' },
            Cell: props => (<div>
                {props.row._original.status === 'A' &&
                    <button className="btn btn-link" onClick={() => {
                        this.cancelUserBooking(props.row._original.id);
                    }}><span className="fas fa-cancel cancel-icon-btn"></span> <b>Cancel</b></button>
                }
                {props.row._original.status === 'C' &&
                    <div style={{ 'color': '#ff7900' }}><span className="fas fa-cancel cancel-icon-btn"></span><b> Cancellled</b></div>
                }
            </div>)
        }]

        return (
            <div>
                <CommonHeader />
                <SubHeader />
                <ToastContainer />
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Cancel User<span className="page-header-emphasis"> BOOKINGS</span></h2>
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-8 preferences-view">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="searchBooking" className="col-sm-3 col-form-label booking-id-font">Enter Booking ID</label>
                            <div className={'col-sm-4 ' + (this.state.submitted && this.state.bookingId === undefined ? ' has-error' : '')}>
                                <input type="text" id="searchBooking" name="searchBooking"
                                    className="form-control booking-input"
                                    value={this.state.bookingId}
                                    onChange={(event) => {
                                        this.setState({
                                            bookingId: event.target.value
                                        })
                                    }} />
                                {this.state.submitted && this.state.bookingId === undefined &&
                                    <div className="help-block">Booking ID is required</div>
                                }
                            </div>
                            <div className="col-md-3">
                                <button type="button" className='btn btn-primary submit-btn booking-search' onClick={() => {
                                    this.searchUserBooking();
                                }}>
                                    Search
                                </button>
                                <button type="button" className='btn btn-default booking-search' onClick={() => {
                                    this.clearSearch();
                                }}>
                                    Clear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {this.state.bookingList !== undefined && this.state.bookingList.length > 0 &&
                    <div className="col-md-offset-2 col-md-9 pd-left-0 mr-top-25">
                        <div className="col-md-12 pd-left-0">
                            < ReactTable
                                minRows={0}
                                defaultPageSize={5}
                                noDataText="No Bookings Found"
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

export default connect(mapStateToProps, matchDispatchToProps)(CancelBooking);