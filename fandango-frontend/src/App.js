import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import RoutesComponent from "./components/RoutesComponent/RoutesComponent";
import log4javascript from 'log4javascript';
var log1 = log4javascript.getLogger();
var pageNames = [];
class App extends Component {

    componentDidMount(){
        var ajaxAppender = new log4javascript.AjaxAppender('http://localhost:3001/api/logger');
        //ajaxAppender.setBatchSize(1); // send in batches of 10
        ajaxAppender.setTimed(true);
        ajaxAppender.setTimerInterval(1); // send every 1 seconds (unit is milliseconds)
        ajaxAppender.setSendAllOnUnload(); // send all remaining messages on window.beforeunload()
        log1.addAppender(ajaxAppender);
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <RoutesComponent/>
                </BrowserRouter>
            </div>
        );
    }
}

export {App,log1,pageNames};
