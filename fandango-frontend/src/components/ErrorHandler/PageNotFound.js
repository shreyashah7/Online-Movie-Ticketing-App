import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './notfound.css';

class PageNotFound extends Component {

    render() {
        return (
            <div className="not-found-body">
                <div id="clouds">
                    <div class="cloud x1"></div>
                    <div class="cloud x1_5"></div>
                    <div class="cloud x2"></div>
                    <div class="cloud x3"></div>
                    <div class="cloud x4"></div>
                    <div class="cloud x5"></div>
                </div>
                <div class='c'>
                    <div class='_404'>401</div>
                    {/* <div class='_1'>THE PAGE</div> */}
                    <div class='_2'>YOU ARE NOT AUTHORIZED</div>
                </div>
            </div>
        );
    }
}

export default PageNotFound;