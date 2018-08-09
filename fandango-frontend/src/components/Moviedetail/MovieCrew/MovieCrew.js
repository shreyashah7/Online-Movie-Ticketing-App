import React, { Component} from 'react';
import './MovieCrew.css'
import Rating from 'react-rating';
import stargrey from './../MovieOverview/star-grey.png'
import staryellow from './../MovieOverview/staryellow.png'
import {connect} from "react-redux";
import MovieBox from "./../../MovieDetailBox/MovieDetailBox"

class MovieCrew extends Component {

    renderCast(){
        var i=0;
        var arr = this.props.movie.cast;
        var cast = arr.split(", ");
        var result = [];

        for(i=0;i<cast.length;i++){
            result.push(<h5 key={i} className="crew-font">{cast[i]}</h5>)
        }
        return result;
    }


    render(){
        return(
            <div className="movie-overview-layout" style={{ height: '100%'}}>
                <div className="movie-overview-layout-left">
                    <MovieBox />
                </div>

                <div className="crew-info col-md-offset-1 col-md-4" >
                    <h4 className="crew-font"> CREW DETAILS</h4>
                    {this.renderCast()}

                </div>


            </div>
        );

    }
}

function mapStateToProps(state){
return{
    movie: state.selectedMovie
    }
}


export default connect(mapStateToProps)(MovieCrew);