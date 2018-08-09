import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './header.css';
import fandangoLogo from './fandango-logo.jpg';
import { LinkContainer } from 'react-router-bootstrap';
import { doSignOut } from '../../api/apicall_for_users';
import { loginUser, selectedTrace } from "../../actions";
import {searchCriteria} from "../../actions";
import { log1, pageNames } from "../../App";

class CommonHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            criteria: ''
        }
    }

  signout() {
    doSignOut({pageNames:this.props.trace}).then((response) => {
      
      window.location = "/"
        this.props.loginUser(null);
        this.props.selectedTrace([]);
    })
  }

    handleSearch = (userdata) => {
        console.log(userdata);
        window.location = "/searchresult"
    }

    render() {
        return (
            <div>
                <div className="brand-bar">
                    <div className="col-md-12">
                        <div className="col-md-offset-8 col-md-4 float-right header-link">
                            <a href="">Gift Cards</a> |
                            <a href="">Offers</a> |
                            {(this.props.user === undefined || this.props.user === null) && <Link to="/login"
                                                                                                  className="hide-logged-in">Sign In</Link>}
                            {(this.props.user !== undefined && this.props.user !== null) && <button
                                className="btn btn-link hide-logged-in" type="button" onClick={() => { this.signout() }}>Sign Out</button>}
                        </div>
                    </div>
                </div>
                <div>
                    <ul className="fandango-nav">
                        <li>
                            <LinkContainer to={this.props.user !== undefined && this.props.user !== null && this.props.user.role == 1 ? '/admin' :
                                this.props.user !== undefined && this.props.user !== null && this.props.user.role == 2 ? '/mhadmin' : this.props.user !== undefined && this.props.user !== null && this.props.user.role == 3 ? '/home' : '/'}>
                                <a>
                                    <img alt="Fandango Poster" src={fandangoLogo} className="header-logo" />
                                </a>
                            </LinkContainer>
                        </li>
                        <li id="global-search">
                            <form action="/search" autoComplete="off" role="search" noValidate="">
                                <div className="fan-autocomplete">
                                    <div className="fan-autocomplete-results"></div>
                                    <input
                                        className="fan-input style-search"
                                        type="text"
                                        name="q"
                                        placeholder="Search Movie"
                                        onChange={(event) => {
                                            this.setState({
                                                criteria: event.target.value,
                                                type: true
                                            });
                                        }}
                                    />
                                </div>
                                <input
                                    type="hidden"
                                    name="mode"
                                    value="general"

                                />
                                <button className="fan-btn fan-btn-style-go" type="button" onClick={() => this.handleSearch(this.props.searchCriteria(this.state))}>Go</button>
                            </form>
                        </li>
                        {/* <li className="drop-menu"><Link to="/allmovies">MOVIES</Link> */}
                        {/* <div className="fulldrop">
                <div className="column">
                  <ul>
                    <li>.</li>
                  </ul>
                </div>
                <div className="column">
                  <h3>NOW PLAYING</h3>
                  <ul>
                    <li><a href="">MOVIES</a></li>
                    <li><a href="">MOVIE TIMES + TICKETS</a></li>
                    <li><a href="">MOVIE NEWS</a></li>
                    <li><a href="">MY VIP ACCOUNT</a></li>
                  </ul>
                </div>
                <div className="column">
                  <h3>OPENING THIS WEEK</h3>
                  <ul>
                    <li><a href="">Tech ANd All</a></li>
                    <li><a href="">Web Designs</a></li>
                    <li><a href="">PSD</a></li>
                    <li><a href="">Scripts</a></li>
                  </ul>
                </div>
                <div className="column">
                  <h3>PRE SALES TICKETS</h3>
                  <ul>
                    <li><a href="">Tech ANd All</a></li>
                    <li><a href="">Web Designs</a></li>
                    <li><a href="">PSD</a></li>
                    <li><a href="">Scripts</a></li>
                  </ul>
                </div>
                <div className="column">
                  <h3>EXPLORE MORE</h3>
                  <ul>
                    <li><a href="">Tech ANd All</a></li>
                    <li><a href="">Web Designs</a></li>
                    <li><a href="">PSD</a></li>
                    <li><a href="">Scripts</a></li>
                  </ul>
                </div>
              </div> */}
                        {/* </li> */}
                        <li className="drop-menu"><a href=""><Link to="/allmovies">MOVIE TIMES + TICKETS</Link></a>
                            {/* <div className="fulldrop">
                <div className="column large-column">
                  <h3>Where are you located? Here are our top cities</h3>
                </div>
                <div className="column">
                  <ul>
                    <li><a href="">New York, NY</a></li>
                    <li><a href="">Los Angeles, CA</a></li>
                    <li><a href="">Atlanta, GA</a></li>
                    <li><a href="">Chicago, IL</a></li>
                  </ul>
                </div>
                <div className="column">
                  <ul>
                    <li><a href="">Austin, TX</a></li>
                    <li><a href="">Miami, FL</a></li>
                    <li><a href="">San Francisco, CA</a></li>
                    <li><a href="">Phoenix, AZ</a></li>
                  </ul>
                </div>
                <div className="column">
                  <ul>
                    <li><a href="">Washington, DC</a></li>
                    <li><a href="">Boston, MA</a></li>
                    <li><a href="">San Diego, CA</a></li>
                    <li><a href="">Seattle, WA</a></li>
                  </ul>
                </div>
                <div className="column">
                  <ul>
                    <li><a href="">Edison, NJ</a></li>
                    <li><a href="">Houston, TX</a></li>
                    <li><a href="">Tampa, FL</a></li>
                    <li><a href="">San Jose, CA</a></li>
                  </ul>
                </div>
              </div> */}
                        </li>
                        {(this.props.user !== undefined && this.props.user !== null) && <li><Link to="/dashboard">MY <span className="vip-text">VIP</span> ACCOUNT</Link></li>}
                        {(this.props.user === undefined || this.props.user === null) && <li><Link to="/signup">JOIN FANDANGO <span className="vip-text">VIP</span></Link></li>}
                    </ul>
                </div>
                <div style={{ borderTop: '3px solid rgb(241, 85, 0)' }}></div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.loginUser,
        criteria: state.searchCriteria,
        trace: state.selectedTrace
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loginUser: loginUser, searchCriteria: searchCriteria, selectedTrace: selectedTrace }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CommonHeader);