import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import * as API from '../../api/API';
import '../MovieHall/moviehall.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import {Line} from "react-chartjs-2";
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';


class TraceDiagram extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            pages_list_data: [],
            user_id:"",
            header_user_id: "",
            user_email:""

        };
    }
    componentDidMount() {
        API.getUsers()
            .then((resultData) => {
                console.log("getUsers returned result is",resultData);

                if (!!resultData.data) {
                    this.setState({
                        userList: resultData.data,
                        user_email: resultData.data[0].email,
                        user_id: resultData.data[0].userId,
                    });
                } else {
                    console.log("No Users Available");
                }
            }).catch(error => {
            this.notify(error);
        });
    }

    searchUsers() {
        this.setState({ submitted: true });
        if (!!this.state.user_id) {
            this.setState({ isSearched: true,header_user_id: this.state.user_email});
            API.getTraceDiagram({ user_id: this.state.user_id })
                .then((resultData) => {
                    if (!!resultData.data) {
                        console.log("Data retrieved from API getTraceDiagram is",resultData.data);
                        const pages_data = resultData.data.pages;
                        let page_index = [];
                        let page_array = [];
                        pages_data.forEach((page_seq,index) => {
                            page_index.push(++index);
                            switch (page_seq){
                                case 'Log In':
                                    page_array.push(1);
                                    break;
                                case 'Home':
                                    page_array.push(2);
                                    break;
                                case 'User Dashboard':
                                    page_array.push(3);
                                    break;
                                case 'Account Preferences':
                                    page_array.push(4);
                                    break;
                                case 'Movie Listing':
                                    page_array.push(5);
                                    break;
                                case 'Movie Details':
                                    page_array.push(6);
                                    break;
                                case 'Cast & Crew':
                                    page_array.push(7);
                                    break;
                                case 'Movie Reviews':
                                    page_array.push(8);
                                    break;
                                case 'Update Review':
                                    page_array.push(9);
                                    break;
                                case 'Add Review':
                                    page_array.push(10);
                                    break;
                                case 'Shows Listing':
                                    page_array.push(11);
                                    break;
                                case 'Buy Tickets':
                                    page_array.push(12);
                                    break;
                                case 'Purchase History':
                                    page_array.push(13);
                                    break;
                                case 'Logout':
                                    page_array.push(14);
                                    break;
                            }
                        });
                        console.log(`${JSON.stringify(page_index)}`);
                        console.log(`${JSON.stringify(page_array)}`);
                        this.setState({
                            pages_list_data: {
                                labels: page_index,
                                datasets:[
                                    {
                                        label:`Trace Diagram for ${this.state.user_email}`,
                                        borderColor: "#80b6f4",
                                        data: page_array,
                                        fill:false
                                    }
                                ]
                            }
                        });
                    } else {
                        this.notify("No details of user navigation exists with the provided Email ID ");
                    }
                }).catch(error => {
                this.notify(error);
            });
        }
    }

    clearSearch() {
        this.setState({
            user_email: this.state.userList[0].email,
            user_id: this.state.userList[0].userId,
            header_user_id:"",
            pages_list_data: [],
            submitted: false,
            isSearched: false
        });
    }


    render() {

        return (
            <div className="admin-sub-header">
                <CommonHeader />
                <NavBar/>
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Trace Diagram For <span className="page-header-emphasis"> {(this.state.isSearched && this.state.header_user_id) ? this.state.header_user_id: ' User'}</span></h2>
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-8 preferences-view">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="filterSelect" className="col-sm-2 col-form-label booking-id-font pd-right-0">Search</label>
                            <div className={'col-sm-3 pd-left-0 pd-right-0 ' + (this.state.searched && !this.state.user_id ? ' has-error' : '')}>
                                <select className="form-control"
                                        id="filterSelect"
                                        name="filterSelect"
                                        required
                                        style={{ 'marginTop': '5px', 'height': '40px' }}
                                        value={this.state.user_id}
                                        onChange={(event) => {
                                            var xyz = event.nativeEvent.target.selectedIndex;
                                            this.setState({
                                                user_id: event.target.value,
                                                user_email: event.nativeEvent.target[xyz].text
                                            });
                                        }}>
                                    {this.state.userList.map((userObj, key) => {
                                        return <option key={key} value={userObj.userId}>{userObj.email}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="button" style={{ 'float': 'left', 'marginTop': '5px' }} className='btn btn-primary submit-btn booking-search' onClick={() => {
                                    this.searchUsers();
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
                <div className="col-md-offset-2 col-md-8 pd-left-0 mr-top-15">
                    <div className="col-md-12 pd-left-0">
                        <Line
                            data = {this.state.pages_list_data}
                            width={1000}
                            height = {400}
                            options={{
                                maintainAspectRatio:false,
                                legend: {
                                    position: 'bottom',
                                },
                                scales: {
                                    xAxes: [{
                                        display: true,
                                        scaleLabel: {
                                            display: true,
                                            labelString: `${this.state.user_email}'s Navigation Flow`,
                                            fontColor:'rgb(255,0,0)',
                                            fontStyle: "bold",
                                        },
                                        ticks: {
                                            /*autoSkip: true,*/
                                            stepSize: 1,
                                            min: 0,
                                            max: 100,
                                            autoRotation: -45
                                        },
                                        gridLines: {
                                            display: false,
                                            zeroLineColor: "transparent"
                                        }}],
                                    yAxes: [{
                                        display: true,
                                        afterFit: function(scale) {
                                            scale.width = 100,
                                            scale.height = 80
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Page Names',
                                            fontStyle: "bold",
                                            scaleFontcolor: "rgb(255,105,145)"
                                        },
                                        ticks: {
/*
                                            fontColor: "rgba(0,0,0,0.5)",
*/
                                            fontStyle: "bold",
                                            padding: 10,
                                            stepSize: 1,
                                            callback: function (label, index, labels) {
                                                switch (label) {
                                                    case 1:
                                                        return 'Log In';
                                                        break;
                                                    case 2:
                                                        return 'Home';
                                                        break;
                                                    case 3:
                                                        return 'User Dashboard';
                                                        break;
                                                    case 4:
                                                        return 'Account Preferences';
                                                        break;
                                                    case 5:
                                                        return 'Movie Listing';
                                                        break;
                                                    case 6:
                                                        return 'Movie Details';
                                                        break;
                                                    case 7:
                                                        return 'Cast & Crew';
                                                        break;
                                                    case 8:
                                                        return 'Movie Reviews';
                                                        break;
                                                    case 9:
                                                        return 'Update Review';
                                                        break;
                                                    case 10:
                                                        return 'Add Review';
                                                        break;
                                                    case 11:
                                                        return 'Shows Listing';
                                                        break;
                                                    case 12:
                                                        return 'Buy Tickets';
                                                        break;
                                                    case 13:
                                                        return 'Purchase History';
                                                        break;
                                                    case 14:
                                                        return 'Logout';
                                                        break;
                                                }
                                            }
                                        },
                                        gridLines: {
                                            display: false,
                                            zeroLineColor: "transparent"
                                        }
                                    }]
                                }
                            }}/>
                    </div>
                </div>
                }
            </div>
        )
    }
}


export default TraceDiagram;