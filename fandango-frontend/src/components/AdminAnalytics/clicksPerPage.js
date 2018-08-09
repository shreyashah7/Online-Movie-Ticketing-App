import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Bar,Pie,Line,Doughnut} from 'react-chartjs-2';
import * as API from  '../../api/API';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';

class ClicksPerPage extends Component{
    constructor(props){
        super(props);

        this.state={
            PageClicksData:{},
            MovieClicksData:{},
            SectionClicksData:{}
        };

        //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        API.clicksPerPage()
            .then((resultData) => {
                if (!!resultData.data && !!resultData.data.page_clicks && !!resultData.data.movie_clicks && !!resultData.data.section_clicks) {
                    const clicks_per_page = resultData.data.page_clicks;
                    let page_names = [];
                    let total_clicks = [];
                    clicks_per_page.forEach(click => {
                        page_names.push(click._id);
                        total_clicks.push(click.total_count);
                    });
                    console.log(`${JSON.stringify(page_names)}`);
                    console.log(`${JSON.stringify(total_clicks)}`);
                    this.setState({
                        PageClicksData: {
                            labels: page_names,
                            datasets:[
                                {
                                    label:'Dashboard for Total Clicks Per Page',
                                    data: total_clicks,
                                    backgroundColor:[
                                        /*'rgba(255,105,145,0.6)',
                                        'rgba(155,100,210,0.6)',
                                        'rgba(90,178,255,0.6)',
                                        'rgba(240,134,67,0.6)',
                                        'rgba(120,120,120,0.6)',
                                        'rgba(250,55,197,0.6)'*/
                                        'rgba(255,105,145,0.6)',
                                        'rgba(155,100,210,0.6)',
                                        'rgba(90,178,255,0.6)',
                                        'rgba(240,134,67,0.6)',
                                        'rgba(120,120,120,0.6)',
                                        'rgba(250,55,197,0.6)',
                                        'rgba(0,0,0,0.5)',
                                        'rgba(0,0,128,0.5)',
                                        'rgba(0,0,255,0.5)',
                                        'rgba(0,128,0,0.5)',
                                        'rgba(0,128,128,0.5)',
                                        'rgba(0,255,0,0.5)',
                                        'rgba(0,255,255,0.5)',
                                        'rgba(128,0,0,0.5)',
                                        'rgba(128,0,128,0.5)',
                                        'rgba(128,128,0,0.5)',
                                        'rgba(128,128,128,0.5)',
                                        'rgba(192,192,192,0.5)',
                                        'rgba(255,0,0,0.5)',
                                        'rgba(255,0,255,0.5)',
                                        'rgba(255,255,0,0.5)',
                                        'rgba(255,255,255,0.5)'
                                    ]
                                }
                            ]
                        }
                    });

                    //Handling Movie Clicks

                    const clicks_per_movie = resultData.data.movie_clicks;
                    let movie_names = [];
                    let total_clicks_movie = [];
                    clicks_per_movie.forEach(click => {
                        movie_names.push(click._id);
                        total_clicks_movie.push(click.total_count);
                    });
                    console.log(`${JSON.stringify(movie_names)}`);
                    console.log(`${JSON.stringify(total_clicks_movie)}`);
                    this.setState({
                        MovieClicksData: {
                            labels: movie_names,
                            datasets:[
                                {
                                    label:'Top 10 Movie Clicks',
                                    data: total_clicks_movie,
                                    backgroundColor:[
                                        'rgba(255,105,145,0.6)',
                                        'rgba(155,100,210,0.6)',
                                        'rgba(90,178,255,0.6)',
                                        'rgba(240,134,67,0.6)',
                                        'rgba(120,120,120,0.6)',
                                        'rgba(250,55,197,0.6)',
                                        'rgba(255,105,145,0.6)',
                                        'rgba(155,100,210,0.6)',
                                        'rgba(90,178,255,0.6)',
                                        'rgba(240,134,67,0.6)',
                                        'rgba(120,120,120,0.6)',
                                        'rgba(250,55,197,0.6)',
                                        'rgba(0,0,0,0.5)',
                                        'rgba(0,0,128,0.5)',
                                        'rgba(0,0,255,0.5)',
                                        'rgba(0,128,0,0.5)',
                                        'rgba(0,128,128,0.5)',
                                        'rgba(0,255,0,0.5)',
                                        'rgba(0,255,255,0.5)',
                                        'rgba(128,0,0,0.5)',
                                        'rgba(128,0,128,0.5)',
                                        'rgba(128,128,0,0.5)',
                                        'rgba(128,128,128,0.5)',
                                        'rgba(192,192,192,0.5)',
                                        'rgba(255,0,0,0.5)',
                                        'rgba(255,0,255,0.5)',
                                        'rgba(255,255,0,0.5)',
                                        'rgba(255,255,255,0.5)'
                                    ]
                                }
                            ]
                        }
                    });

                    //Capturing Area which is less seen

                    const clicks_per_section = resultData.data.section_clicks;
                    let section_names = [];
                    let total_clicks_section = [];
                    clicks_per_section.forEach(click => {
                        section_names.push(click._id);
                        total_clicks_section.push(click.total_count);
                    });
                    console.log(`${JSON.stringify(section_names)}`);
                    console.log(`${JSON.stringify(total_clicks_section)}`);
                    this.setState({
                        SectionClicksData: {
                            labels: section_names,
                            datasets:[
                                {
                                    label:'DashBoard for Capturing which sections are less seen',
                                    data: total_clicks_section,
                                    backgroundColor:[
                                        'rgba(255,105,145,0.6)',
                                        'rgba(155,100,210,0.6)',
                                        'rgba(90,178,255,0.6)',
                                        'rgba(240,134,67,0.6)',
                                        'rgba(120,120,120,0.6)',
                                        'rgba(250,55,197,0.6)',
                                        'rgba(0,0,0,0.5)',
                                        'rgba(0,0,128,0.5)',
                                        'rgba(0,0,255,0.5)',
                                        'rgba(0,128,0,0.5)',
                                        'rgba(0,128,128,0.5)',
                                        'rgba(0,255,0,0.5)',
                                        'rgba(0,255,255,0.5)',
                                        'rgba(128,0,0,0.5)',
                                        'rgba(128,0,128,0.5)',
                                        'rgba(128,128,0,0.5)',
                                        'rgba(128,128,128,0.5)',
                                        'rgba(192,192,192,0.5)',
                                        'rgba(255,0,0,0.5)',
                                        'rgba(255,0,255,0.5)',
                                        'rgba(255,255,0,0.5)',
                                        'rgba(255,255,255,0.5)'
                                    ]
                                }
                            ]
                        }
                    });
                } else {
                    console.log("There are no logs entries");
                }
            });
    }

    render(){
        return(<div className="admin-sub-header">
                <CommonHeader />
                <NavBar/>

                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-4 col-md-8 pd-left-0">
                        <h2 className="schedule-page-header">Graph for <span className="page-header-emphasis">User Clicks Per Page</span></h2>
                    </div>
                </div>

                <div className="col-md-offset-4 col-md-4 col-md-offset-4">
                    <Doughnut
                        data = {this.state.PageClicksData}
                        width={150}
                        height={300}
                        options = {{
                            maintainAspectRatio: false,
                            legend: {
                                position: 'bottom',
                            }
                        }} />
                </div>
                <div className="col-md-offset-1 col-md-10">
                    <div className=" col-md-12 page-header-container">
                        <div className="col-md-offset-2 col-md-10 pd-left-0">
                            <h2 className="schedule-page-header">Graphs for <span className="page-header-emphasis"> Movie Clicks, Less Seen Section</span></h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Pie
                            width={150}
                            height={300}
                            data = {this.state.MovieClicksData}
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
                            data = {this.state.SectionClicksData}
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

export default ClicksPerPage;