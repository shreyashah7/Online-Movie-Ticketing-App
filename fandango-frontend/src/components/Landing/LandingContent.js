import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './landing.css';
import moviePicture from './default-image.jpg';
import slide1 from './slide1.jpg';
import slide2 from './slide2.jpg';
import slide3 from './slide3.jpg';
import * as API from '../../api/API';
import {bindActionCreators} from "redux";
import {selectedMovie} from "../../actions";
import {connect} from "react-redux";

class LandingContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            direction: null,
            topMovies: []
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        API.getLimitedMovies(12)
            .then((resultData) => {
                if (!!resultData.data) {
                    this.setState({
                        topMovies: resultData.data
                    });
                } else {
                    console.log("no movies in the database")
                }
            });
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }
    handleSubmit = () => {
        window.location=("/moviedetail");
    }


    render() {
        const firstSixNode =
            this.state.topMovies.map((movie, index) => {
                if (index <= 5) {
                    return <div key={index} className="col-md-2 float-left" > <img alt="Movie Poster" className="carousel-img" src={movie.photos !== null ? movie.photos : moviePicture} onClick={() => this.handleSubmit(this.props.selectedMovie(movie))} /></div >;
                } else {
                    return '';
                }
            });
        const afterSixNode =
            this.state.topMovies.map((movie, index) => {
                if (index > 5) {
                    return <div key={index} className="col-md-2 float-left" > <img alt="Movie Poster" className="carousel-img" src={movie.photos !== null ? movie.photos : moviePicture} /></div >;
                } else {
                    return '';
                }
            });
        return (
            <div>
                {this.state.topMovies !== undefined && this.state.topMovies.length > 0 &&
                    <div className="col-md-offset-1 col-md-10 mr-top-25 first-carousel">
                        <Carousel
                            activeIndex={this.state.index}
                            direction={this.state.direction}
                            onSelect={this.handleSelect}>
                            <Carousel.Item>
                                {firstSixNode}
                            </Carousel.Item>
                            <Carousel.Item>
                                {afterSixNode}
                            </Carousel.Item>
                        </Carousel>
                    </div>
                }
                <div className="col-md-offset-1 col-md-10 mr-top-50 mr-bottom-25">
                    <Carousel>
                        <Carousel.Item>
                            <img className="lg-carousel-img" alt="900x500" src={slide1} />
                            <Carousel.Caption>
                                <h3>Tribeca Film Festival Preview</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="lg-carousel-img" alt="900x500" src={slide2} />
                            <Carousel.Caption>
                                <h3>Get To know Amy Scummer</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="lg-carousel-img" alt="900x500" src={slide3} />
                            <Carousel.Caption>
                                <h3>Protect the world we love</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>

            </div >
        )
    }
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectedMovie: selectedMovie}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(LandingContent);