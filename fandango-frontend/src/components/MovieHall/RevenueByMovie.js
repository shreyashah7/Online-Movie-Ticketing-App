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

class RevenueByMovie extends Component {

    notify = (message) => toast(message);

    constructor(props) {
        super(props);

        this.state = {
            revenueMovieList: []
        };
    }
    componentDidMount() {
        API.getRevenueByMovie({ hall_id: this.props.user.hall_id })
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        revenueMovieList: resultData.data
                    });
                } else {
                    console.log("No Movies Available");
                }
            }).catch(error => {
                this.notify(error);
            });
    }

    render() {
        const columns = [{
            Header: 'Poster',
            accessor: 'photos',
            width: 150,
            style: { 'whiteSpace': 'unset' },
            Cell: props => (<img className="visual-thumb revenue-img-size" alt="I Feel Pretty showtimes and tickets"
                src={props.row._original.photos} />)
        }, {
            Header: 'Movie Name',
            accessor: 'movie_name',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => (
                <span className="visual-sub-title dark"
                    style={{ 'display': 'block', 'margin': 'auto' }}>
                    {props.row._original.movie_name}</span>)
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
            <div>
                <CommonHeader />
                <SubHeader />
                <ToastContainer />
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Total Revenue List of <span className="page-header-emphasis"> MOVIES</span></h2>
                    </div>
                </div>
                <div className="col-md-offset-2 col-md-9 pd-left-0">
                    <div className="col-md-12 pd-left-0">
                        < ReactTable
                            minRows={0}
                            defaultPageSize={5}
                            noDataText="No Movies Found"
                            filterable={true}
                            pagination={true}
                            data={this.state.revenueMovieList}
                            columns={columns} />
                    </div>
                </div>
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


export default connect(mapStateToProps, matchDispatchToProps)(RevenueByMovie);