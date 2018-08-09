import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Doughnut,Bar,Pie,Line} from 'react-chartjs-2';
import * as API from  '../../api/API';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';

class MovieReviewGraph extends Component{
    constructor(props){
        super(props);

        this.state={
            Data:{}
        };
    }

    componentDidMount() {
        API.movieReviewGraphAPI()
            .then((resultData) => {
                if (!!resultData.data) {
                    const movies_data = resultData.data;
                    let movie_names = [];
                    let movie_average_rating = [];
                    movies_data.forEach(movie => {
                        movie_names.push(movie.movie_name);
                        movie_average_rating.push(movie.average_rating);
                    });
                    console.log(`${JSON.stringify(movie_names)}`);
                    console.log(`${JSON.stringify(movie_average_rating)}`);
                    this.setState({
                        Data: {
                            labels: movie_names,
                            datasets:[
                                {
                                    label:'Top Ten Movies By Revenue',
                                    data: movie_average_rating,
                                    backgroundColor:[
                                        'rgba(255,105,145,0.6)',
                                        'rgba(155,100,210,0.6)',
                                        'rgba(90,178,255,0.6)',
                                        'rgba(240,134,67,0.6)',
                                        'rgba(120,120,120,0.6)',
                                        'rgba(250,55,197,0.6)'
                                    ]
                                }
                            ]
                        }
                    });
                } else {
                    console.log("There are no movies in DB");
                }
            });
    }

    render(){
        return(<div className="admin-sub-header">
                <CommonHeader />
                <NavBar/>

                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-4 col-md-8 pd-left-0">
                        <h2 className="schedule-page-header">Graph for <span className="page-header-emphasis">Reviews on Movies</span></h2>
                    </div>
                </div>

                <div className="col-md-offset-1 col-md-10">

                    <div className="col-md-6">
                        <Doughnut
                            data = {this.state.Data}
                            options = {{ maintainAspectRatio: true,
                                legend: {
                                    position: 'left',
                                    labels: {
                                        boxWidth: 10
                                    }
                                }}} />
                    </div>

                    <div className="col-md-6">
                        <Bar
                            data = {this.state.Data}
                            width={150}
                            height={300}
                            options = {{
                                maintainAspectRatio: false,
                                legend: {
                                    position: 'bottom',
                                }
                            }} />
                    </div>
                </div>
                <div className="col-md-offset-1 col-md-10">
                    <div className="col-md-6">
                        <Pie
                            width={150}
                            height={300}
                            data = {this.state.Data}
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

                    <div className="col-md-6">
                        <Line
                            width={150}
                            height={300}
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

export default MovieReviewGraph;