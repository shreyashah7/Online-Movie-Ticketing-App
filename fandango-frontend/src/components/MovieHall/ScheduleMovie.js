import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import SubHeader from './SubHeader';
import './moviehall.css';
import * as API from '../../api/API';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
var dateFormat = require('dateformat');

class ScheduleMovie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movieList: []
        };
    }

    componentDidMount() {
        API.getMovies()
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        movieList: resultData.data
                    });
                } else {
                    console.log("There are no movies in DB");
                }
            });
    }

    render() {
        const columns = [{
            Header: 'Poster',
            accessor: 'photos',
            width: 150,
            style: { 'whiteSpace': 'unset' },
            Cell: props => (<img className="visual-thumb img-size" alt="I Feel Pretty showtimes and tickets"
                src={props.row._original.photos}/>)
        }, {
            Header: 'Movie Name',
            accessor: 'movie_name',
            style: { 'whiteSpace': 'unset', 'fontSize': '20px' },
            Cell: props => (<Link to={'/schedulemovie/' + props.row._original.id}>
                <button
                    className="btn-link visual-sub-title dark"
                    type="button"
                    style={{ 'display': 'block', 'margin': 'auto', 'lineHeight': "100px" }}
                >{props.row._original.movie_name}
                </button>
            </Link>)
        }, {
            Header: 'Release Date',
            accessor: 'release_date',
            style: { 'textAlign': 'right', 'fontSize': '20px' },
            Cell: props => (<span className="visual-sub-title" style={{ 'lineHeight': "100px" }}>Releases {dateFormat(props.row._original.release_date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>)
        }]
        return (
            <div>
                <CommonHeader />
                <SubHeader />
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">SCHEDULE UPCOMING <span className="page-header-emphasis">MOVIES</span></h2>
                    </div>
                </div>
                <div className="col-md-12 movie-ls-group pd-left-0">
                    <div className="col-md-offset-2 col-md-9 pd-left-0">
                        < ReactTable
                            minRows={0}
                            noDataText="No Movies Found"
                            defaultPageSize={5}
                            filterable={true}
                            data={this.state.movieList}
                            columns={columns} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ScheduleMovie;