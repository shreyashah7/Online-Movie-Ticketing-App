import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './moviehall.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-bootstrap-time-picker';
import * as API from '../../api/API';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import SubHeader from './SubHeader';
var Modal = require('react-bootstrap-modal');

class ScheduleMovieTimeOverview extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id: 0,
            show_date: null,
            show_time: null,
            price: '',
            hall_id: 0,
            screen_id: 0,
            hallList: [],
            screenList: [],
            movieSchedules: [],
            submitted: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleHallChange = this.handleHallChange.bind(this);
    }

    componentDidMount() {
        console.log("this.props.user :", this.props.user);
        this.getMovieSchedulesByMovie();
        API.getHalls({ id: this.props.user.hall_id })
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        hallList: resultData.data
                    });
                    if (this.state.hallList.length > 0) {
                        this.setState({
                            hall_id: this.state.hallList[0].id
                        })
                        this.getScreensByHall(this.state.hallList[0].id);
                    }
                } else {
                    console.log("No Hall Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    handleClick() {
        this.setState({ open: true });
    }
    handleTimeChange(time) {
        console.log(time);     // <- prints "3600" if "01:00" is picked
        this.setState({
            show_time: time
        });
    }

    handleChange(date) {
        this.setState({
            show_date: date
        });
    }

    handleHallChange(hallId) {
        this.getScreensByHall(hallId);
    }

    editMovieSchedule(movieScheduleObj) {
        this.setState({
            id: movieScheduleObj.id,
            hall_id: movieScheduleObj.hall_id,
            screen_id: movieScheduleObj.screen_id,
            show_date: moment(movieScheduleObj.show_date),
            show_time: movieScheduleObj.show_time,
            price: movieScheduleObj.price
        });
        this.handleClick();
    }

    getMovieSchedulesByMovie() {
        API.getMovieSchedules({ movie_id: this.props.match.params.movieId, hall_id: this.props.user.hall_id })
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        movieSchedules: resultData.data
                    });
                } else {
                    this.notify("No Movie Schedules Configured");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    getScreensByHall(hallId) {
        API.getScreensByHall({ hallId: hallId })
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        screenList: resultData.data
                    });
                    if (this.state.screenList.length > 0) {
                        this.setState({
                            screen_id: this.state.screenList[0].id
                        })
                    }
                } else {
                    this.notify("No Screens available for this Movie hall");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    deleteMovieSchedule(movieScheduleId) {
        API.deleteMovieSchedule(movieScheduleId)
            .then((resultData) => {
                this.notify(resultData.meta.message);
                this.getMovieSchedulesByMovie();
            }).catch(error => {
                this.notify(error);
            });

    }

    render() {
        const columns = [{
            Header: 'Movie Hall',
            accessor: 'hall_name',
            style: { 'whiteSpace': 'unset' }
        }, {
            Header: 'Screen',
            accessor: 'screen_num',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Show Date',
            accessor: 'show_date',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Show Time',
            accessor: 'show_time',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Price',
            accessor: 'price',
            style: { 'textAlign': 'right' }
        }, {
            Header: 'Edit',
            accessor: 'price',
            style: { 'textAlign': 'right' },
            Cell: props => (<div><button className="btn btn-link" onClick={() => {
                this.editMovieSchedule(props.row._original);
            }}><span className="fas fa-edit edit-icon-btn"></span></button><button className="btn btn-link" onClick={() => {
                this.deleteMovieSchedule(props.row._original.id);
            }}><span className="fas fa-trash delete-icon-btn"></span></button></div>)
        }]

        let closeModal = () => {
            clearForm();
        }

        let clearForm = () => {
            if (this.state.screenList.length > 0) {
                this.setState({
                    screen_id: this.state.screenList[0].id
                })
            }
            if (this.state.hallList.length > 0) {
                this.setState({
                    hall_id: this.state.hallList[0].id
                })
            }
            this.setState({
                id: 0,
                show_date: null,
                show_time: null,
                price: '',
                submitted: false,
                open: false
            })
        }

        let saveAndClose = () => {
            this.setState({ submitted: true });
            if (this.state.hall_id && this.state.screen_id && this.state.show_date && this.state.show_time && this.state.price) {
                let movieScheduleObj = {
                    movie_id: this.props.match.params.movieId,
                    hall_id: this.state.hall_id,
                    screen_id: this.state.screen_id,
                    show_date: this.state.show_date.format(),
                    show_time: moment.utc(this.state.show_time * 1000).format('HH:mm:ss'),
                    price: this.state.price
                }
                if (this.state.id !== 0) {
                    movieScheduleObj.id = this.state.id
                }
                API.addMovieSchedule(movieScheduleObj).then((resultData) => {
                    console.log("resultData.data :", resultData.data);
                    if (resultData.data !== undefined && resultData.data !== null && !_.isEmpty(resultData.data)) {
                        clearForm();
                        this.notify(resultData.meta.message);
                        this.getMovieSchedulesByMovie();
                    } else {
                        this.notify(resultData.meta.message);
                    }
                }).catch(error => {
                    this.notify(error);
                });
            }
        }
        return (
            <div>
                <ToastContainer />
                <CommonHeader />
                <SubHeader />
                <div className=" col-md-12 page-header-container clearfix">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">MOVIES <span className="page-header-emphasis">SCHEDULES</span></h2>
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-9 pd-left-0">
                    <div className="col-md-12">
                        <button type='button' className="btn btn-primary submit-btn fl-right"
                            onClick={this.handleClick}>Add New Movie Schedule</button>
                    </div>
                    <div className="col-md-12 pd-left-0">
                        < ReactTable
                            minRows={0}
                            noDataText="No Movies Found"
                            filterable={true}
                            pagination={true}
                            defaultPageSize={5}
                            data={this.state.movieSchedules}
                            columns={columns} />
                    </div>
                </div>
                <Modal
                    show={this.state.open}
                    onHide={closeModal}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Schedule Time</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="movieHall"
                                        className="col-sm-3 col-form-label label-color">Movie Hall</label>
                                    <div className={'col-sm-9 ' + (this.state.submitted && !this.state.hall_id ? ' has-error' : '')}>
                                        <select className="form-control"
                                            id="movieHall"
                                            name="movieHall"
                                            required
                                            value={this.state.hall_id}
                                            onChange={(event) => {
                                                this.setState({
                                                    hall_id: event.target.value
                                                });
                                                this.handleHallChange(event.target.value)
                                            }}>
                                            {this.state.hallList.map((hallObj, key) => {
                                                return <option key={key} value={hallObj.id}>{hallObj.hall_name}</option>;
                                            })}
                                        </select>
                                        {this.state.submitted && !this.state.hall_id &&
                                            <div className="help-block">Movie Hall is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="screen" className="col-sm-3 col-form-label label-color">Screen</label>
                                    <div className={'col-sm-9 ' + (this.state.submitted && !this.state.screen_id ? ' has-error' : '')}>
                                        <select className="form-control"
                                            id="screen"
                                            name="screen"
                                            value={this.state.screen_id}
                                            onChange={(event) => {
                                                this.setState({
                                                    screen_id: event.target.value
                                                })
                                            }}>
                                            {this.state.screenList.map((screenObj, key) => {
                                                return <option key={key} value={screenObj.id}>
                                                    {'Screen - ' + screenObj.screen_num}</option>;
                                            })}
                                        </select>
                                        {this.state.submitted && !this.state.screen_id &&
                                            <div className="help-block">Screen is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label label-color">Show Date</label>
                                    <div className={'col-sm-9 ' + (this.state.submitted && !this.state.show_date ? ' has-error' : '')}>
                                        <DatePicker
                                            minDate={moment().add(1, 'days')}
                                            selected={this.state.show_date}
                                            onChange={this.handleChange}
                                        />
                                        {this.state.submitted && !this.state.show_date &&
                                            <div className="help-block">Show Date is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label label-color">Show Time</label>
                                    <div className={'col-sm-9' + (this.state.submitted && !this.state.show_time ? ' has-error' : '')}>
                                        <TimePicker start="10:00" end="22:00"
                                            step={30}
                                            onChange={this.handleTimeChange} value={this.state.show_time} />
                                        {this.state.submitted && !this.state.show_time &&
                                            <div className="help-block">Show Time is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="price" className="col-sm-3 col-form-label label-color">Price</label>
                                    <div className={'col-sm-9 ' + (this.state.submitted && !this.state.price ? ' has-error' : '')}>
                                        <input type="number" id="price" name="price" className="form-control"
                                            value={this.state.price}
                                            onChange={(event) => {
                                                this.setState({
                                                    price: event.target.value
                                                })
                                            }} />
                                        {this.state.submitted && !this.state.price &&
                                            <div className="help-block">Price is required</div>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-default' onClick={closeModal}>
                            Cancel
                        </button>
                        <button className='btn btn-primary submit-btn' onClick={saveAndClose}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log("state:", state);
    return {
        user: state.loginUser
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(ScheduleMovieTimeOverview);