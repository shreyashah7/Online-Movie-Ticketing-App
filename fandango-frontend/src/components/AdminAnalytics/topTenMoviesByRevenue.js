import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Pie,Bar,Line} from 'react-chartjs-2';
import * as API from  '../../api/API';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';


class TopTenMoviesByRevenue extends Component{
    constructor(props){
        super(props);

        this.state={
            Data:{}
        };
    }

    componentDidMount() {
        API.topTenMovies()
            .then((resultData) => {
                if (!!resultData.data) {
                    const movies_data = resultData.data;
                    let movie_names = [];
                    let movie_revenue = [];
                    movies_data.forEach(movie => {
                    movie_names.push(movie.movie_name);
                    movie_revenue.push(movie.revenue);
                    });
                    console.log(`${JSON.stringify(movie_names)}`);
                    console.log(`${JSON.stringify(movie_revenue)}`);
                    this.setState({
                        Data: {
                            labels: movie_names,
                            datasets:[
                                {
                                    label:'Top Ten Movies By Revenue',
                                    data: movie_revenue,
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
                    console.log("There are no movies in DB");
                }
            });
    }

    render(){
        return(<div className="admin-sub-header">
                <CommonHeader />
                <NavBar/>

                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Graph for <span className="page-header-emphasis"> Top Ten Movies with its Revenue</span></h2>
                    </div>
                </div>

                <div className="col-md-offset-3 col-md-5 col-md-offset-4">
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

export default TopTenMoviesByRevenue;