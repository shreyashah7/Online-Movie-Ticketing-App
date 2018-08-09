import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CommonHeader from '../header/CommonHeader';
import LandingContent from './LandingContent';
import ContentHeader from './ContentHeader';
import {log1} from "../../App";

class Landing extends Component {

    constructor(props){
        super(props);
        this.handlelogs = this.handlelogs.bind(this);
    }
    componentDidMount(){
    }

    handlelogs(){
        log1.info('{"event":"page_click","page_name":"Home","count":"1"}');
    }

    render() {
        return (
            <div className="container-body" id="outer-container" onClick={this.handlelogs}>
                <CommonHeader />
                {/* <ContentHeader /> */}
                <LandingContent />
            </div>
        )
    }
}

export default withRouter(Landing);