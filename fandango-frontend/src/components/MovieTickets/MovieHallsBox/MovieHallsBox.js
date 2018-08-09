import React, { Component } from 'react';
import {doneBooking, loginUser, selectedSchedule} from "../../../actions";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './MovieHallsBox.css'
import * as API from "../../../api/apicall_for_users";

class Movie_Halls extends Component{

    handleShowTime = (userdata) => {
        window.location = '/entertickets';
    }

    componentDidMount(){
        API.getmovieschedulebydate({
            "show_date":this.props.date,
            "movie_id":this.props.movie.id
        })
            .then((result) => {
                this.setState({
                    date:this.props.date,
                    schedule:result
                });
            });
    }

    componentDidUpdate(){
        if(this.state){
            if(this.state.date != this.props.date){
                API.getmovieschedulebydate({
                    "show_date":this.props.date,
                    "movie_id":this.props.movie.id
                })
                    .then((result) => {
                        this.setState({
                            date:this.props.date,
                            schedule:result
                        });
                    });
            }
        }
    }

    tConvert (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice (1);
            time[5] = +time[0] < 12 ? 'a' : 'p';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join ('');
    }


    renderMovieHalls(schedules){
        const halldivs = [];

        for(let i=0;i<schedules.length;i++){
            const schedule_ids = schedules[i].id.split(',');
            const show_time = schedules[i].show_time.split(',');
            const price = schedules[i].price.split(',');
            const available_seats = schedules[i].available_seats.split(',');
            const availableshowtimes = [];
            let show_status = "movehallsLI_41";
            let show_status2 = "movehallsSPAN_28";

            for(let k=0;k<show_time.length;k++){

                if(available_seats[k] <=0 ){
                    show_status = "movehallsLI_27";
                    show_status2 = "movehallsSPAN_28";
                }else{
                    show_status = "movehallsLI_41";
                    show_status2 = "movehallsA_42";
                }
                if(this.props.minPrice!==null && this.props.maxPrice!==null){
                    if(price[k] >= this.props.minPrice && price[k] <= this.props.maxPrice){
                        availableshowtimes.push(<li key={k} id={show_status}><button onClick={() => this.handleShowTime(this.props.selectedSchedule(schedule_ids[k], price[k],available_seats[k] ))} id={show_status2}>{this.tConvert(show_time[k].substring(0,show_time[k].length-3))}</button></li>);
                    }
                }else{
                    availableshowtimes.push(<li key={k} id={show_status}><button onClick={() => this.handleShowTime(this.props.selectedSchedule(schedule_ids[k], price[k], available_seats[k]))} id={show_status2}>{this.tConvert(show_time[k].substring(0,show_time[k].length-3))}</button></li>);
                }

            }
            if(availableshowtimes.length >0){
                halldivs.push(<div key={i}>
                    <div id="movehallsDIV_1">
                        <div id="movehallsDIV_2">
                            <div id="movehallsDIV_3">
                                <span id="movehallsSPAN_4">Mobile Tickets</span>
                            </div>
                            <div id="movehallsDIV_5">
                                <h3 id="movehallsH3_6">
                                    <a id="movehallsA_7">{schedules[i].hall_name}</a>
                                    <button id="movehallsBUTTON_8">
                                    </button>
                                </h3>
                            </div>
                            <div id="movehallsDIV_9">
                                <span id="movehallsSPAN_10">{schedules[i].street} </span> <span id="movehallsSPAN_11">{schedules[i].city} {schedules[i].state} {schedules[i].zipcode}</span>
                            </div>
                            {/*<div id="movehallsDIV_12">*/}
                            {/*<a href="//www.fandango.com/maps/DrivingDirections.aspx?tid=AAFQQ" rel="nofollow" id="movehallsA_13">MAP</a><a href="#"></a>*/}
                            {/*<li>*/}
                            {/*Stadium Seating*/}
                            {/*</li>Digital ProjectionListening DevicesMobile TicketsParty RoomReserved SeatingWheelchair Accessible" id="movehallsA_14">AMENITIES*/}
                            {/*</div>*/}
                        </div>
                        <ul id="movehallsUL_15">
                            <li id="movehallsLI_16">
                                <h4 id="movehallsH3_17">
                                    <span id="movehallsSPAN_18"></span> Select a movie time to buy Standard Showtimes
                                </h4>
                                {/*<ul id="movehallsUL_19">*/}
                                {/*<li id="movehallsLI_20">*/}
                                {/*<a href="#" id="movehallsA_21">Accessibility devices available</a>*/}
                                {/*</li>*/}
                                {/*<li id="movehallsLI_22">*/}
                                {/*<a href="#" id="movehallsA_23">Reserved seating</a>*/}
                                {/*</li>*/}
                                {/*<li id="movehallsLI_24">*/}
                                {/*<a href="#" id="movehallsA_25">No passes</a>*/}
                                {/*</li>*/}
                                {/*</ul>*/}
                                <ol id="movehallsOL_26">
                                    {availableshowtimes}
                                    {/*<li id="movehallsLI_27">*/}
                                    {/*<span id="movehallsSPAN_28">10:15a</span>*/}
                                    {/*</li>*/}

                                    {/*<li id="movehallsLI_29">*/}
                                    {/*<span id="movehallsSPAN_30">11:30a</span>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_31">*/}
                                    {/*<span id="movehallsSPAN_32">12:45p</span>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_33">*/}
                                    {/*<span id="movehallsSPAN_34">1:45p</span>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_35">*/}
                                    {/*<span id="movehallsSPAN_36">1:45p</span>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_37">*/}
                                    {/*<span id="movehallsSPAN_38">3:15p</span>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_39">*/}
                                    {/*<span id="movehallsSPAN_40">4:30p</span>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_41">*/}
                                    {/*<a href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=217594030&amp;tid=AAFQQ&amp;sdate=2018-04-27+19:00&amp;mid=199925&amp;from=mov_det_showtimes" id="movehallsA_42">7:00p</a>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_43">*/}
                                    {/*<a href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=222359554&amp;tid=AAFQQ&amp;sdate=2018-04-27+20:15&amp;mid=199925&amp;from=mov_det_showtimes" id="movehallsA_44">8:15p</a>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_45">*/}
                                    {/*<a href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=222359555&amp;tid=AAFQQ&amp;sdate=2018-04-27+21:15&amp;mid=199925&amp;from=mov_det_showtimes" id="movehallsA_46">9:15p</a>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_47">*/}
                                    {/*<a href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=222946115&amp;tid=AAFQQ&amp;sdate=2018-04-27+21:15&amp;mid=199925&amp;from=mov_det_showtimes" id="movehallsA_48">9:15p</a>*/}
                                    {/*</li>*/}
                                    {/*<li id="movehallsLI_49">*/}
                                    {/*<a href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=217594029&amp;tid=AAFQQ&amp;sdate=2018-04-27+22:30&amp;mid=199925&amp;from=mov_det_showtimes" id="movehallsA_50">10:30p</a>*/}
                                    {/*</li>*/}
                                </ol>
                            </li>
                            {/*<li id="movehallsLI_51">*/}
                            {/*<ul id="movehallsUL_52">*/}
                            {/*<li id="movehallsLI_53">*/}
                            {/*<a href="#" id="movehallsA_54">Closed caption</a>*/}
                            {/*</li>*/}
                            {/*<li id="movehallsLI_55">*/}
                            {/*<a href="#" id="movehallsA_56">Accessibility devices available</a>*/}
                            {/*</li>*/}
                            {/*<li id="movehallsLI_57">*/}
                            {/*<a href="#" id="movehallsA_58">Reserved seating</a>*/}
                            {/*</li>*/}
                            {/*<li id="movehallsLI_59">*/}
                            {/*<a href="#" id="movehallsA_60">No passes</a>*/}
                            {/*</li>*/}
                            {/*</ul>*/}
                            {/*<ol id="movehallsOL_61">*/}
                            {/*<li id="movehallsLI_62">*/}
                            {/*<span id="movehallsSPAN_63">5:30p</span>*/}
                            {/*</li>*/}
                            {/*<li id="movehallsLI_64">*/}
                            {/*<a href="https://tickets.fandango.com/Transaction/Ticketing/ticketboxoffice.aspx?row_count=222946114&amp;tid=AAFQQ&amp;sdate=2018-04-27+17:30&amp;mid=199925&amp;from=mov_det_showtimes" id="movehallsA_65">5:30p</a>*/}
                            {/*</li>*/}
                            {/*</ol>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>)
            }
        }

        return halldivs;
    }

    render(){
        if(this.state){
            if(this.state.date != this.props.date){
                console.log("loading");

                return <div>Loading...</div>
            }
            if(this.state.schedule.data.length === 0){
                return <div>No Schedules available for {this.props.date}</div>
            }
        }
        if(!this.state){
            console.log("loading");
            return <div>Loading...</div>
        }

        return this.renderMovieHalls(this.state.schedule.data)
    }
}

function mapStateToProps(state){
    return{
        movie: state.selectedMovie,
        schedule: state.selectedSchedule
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectedSchedule: selectedSchedule }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Movie_Halls);
