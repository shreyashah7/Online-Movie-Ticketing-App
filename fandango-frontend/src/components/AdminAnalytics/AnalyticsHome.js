import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import NavBar from '../Admin/Navigation';
import '../Admin/admin.css';
import '../MovieHall/subheader.css';


class AnalyticsHome extends Component {
    constructor(props){
        super(props);
        }

    render(renderDropdownButton) {
        return (
            <div className="container-body admin-sub-header" id="outer-container">
                <div className= "admin">
                    <CommonHeader />
                    <NavBar />
                    <div className= "admin-module">

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AnalyticsHome);


