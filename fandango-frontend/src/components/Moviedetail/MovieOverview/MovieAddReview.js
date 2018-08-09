import React, { Component } from 'react';
import './MovieOverview.css';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import stargrey from './star-grey.png';
import staryellow from './staryellow.png';
import { connect } from "react-redux";
import * as API from './../../../api/apicall_for_users';
import MovieBox from './../../MovieDetailBox/MovieDetailBox'



class MovieAddReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            movie_id: this.props.movie.id.toString(),
            review_title: '',
            review_body: ''
        }
    }

    AddReview = (userdata) => {
        API.addRating(userdata)
            .then( (res) => {
                    window.location = "/moviedetailreview"
                }
            )
    }

    render() {
        return (

            <div className="movie-overview-layout">
                <div className="movie-overview-layout-left">
                    <MovieBox />
                </div>

                <div className="view-review-box  col-md-6">
                    <div className="addreview-header">
                        <h3 className="addreview-header-font">PLEASE RATE THE MOVIE FROM 1-5 STARS</h3>
                        <div className="addreview-header-star">
                            <Rating
                                placeholderValue={0}
                                emptySymbol={<img src={stargrey} className="icon" />}
                                placeholderSymbol={<img src={staryellow} className="icon" />}
                                fullSymbol={<img src={staryellow} className="icon" />}
                                onChange={(value) => {
                                    this.setState({
                                        rating: value
                                    })
                                }}
                            />
                        </div>
                    </div>

                    <div className="addreview-body">
                        <h3 className="addreview-header-font"> WRITE A REVIEW</h3>
                        <p className="addreview-title-font"> Title:</p>
                        <div className="addreview-body-input">
                            <input
                                type="text"
                                onChange={(event) => {
                                    this.setState({
                                        review_title: event.target.value,
                                        type: true
                                    });
                                }}
                            />

                        </div>
                        <p className="addreview-body-font">Body:</p>
                        <div className="addreview-textarea-input">
                            <textarea
                                type="text"
                                style={{ height: '200px' }}
                                onChange={(event) => {
                                    this.setState({
                                        review_body: event.target.value,
                                        type: true
                                    });
                                }}
                            />
                        </div>

                        <Link to="/moviedetailreview">
                            <button className="btn btn-danger cancel-button">CANCEL</button>
                        </Link>
                        <button className="btn btn-primary cancel-button" style={{ marginLeft: '10px' }}
                            onClick={() => this.AddReview(this.state)}>SAVE REVIEW
                            </button>

                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        movie: state.selectedMovie
    }
}


export default connect(mapStateToProps)(MovieAddReview);