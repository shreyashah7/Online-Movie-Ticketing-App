import React, { Component} from 'react';
import HomeHeader from './../AfterLogin/HomeHeader'
import './movies.css'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {selectedMovie} from "../../actions";
import * as API from './../../api/apicall_for_users';
import {log1} from "../../App";
import {selectedTrace} from '../../actions'
import Rating from 'react-rating';
import stargrey from './../Moviedetail/MovieOverview/star-grey.png';
import staryellow from './../Moviedetail/MovieOverview/staryellow.png';


class AllMovies extends Component{

    constructor(props){
        super(props);

        this.state={
            filter: '',
            filterRating: -1,
            movies: [],
            movies_tofilter: [],
            showfiltertext: ""

        }
        this.handleLogs = this.handleLogs.bind(this);
        this.handleCaptureLessSeen = this.handleCaptureLessSeen.bind(this);
        this.filterMovies = this.filterMovies.bind(this);
        this.filterMoviesByRating = this.filterMoviesByRating.bind(this);
    }

    handleLogs(){
        log1.info('{"event":"page_click","page_name":"Movie Listing","count":"1"}');
    }

    componentDidMount(){

        let pages = this.props.trace;
        pages.push("Movie Listing");
        if (this.props.user !== undefined && this.props.user.role == 3) {
            this.props.selectedTrace(pages)
        }

        API.getMovies({})
            .then((result) => {
                this.setState({
                    movies: result.data,
                    movies_tofilter: result.data
                });
            });
    }


    filterMovies = (filter) => {
        let msg = '{"event":"section_click","section_name":"filter_genre","genre_name":"'+filter.toString()+'"}';
        log1.info(msg);
        this.setState({
            filter: filter,
            showfiltertext: "yes",
            movies_tofilter: this.state.movies.filter(movie => movie.genres.toLocaleLowerCase().includes(filter.toLowerCase()))
        })

        console.log(this.state.movies);
    }

    filterMoviesByRating = (filterRating) => {
        this.setState({
            filterRating: filterRating,
            showfiltertext: "no",
            movies_tofilter: this.state.movies.filter(movie =>
                movie.avgrating > filterRating &&  movie.avgrating <= (filterRating+1)
            )
        })
        console.log(this.state.movies_tofilter);

    }


    renderTitle(){
        if(this.state.showfiltertext == "no"){
            return(
            <div className="page-header-container">
                <div className="row">
                    <div className="large-12 columns">
                        <h2 className="page-header">SHOWING MOVIES WITH <span style={{ color: '#f15500'}}>"RATINGS IN BETWEEN {this.state.filterRating}-{this.state.filterRating+1}"</span></h2>
                    </div>
                </div>
            </div>

            )

        }
        else {
            if (this.state.filter == "") {
                return (
                    <div className="page-header-container">
                        <div className="row">
                            <div className="large-12 columns">
                                <h2 className="page-header">SHOWING ALL MOVIES</h2>
                            </div>
                        </div>
                    </div>

                )
            }

            else {
                return (
                    <div className="page-header-container">
                        <div className="row">
                            <div className="large-12 columns">
                                <h2 className="page-header">SHOWING <span
                                    style={{color: '#F15500'}}>"{this.state.filter}"</span> MOVIES</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        }


    handleCaptureLessSeen(){
/*
        log1.info('{"event":"page_click","page_name":"AllMovies","count":"1"}');
*/
        let msg = '{"event":"section_click","section_name":"movie_Listing"}';
        log1.info(msg);
    }

    renderMovies(){

            if(this.state.movies_tofilter.length == 0){
            return(<h3 className="col-md-offset-2 col-md-8" style={{ textAlign: 'left', marginTop: '20px'}}>
                NO MATCHING RESULTS
            </h3>)
            }
        return this.state.movies_tofilter.map((movie) => {
            console.log("1");
            return(
                <div className="col-md-offset-2 col-md-8 list-moviedetails" onClick={this.handleCaptureLessSeen}>
                    <div className="img-style">
                        <img src={movie.photos} className="img-peculiar"
                        alt={movie.movie_name + "Movie Poster"}/>
                        <div  style={{ height: '30px', paddingTop:'170px', marginLeft: '10px'}}>
                        <Rating className="img-peculiar" style={{ height: '30px', paddingTop:'170px'}}
                            placeholderRating={movie.avgrating}
                            emptySymbol={<img src={stargrey} className="icon"/>}
                            placeholderSymbol={<img src={staryellow} className="icon"/>}
                            fullSymbol={<img src={staryellow} className="icon"/>}
                        />
                        </div>
                    </div>
                    <div className="movie-heading">
                        <h4 className="movie-link" onClick={() => this.handleSubmit(this.props.selectedMovie(movie))}>{ movie.movie_name}</h4>
                    </div>
                    <div className="movie-extra-details">
                        <h5 className="gap">Release date: {movie.release_date}</h5>
                        <h5 className="gap">PG13 | {movie.movie_length} min</h5>
                        <h5 calss="gap">{movie.genres}</h5>
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
                        <button type="button" className="btn buy-tickets" onClick={() => this.handleBooking(this.props.selectedMovie(movie))}> BUY TICKETS</button>
                    </div>
                </div>
            )

        })
    }

    handleSubmit = () => {
        this.props.redirectURL("/moviedetail");
    };

    handleBooking = () => {
        this.props.redirectURL("/movietickets");
    };



    render(){
        return(
            <div onClick={this.handleLogs()}>
                <div className="site-wrap">
                    <HomeHeader/>

                    <div className="page-header-container">
                        <div className="row">
                            <div className="large-12 columns">
                                <h4 className="page-header">FILTERS</h4>
                            </div>
                        </div>
                    </div>

                    <div className="genre-list">
                        <ul>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("")}>ALL MOVIES</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("action")}>ACTION</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("drama")}>DRAMA</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("comedy")}>COMEDY</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("kids")}>KIDS</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("horror")}>HORROR</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("romance")}>ROMANCE</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("sci-fi")}>SCI-FI</button>
                            <button type="button" className="btn sub-genre" onClick={() => this.filterMovies("animated")}>ANIMATED</button>
                        </ul>
                    </div>


                    <div className="genre-list">
                        <ul>
                            <button type="button" className="btn sub-genre-bot" onClick={() => this.filterMoviesByRating(0)}>RATINGS (0-1)</button>
                            <button type="button" className="btn sub-genre-bot" onClick={() => this.filterMoviesByRating(1)}>RATINGS (1-2)</button>
                            <button type="button" className="btn sub-genre-bot" onClick={() => this.filterMoviesByRating(2)}>RATINGS (2-3)</button>
                            <button type="button" className="btn sub-genre-bot" onClick={() => this.filterMoviesByRating(3)}>RATINGS (3-4)</button>
                            <button type="button" className="btn sub-genre-bot" onClick={() => this.filterMoviesByRating(4)}>RATINGS (4-5)</button>

                        </ul>
                    </div>


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

function mapStateToProps(state){
    return{
        movie: state.selectedMovie,
        trace: state.selectedTrace
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectedMovie: selectedMovie,selectedTrace: selectedTrace}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(AllMovies);