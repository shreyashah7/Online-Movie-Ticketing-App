import React, { Component} from 'react';
import HomeHeader from './../AfterLogin/HomeHeader'
import './moviedetail.css'
import MovieUpdateReview from "./MovieOverview/MovieUpdateReview";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import { log1, pageNames } from "../../App";
import {selectedTrace} from '../../actions'
import {bindActionCreators} from "redux";

class Movie_detail_updatereview extends Component {

    constructor(props){
        super(props);
        this.handleLogs = this.handleLogs.bind(this);
    }

    handleLogs(){
        log1.info('{"event":"page_click","page_name":"Update Review","count":"1"}');
    }

    componentDidMount() {
        let pages = this.props.trace;
        pages.push("Update Review");
        if (this.props.user !== undefined && this.props.user.role == 3) {
            this.props.selectedTrace(pages)
        }
    }

    render(){
        let background = "//images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/207628/fmc_mc_Rampage.jpg";
        if(this.props.movie.photos)background =  this.props.movie.photos;

        return(
            <div onClick={this.handleLogs}>
                <HomeHeader/>
                <div className="movie-detail-main">
                    <div className="movie-detail-mop">
                        <div className="movie-detail-background">
                            <svg width="100%" height="100%">
                                <defs>
                                    <filter id="backgroundBlur" width="150%" height="150%" x="-25%" y="-25%"
                                            color-interpolation-filters="sRGB">
                                        <feGaussianBlur stdDeviation="7"></feGaussianBlur>
                                        <feColorMatrix type="matrix"
                                                       values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0 0 0 0 10 0"></feColorMatrix>
                                        <feComposite in2="SourceGraphic" operator="in"></feComposite>
                                    </filter>
                                </defs>
                                <image className="js-backgroundBlur-image" x="0" y="0" width="100%" height="110%"
                                       xlinkHref={background}
                                       preserveAspectRatio="xMidYMid slice" filter="url(#backgroundBlur)"></image>
                            </svg>
                        </div>
                        <div className="movie-detail-background-next">
                            <section className="movie-detail-subnav">
                                <div className="movie-detail-section-row">
                                    <div className="movie-detail-section-row-100">
                                        <h1 className="movie-detail-section-row-title">



                                            {this.props.movie.movie_name} <span style={{ color: "#F15500"}}> REVIEW + RATINGS</span>





                                        </h1>
                                        <ul className="movie-detail-section-subnav">
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to="/moviedetail" className="movie-detail-section-subnav-item-link">
                                                    Overview
                                                </Link>
                                            </li>
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to={"/movietickets"} className="movie-detail-section-subnav-item-link">
                                                    Movie Times + tickets
                                                </Link>
                                            </li>
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to="moviedetailreview" className="movie-detail-section-subnav-item-link">
                                                    REVIEWS
                                                </Link>
                                            </li>
                                            <li className="movie-detail-section-subnav-item">
                                                <Link to="/moviedetailcrew" className="movie-detail-section-subnav-item-link">
                                                    CAST
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            <MovieUpdateReview/>

                        </div>
                    </div>
                </div>
            </div>);
    };
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie,
        user: state.loginUser,
        trace: state.selectedTrace
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectedTrace: selectedTrace}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(Movie_detail_updatereview);