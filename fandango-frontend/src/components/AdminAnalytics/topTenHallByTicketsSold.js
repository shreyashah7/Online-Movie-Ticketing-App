import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Bar,Pie,Line} from 'react-chartjs-2';
import * as API from  '../../api/API';
import {log1} from '../../App';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';

class TopTenHallByTicketsSold extends Component{
    constructor(props){
        super(props);

        this.state={
            Data:{}
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        API.topTenHalls()
            .then((resultData) => {
                if (!!resultData.data) {
                    const halls_data = resultData.data;
                    let hall_names = [];
                    let hall_revenue = [];
                    let hall_tickets_sold = [];
                    halls_data.forEach(hall_data => {
                        hall_names.push(hall_data.hall_name);
                        hall_revenue.push(hall_data.revenue);
                        hall_tickets_sold.push(hall_data.total_no_of_tickets)
                    });
                    console.log(`${JSON.stringify(hall_names)}`);
                    console.log(`${JSON.stringify(hall_revenue)}`);
                    console.log(`${JSON.stringify(hall_tickets_sold)}`);
                    this.setState({
                        Data: {
                            labels: hall_names,
                            datasets:[
                                {
                                    label:'Top Ten Movies By Revenue',
                                    data: hall_revenue,
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
                    console.log("There are no tickets sold in last month");
                }
            });
    }

    handleClick() {
        log1.info('{"event":"page_click","page_name":"TopTenHallsPage","count":"1"}');
    }

    render(){
        return(<div onClick={this.handleClick} className="admin-sub-header">
                <CommonHeader />
                <NavBar/>

                <div className=" col-md-12 page-header-container">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <h2 className="schedule-page-header">Graph for <span className="page-header-emphasis"> Top Ten Movies with its Revenue</span></h2>
                    </div>
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

export default TopTenHallByTicketsSold;