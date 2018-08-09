import React, { Component} from 'react';
import './MovieTickets.css'
import HomeHeader from './../AfterLogin/HomeHeader'
import MovieDetailBox from '../MovieDetailBox/MovieDetailBox'
import MovieHallsBox from './MovieHallsBox/MovieHallsBox'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { log1, pageNames } from "../../App";
import Price_Filter from './PriceFilter/pricefilter';
import {selectedTrace} from '../../actions'
import {bindActionCreators} from "redux"


class Movie_Tickets extends Component{


    componentDidMount() {
        let pages = this.props.trace;
        pages.push("Shows Listing");
        if (this.props.user !== undefined && this.props.user.role == 3) {
            this.props.selectedTrace(pages)
        }
    }

    CustomDate(props){

        var d = new Date(props);

        var today = new Date(props);
        return d.setDate(today.getDate()-1);
    }

    componentWillMount() {
        document.body.style.backgroundColor = "#EBEBEB"
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = null;
    }

    constructor(props){
        super(props);
            this.state = {
                startDate: new Date(this.props.movie.release_date) > new Date() ? new Date(this.props.movie.release_date):new Date(),
                currentIndex: 0,
                monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                dayNames: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
                highlightedKey : 0,
                minPrice:null,
                maxPrice:null
            };

        this.handleLogs = this.handleLogs.bind(this);
    }


    handleLogs(){
        log1.info('{"event":"page_click","page_name":"Show Listing","count":"1"}');
    }

    handleDateClick(e){
        this.setState({
            ...this.state,
            highlightedKey: parseInt(e.target.attributes[0].nodeValue)
        })
    };

    SixDays(){
        const result = [];
        const date = new Date(this.state.startDate);
        let count = 4;

        for (let i=0;i<7;i++){
            

            if(i === this.state.highlightedKey){
                result.push(<li test={i} id={"datepickerLI_"+count} key={i} onClick={(e)=>{this.handleDateClick(e)}}>
                    <div test={i} style={{background: "rgb(51, 51, 51) none repeat scroll 0% 0% / auto padding-box border-box",color: "rgb(255, 255, 255)"}} id={"datepickerA_"+(count+1)}> <span test={i} style={{background: "rgb(241, 85, 0) none repeat scroll 0% 0% / auto padding-box border-box",color: "rgb(255, 255, 255)"}} id={"datepickerSPAN_"+(count+2)}>{this.state.dayNames[date.getDay()]}</span> <span test={i} style={{color: "rgb(255, 255, 255)"}} id={"datepickerSPAN_"+(count+3)}>{this.state.monthNames[date.getMonth()]}</span> <span test={i} style={{color: "rgb(255, 255, 255)"}} id={"datepickerSPAN_"+(count+4)}>{date.getDate()}</span></div>
                </li>);
            }else{
                result.push(<li test={i} id={"datepickerLI_"+count} key={i} onClick={(e)=>{this.handleDateClick(e)}}>
                    <div test={i} id={"datepickerA_"+(count+1)}> <span test={i} id={"datepickerSPAN_"+(count+2)}>{this.state.dayNames[date.getDay()]}</span> <span test={i} id={"datepickerSPAN_"+(count+3)}>{this.state.monthNames[date.getMonth()]}</span> <span test={i} id={"datepickerSPAN_"+(count+4)}>{date.getDate()}</span></div>
                </li>);
            }
            count = count + 5;
            date.setDate(date.getDate() + 1);
        }
        return result;
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    handlePriceFilter(minPrice,maxPrice){
        if(minPrice === "" || maxPrice === ""){
            minPrice = null;
            maxPrice = null;
        }
        this.setState({
            ...this.state,
            "minPrice":minPrice,
            "maxPrice":maxPrice
        })
    }

    render(){
        const MovieHallsDate = new Date();
        MovieHallsDate.setDate(this.state.startDate.getDate()+this.state.highlightedKey);

        return (
            <div onClick={this.handleLogs}>
                <HomeHeader/>
                {/*<div className="tickets-page">*/}





                <div id="TICKETS_SECTION_1">
                    <div id="TICKETS_DIV_2">
                        <div id="TICKETS_DIV_3">
                            <h1 id="H1_4">
                                {this.props.movie.movie_name}<span id="SPAN_5">times<span id="SPAN_6"></span></span>

                            </h1>
                            <ul id="UL_8">
                                <li id="LI_9">
                                    <Link to="/moviedetail" id="A_10">Overview</Link>
                                </li>
                                <li id="LI_11">
                                    <Link to="/movietickets" id="A_12">Movie Times + Tickets</Link>
                                </li>
                                <li id="LI_15">
                                    <Link to="/moviedetailreview" id="A_16">Movie Reviews</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="tickets-area-main">
                    <div className="tickets-area-main-div">
                        <div id="datepickerDIV_1">
                            <section id="datepickerSECTION_2">
                                <ul id="datepickerUL_3">
                                    {this.SixDays()}
                                </ul>
                                <button id="datepickerBUTTON_44">
                                    Previous
                                </button>
                                <button id="datepickerBUTTON_45">
                                    Next
                                </button>
                            </section>
                        </div>
                    </div>

                    {/*Filters code*/}
                    {/*<div className="page-header-container2">*/}
                        {/*<div className="row2">*/}
                            <div className="large-122 columns2">
                                <h4 className="page-header2">FILTER BY MOVIE PRICE</h4>
                            </div>
                        {/*</div>*/}
                    {/*</div>*/}
                    <Price_Filter onGo={(minPrice,maxPrice)=>this.handlePriceFilter(minPrice,maxPrice)}/>
                    {/*Filters code*/}
                    <div style={{display:"flex",width:"74.35%",height:"100%",paddingTop:"10px"}}>
                        <div className="msp__movie-details-container">
                            <MovieDetailBox/>
                        </div>
                        <div className="theaters">
                            <MovieHallsBox date={this.formatDate(MovieHallsDate)} minPrice={this.state.minPrice} maxPrice={this.state.maxPrice}/>
                        </div>
                    </div>

                </div>







                </div>
            // </div>
        )
    }
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

export default connect(mapStateToProps,matchDispatchToProps)(Movie_Tickets);
