import React, {Component} from 'react';
import fandangoLogo from './../login/fandango-logo.jpg';
import {Link} from 'react-router-dom';


class EnterTickets extends Component{

    render(){
        return(
            <div className="site-wrep signin vipsignin">
                <div>
                    <header id="registration-header" class="registration-header" role="banner">
                        <nav  className="nav-bar">
                            <div className="row">
                                <div className="large-11 large-centered columns">
                                    <ul className="inline-items">
                                        <li className="site-logo">
                                            <Link className="fandango-logo" to="/">
                                                <img src={fandangoLogo} alt="Fandango Logo" class="brand-img" />
                                            </Link>
                                        </li>
                                    </ul>
                                    <div class="registration-mode right">
                                        You're a guaranteed ticket away from the perfect movie night.

                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>

                <div className="open-form" style={{ minHeight: '625px', marginTop: '50px'}}>
                    <div className="sub-panel">
                        <p className="join-header">FANDANGO<span class="page-header-emphasis">VIP</span>

                            <span className="registration-caption hide-for-small-only"></span>
                            <span className="registration-caption show-for-small-only"></span>

                        </p>

                        <hr />

                        CARD NO: 9999 4444 2222 1111<br />
                        Zip Code: 95126
                        <br />
                        <br />
                        <Link to=""><button type="button"  className="btn" style={{backgroundColor: '#F15500',color: 'white'}}>USE THIS CARD</button> </Link>

                        <hr />

                        USE ANOTHER CARD

                        <label for="CardnumberBox" >CARD NUMBER:</label>
                        <input
                            type="text"
                            id="CardnumberBox"
                            required
                            autoFocus
                        />
                        <label for="ExpirationBox" >EXPIRATION DATE: (mmyy format)</label>
                        <input
                            type="text"
                            id="ExpirationBox"
                            required
                            autoFocus
                        />

                        <label for="NameBox" >NAME ON THE CARD: (mmyy format)</label>
                        <input
                            type="text"
                            id="NameBox"
                            required
                            autoFocus
                        />

                        <label for="ZipBox" >BILLING ZIP CODE: (mmyy format)</label>
                        <input
                            type="text"
                            id="ZipBox"
                            required
                            autoFocus
                        />
                        <br />

                        <Link to=""><button type="button"  className="btn" style={{backgroundColor: '#F15500',color: 'white'}}>BUY TICKETS</button> </Link>




                    </div>
                </div>



            </div>
        )
    }
}

export default EnterTickets;
