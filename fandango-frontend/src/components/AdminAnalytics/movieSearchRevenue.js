import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Search from '../Admin/Search';
import {Bar,Pie} from 'react-chartjs-2';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';

class MovieSearchRevenue extends Component{
    constructor(props){
        super(props);
        this.state = {
            group: ''
        };
    }
    componentDidMount(){
        this.setState({
            group: 'Movies'
        })
    }

    render(){
        return(
            <div className="admin-sub-header">
            <CommonHeader />
            <NavBar/>

            <div className=" col-md-12 page-header-container">
            <div className="col-md-offset-2 col-md-10 pd-left-0">
            <h2 className="schedule-page-header">Graph for <span className="page-header-emphasis"> City Wise Revenue for a Movie</span></h2>
            </div>

            <div className='admin-elements' id='search'> 
                <br />
                <div className = "col-sm-4" > </div>
                <div className = "col-sm-8  admin-forms"> 
                    <Search group={this.state.group} placeholder='Search for a movie' forStats='true'  />
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default MovieSearchRevenue;