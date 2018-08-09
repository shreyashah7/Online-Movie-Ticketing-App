import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import SubHeader from './SubHeader';
import LandingContent from '../Landing/LandingContent';
import './subheader.css';

class MovieHallAdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container-body" id="outer-container">
                <CommonHeader />
                <SubHeader />
                <LandingContent />
            </div>
        )
    }
}

export default withRouter(MovieHallAdminHome);


