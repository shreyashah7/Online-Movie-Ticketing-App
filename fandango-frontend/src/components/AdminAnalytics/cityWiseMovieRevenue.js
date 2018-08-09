import React, {Component} from 'react';
import * as API from '../../api/API';
import MovieSearchRevenue from './movieSearchRevenue';
import {Bar,Pie,Line} from 'react-chartjs-2';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';


class CityWiseMovieRevenue extends Component {

    constructor(props){
        super(props);

        this.state={
            Data:{},
            movie_name:""
        };
    }
    componentDidMount(){
        API.getCityWiseRevenueByMovie(this.props.match.params.movieId).then((resultData)=> {
            console.log(`Data is ${JSON.stringify(resultData)}`);
            if (resultData.data) {
                const movie_city_data = resultData.data;
                if (!Array.isArray(movie_city_data) || !movie_city_data.length) {
                    document.getElementById('no-db').innerHTML = 'No Revenue for this  movie';
                    document.getElementById('no-db').style.color = 'red';
                    return;
                  }
                this.setState({movie_name:resultData.data[0].movie_name});
                let city_names = [];
                let city_revenue = [];
                movie_city_data.forEach(city => {
                    city_names.push(city.city);
                    city_revenue.push(city.average);
                });
                console.log(`${JSON.stringify(city_names)}`);
                console.log(`${JSON.stringify(city_revenue)}`);
                this.setState({
                    Data: {
                        labels: city_names,
                        datasets:[
                            {
                                label:'City Wise Revenue for a Movie',
                                data: city_revenue,
                                backgroundColor:[
                                    'rgba(255,105,145,0.6)',
                                    'rgba(155,100,210,0.6)',
                                    'rgba(90,178,255,0.6)',
                                    'rgba(240,134,67,0.6)',
                                    'rgba(120,120,120,0.6)',
                                    'rgba(250,55,197,0.6)'
                                ],
                                fill:false
                            }
                        ]
                    }
                });
            } else {
                console.log("There are no city revenue details in DB");
            }
        })
    }

    render(){
        return(
            <div>
                 <MovieSearchRevenue />
                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Revenue for <span className="page-header-emphasis">{this.state.movie_name}</span> movie</h2>
                    </div>
                    <p id='no-db'> </p>
                </div>
                <div className="col-md-offset-4 col-md-4 col-md-offset-4">
                    <Pie
                        data = {this.state.Data}
                        width={100}
                        height={250}
                        options = {{
                            maintainAspectRatio: false,
                            legend: {
                                position: 'left',
                                labels: {
                                    boxWidth: 10
                                }
                            }
                        }} />
                </div>
                <div className="col-md-offset-1 col-md-10">
                    <div className="col-md-6">
                        <Bar
                            width={100}
                            height={250}
                            data = {this.state.Data}
                            options = {{
                                maintainAspectRatio: false,
                                legend: {
                                    position: 'bottom',
                                }
                            }} />
                    </div>

                    <div className="col-md-6">
                        <Line
                            width={100}
                            height={250}
                            data = {this.state.Data}
                            options = {{
                                maintainAspectRatio: false,
                                legend: {
                                    position: 'bottom',
                                }
                            }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CityWiseMovieRevenue;