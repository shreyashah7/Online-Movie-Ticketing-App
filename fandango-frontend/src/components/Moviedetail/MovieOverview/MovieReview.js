import React, { Component} from 'react';
import './MovieOverview.css';
import Rating from 'react-rating';
import {Link} from 'react-router-dom';
import stargrey from './star-grey.png';
import staryellow from './staryellow.png';
import {connect} from "react-redux";
import * as API from './../../../api/apicall_for_users';
import {selectedReview} from "../../../actions";
import {bindActionCreators} from "redux";
import MovieHallsBox from '../../MovieDetailBox/MovieDetailBox';

class MovieReview extends Component {

    constructor(props){
        super(props);

        this.state={
            movie_id: this.props.movie.id.toString(),
            reviews: [],
            ratings: '',
            display: ''
        }
    }

    componentDidMount(){
        API.getRatings(this.state)
            .then((result) => {
                this.setState({
                    ratings: result.data.aggregates,
                    reviews: result.data.ratings,
                });

            })
    }

    updateReview = () => {
        window.location = "/moviedetailupdatereview";
    }


    renderLink(){
        var display = "yes";
        if (this.props.user === undefined || this.props.user === null) {
            display = "semi"
        }
        else if(this.props.user !== undefined && this.props.user !== null) {
            this.state.reviews.map((review) => {

                if (review.userId == this.props.user.userId) {
                    display = "no";
                }

            })
        }

        if(display == "no"){
            return (<div></div>)
        }
        else if(display == "semi") {
            return(
                <div className="submit-review">
                    <Link to="/login"> LOGIN HERE TO WRITE REVIEW!!</Link>
                </div>
            )
        }
        else{
            return(
                <div className="submit-review">
                    <Link to="/moviedetailaddreview">TELL US WHAT YOU THINK!!</Link>
                </div>
            )
        }
    }


    renderReviews(){
        if(this.props.user === undefined || this.props.user === null){
            return this.state.reviews.map((review) => {
                console.log(review);
                return (
                    <div className="review-tab">
                        <div className="star-review-pos">
                            <Rating
                                placeholderRating={review.rating}
                                emptySymbol={<img src={stargrey} className="icon"/>}
                                placeholderSymbol={<img src={staryellow} className="icon"/>}
                                fullSymbol={<img src={staryellow} className="icon"/>}
                            />

                        </div>
                        <div className="review-spacing">
                            <h4>{review.review_title}</h4>
                        </div>
                        <div className="reviewer-name">
                            <h5>Review By: {review.first_name}</h5>
                        </div>
                        <div className="review-body">
                            <h6>{review.review_body}
                            </h6>
                        </div>
                    </div>
                )
            })

        }

        else if(this.props.user !== undefined && this.props.user !== null)
        {
            return this.state.reviews.map((review) => {


                if (review.userId != this.props.user.userId) {
                    return (
                        <div className="review-tab">
                            <div className="star-review-pos">
                                <Rating
                                    placeholderRating={review.rating}
                                    emptySymbol={<img src={stargrey} className="icon"/>}
                                    placeholderSymbol={<img src={staryellow} className="icon"/>}
                                    fullSymbol={<img src={staryellow} className="icon"/>}
                                />

                            </div>
                            <div className="review-spacing">
                                <h4>{review.review_title}</h4>
                            </div>
                            <div className="reviewer-name">
                                <h5>Review By: {review.first_name}</h5>
                            </div>
                            <div className="review-body">
                                <h6>{review.review_body}
                                </h6>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className="review-tab">
                            <div className="star-review-pos">
                                <Rating
                                    placeholderRating={review.rating}
                                    emptySymbol={<img src={stargrey} className="icon"/>}
                                    placeholderSymbol={<img src={staryellow} className="icon"/>}
                                    fullSymbol={<img src={staryellow} className="icon"/>}
                                />

                            </div>
                            <div className="review-spacing">
                                <h4>{review.review_title}</h4>
                            </div>
                            <div className="reviewer-name">
                                <h5>Review By: {review.first_name}</h5>
                            </div>
                            <div className="review-body">
                                <h6>{review.review_body}
                                </h6>
                            </div>
                            <div style={{}}>
                                <button type="button" className="btn"
                                        style={{marginTop: "120px", marginLeft: '80%', backgroundColor: '#f15500'}}
                                        onClick={() => this.updateReview(this.props.selectedReview(review))}>EDIT
                                </button>
                            </div>
                        </div>
                    )
                }

            })
        }
    }




    render(){
        return(

            <div className="movie-overview-layout">
                <div className="movie-overview-layout-left">
                    <MovieHallsBox/>
                </div>

                <div className="view-review-box  col-md-5">
                    <div className="review-box-header">
                        <h3 className="review-header-font">FANS SAY</h3>
                        <div className="star-pos">
                            <Rating
                                placeholderRating={this.state.ratings.avgrating}
                                emptySymbol={<img src={stargrey} className="icon" />}
                                placeholderSymbol={<img src={staryellow} className="icon" />}
                                fullSymbol={<img src={staryellow} className="icon" />}
                            />
                        </div>
                        <h6 className="fans-rating"> {this.state.ratings.totalrating} Fan Ratings</h6>

                    </div>

                    {this.renderLink()}
                    {this.renderReviews()}


                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.loginUser,
        movie: state.selectedMovie,
        review: state.selectedReview
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectedReview: selectedReview}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(MovieReview);