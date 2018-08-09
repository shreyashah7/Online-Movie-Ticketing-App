import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavDropdown,MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends Component {
    render(){
        return (
            <Navbar inverse collapseOnSelect>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/admin">
                        <NavItem eventKey={1}>
                            Edit Movies/Halls
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/addMovie">
                        <NavItem eventKey={2}>
                            Add Movies
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/addHall">
                        <NavItem eventKey={3}>
                            Add Halls
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/addUser">
                        <NavItem eventKey={4}>
                            Add User
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/admin/updateUser">
                        <NavItem eventKey={5}>
                            Update User
                        </NavItem>
                    </LinkContainer>

                    <LinkContainer to="/searchbill">
                        <MenuItem eventKey={10.1}>
                            Search a Bill
                        </MenuItem>
                    </LinkContainer>

                    <NavDropdown eventKey={11} title="DashBoard" id="basic-nav-dropdown">
                        <LinkContainer to="/admin/movierevenueperhall">
                            <MenuItem eventKey={11.1}>
                                Movie Revenue By Halls
                            </MenuItem>
                        </LinkContainer>

                        <MenuItem divider />

                        <LinkContainer to="/admin/toptenmoviesbyrevenue">
                            <MenuItem eventKey={11.3}>Top Ten Movies By Revenue</MenuItem>
                        </LinkContainer>

                        <LinkContainer to="/admin/citywiserevenue">
                            <MenuItem eventKey={11.3}>City Wise Revenue for Movie</MenuItem>
                        </LinkContainer>

                        <LinkContainer to="/admin/toptenhalls">
                            <MenuItem eventKey={11.3}>Top 10 Halls sold Max tickets</MenuItem>
                        </LinkContainer>


                        <MenuItem divider />

                        <LinkContainer to="/admin/clicksperpage">
                            <MenuItem eventKey={11.2}>
                                Log Analytics
                            </MenuItem>
                        </LinkContainer>

                        <LinkContainer to="/admin/moviereviewgraph">
                            <MenuItem eventKey={11.2}>
                                Graph for Reviews on Movies
                            </MenuItem>
                        </LinkContainer>

                        <LinkContainer to="/admin/tracediagram">
                            <MenuItem eventKey={11.2}>
                                Trace Diagram
                            </MenuItem>
                        </LinkContainer>
                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>
            </Navbar>
            );
        }
}

export default NavBar;