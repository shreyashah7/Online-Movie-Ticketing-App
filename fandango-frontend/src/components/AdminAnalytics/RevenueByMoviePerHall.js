import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import * as API from '../../api/API';
import '../MovieHall/moviehall.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../Admin/Navigation';

class RevenueByMoviePerHall extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
            revenueList: []
        };
    }
    componentDidMount() {
        API.getMovies()
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        movieList: resultData.data,
                        movie_id: resultData.data[0].id
                    });
                } else {
                    console.log("No Movies Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    searchRevenues() {
        this.setState({ submitted: true });
        if (!!this.state.movie_id) {
            this.setState({ isSearched: true });
            API.getRevenueByMoviePerHall({ movie_id: this.state.movie_id })
                .then((resultData) => {
                    if (!!resultData.data) {
                        this.setState({
                            revenueList: resultData.data,
                            submitted: false
                        });
                    } else {
                        this.notify("No Revenue found for given movie ID");
                    }
                }).catch(error => {
                    this.notify(error);
                });
        }
    }

    clearSearch() {
        this.setState({
            movie_id: this.state.movieList[0].id,
            revenueList: [],
            submitted: false,
            isSearched: false
        });
    }


    render() {
        const columns = [{
            Header: 'Movie Hall Name',
            accessor: 'hall_name',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => (
                <span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.hall_name}</span>)
        }, {
            Header: 'Total Revenue',
            accessor: 'total_revenue',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => (
                <span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.total_revenue}</span>)
        }]

        return (
            <div className="admin-sub-header">
                <CommonHeader />
                <NavBar/>
                <ToastContainer />
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Revenues For <span className="page-header-emphasis"> Movies</span></h2>
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-8 preferences-view">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="filterSelect" className="col-sm-2 col-form-label booking-id-font pd-right-0">Search</label>
                            <div className={'col-sm-3 pd-left-0 pd-right-0 ' + (this.state.submitted && !this.state.movie_id ? ' has-error' : '')}>
                                <select className="form-control"
                                    id="filterSelect"
                                    name="filterSelect"
                                    required
                                    style={{ 'marginTop': '5px', 'height': '40px' }}
                                    value={this.state.movie_id}
                                    onChange={(event) => {
                                        this.setState({
                                            movie_id: event.target.value
                                        });
                                    }}>
                                    {this.state.movieList.map((movieObj, key) => {
                                        return <option key={key} value={movieObj.id}>{movieObj.movie_name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="button" style={{ 'float': 'left', 'marginTop': '5px' }} className='btn btn-primary submit-btn booking-search' onClick={() => {
                                    this.searchRevenues();
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
                                noDataText="No Revenue Found for any halls"
                                filterable={true}
                                pagination={true}
                                data={this.state.revenueList}
                                columns={columns} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default RevenueByMoviePerHall;