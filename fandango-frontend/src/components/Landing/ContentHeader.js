import React, { Component } from 'react';

class ContentHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="col-md-12 sub-header">
                    <div className="col-md-offset-2 col-md-10 pd-left-0">
                        <div className="movie-ticket-header col-md-12 clearfix">
                            <div className="col-md-2 pd-left-0 pd-right-0 ticket-label float-left">BUY MOVIE TICKETS </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContentHeader;