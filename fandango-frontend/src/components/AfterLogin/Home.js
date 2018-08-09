import React, { Component } from 'react';

import HomeHeader from './HomeHeader';
import LandingContent from '../Landing/LandingContent';
import { log1, pageNames } from "../../App";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {selectedTrace} from '../../actions'


class Home extends Component {

    constructor(props) {
        super(props);
        this.handleLogs = this.handleLogs.bind(this);

    }

    componentDidMount() {
        let pages = this.props.trace;
        pages.push("Home");
        if (this.props.user !== undefined && this.props.user.role == 3) {
            this.props.selectedTrace(pages)
        }
    }

    handleLogs() {
        log1.info('{"event":"page_click","page_name":"Home","count":"1"}');
    }

    render() {
        return (
            <div className="container-body" id="outer-container" onClick={this.handleLogs}>
                <HomeHeader />
                <LandingContent />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser,
        trace: state.selectedTrace
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({selectedTrace: selectedTrace}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);