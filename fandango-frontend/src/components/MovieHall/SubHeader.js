import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class SubHeader extends Component {
    render() {
        return (
            <div className="admin-sub-header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/schedulemovie">
                                <NavItem eventKey={1}>
                                    Schedule Movie
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/movierevenue">
                                <NavItem eventKey={2}>
                                    View Movies Revenues
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/cancelbooking">
                                <NavItem eventKey={3}>
                                    Cancel User Booking
                                </NavItem>
                            </LinkContainer>
                            <LinkContainer to="/searchbill">
                                <NavItem eventKey={4}>
                                    View Bill Information
                                </NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default SubHeader;