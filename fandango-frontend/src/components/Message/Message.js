import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {

    render() {
        return (
            <div className="row justify-content-md-center" style={{ color: 'red' }} >
                {this.props.message}

            </div>

        );
    }
}

export default Message;