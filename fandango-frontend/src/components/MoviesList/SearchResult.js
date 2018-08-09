import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './../AfterLogin/HomeHeader'
import './movies.css'
import * as API from './../../api/apicall_for_users';
import { bindActionCreators } from "redux";
import { selectedMovie } from "../../actions";
import { log1, pageNames } from "../../App";

class SearchResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            movies_tofilter: []

        }
    }

    componentDidMount() {
        if (this.props.user !== undefined) {
            pageNames.push("Search Movie");
        }
        API.getMovies({})
            .then((result) => {
                this.setState({
                    movies: result.data,
                });
            });
    }




    renderTitle() {
        return (
            <div className="page-header-container">
                <div className="row">
                    <div className="large-12 columns">
                        <h2 className="page-header">SHOWING RESULTS FOR <span style={{ color: "#F15500" }}>"{this.props.criteria.criteria}"</span></h2>
                    </div>
                </div>
            </div>

        )
    }

    handleSubmit = () => {
        this.props.redirectURL("/moviedetail");
    }


    renderMovies() {
        return this.state.movies.map((movie) => {
            var display = '';
            if (movie.movie_name.toLocaleLowerCase().includes(this.props.criteria.criteria.toLowerCase())) {
                display = "yes";
            }

            if (display == "yes") {

                return (
                    <div className="col-md-offset-2 col-md-8 list-moviedetails">
                        <div className="img-style">
                            <img src={movie.photos} className="img-peculiar" />
                        </div>
                        <div className="movie-heading">
                            <h4 className="movie-link" onClick={() => this.handleSubmit(this.props.selectedMovie(movie))}>{movie.movie_name}</h4>
                        </div>
                        <div className="movie-extra-details">
                            <h5 className="gap">Release date: {movie.release_date}</h5>
                            <h5 className="gap">PG13 | {movie.movie_length} min</h5>
                            <h5 className="gap">{movie.genres}</h5>
                        </div>
                        <div className="cast">
                            <h5>
                                Cast + Crew: {movie.cast}
                            </h5>
                        </div>
                        <div className="see-it-in">
                            <h5>
                                See It in: {movie.see_it_in}
                            </h5>
                        </div>
                        <div className="book-now">
                            <button type="button" className="btn buy-tickets"> BUY TICKETS</button>
                        </div>
                    </div>
                )
            }

        })

    }


    render() {
        return (
            <div>
                <div className="site-wrap">
                    <HomeHeader />


                    {this.renderTitle()}

                    <div className="col-md-offset-2 col-md-8 list-header">
                        <h3 className="list-font">MOVIES</h3>
                    </div>

                    {this.renderMovies()}

                </div>



            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        criteria: state.searchCriteria,
        movie: state.selectedMovie
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectedMovie: selectedMovie }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(SearchResult);