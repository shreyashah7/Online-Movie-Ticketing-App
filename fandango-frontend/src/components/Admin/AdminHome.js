import React, { Component } from 'react';
import CommonHeader from '../header/CommonHeader';
import { withRouter } from 'react-router-dom';
import Search from './Search';
import NavBar from './Navigation';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import './admin.css';
import '../MovieHall/subheader.css';


class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownTitle : 'Select'
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event){
        if(event === "1"){
            this.setState({
                dropdownTitle : 'Movies'
            })
        } else if(event === "2"){
            this.setState({
                dropdownTitle : 'Theatres'
            })
        } 
    }

    render(renderDropdownButton) {
        return (
            <div className="container-body admin-sub-header" id="outer-container">
                <div className= "admin">      
                    <CommonHeader />
                    <NavBar />
                    <div className= "admin-module">          
                        <label> <i> Search for Movies or Theatres </i>  </label> 
                        <div className='admin-elements' id='dropdown'> 
                            <div className = "admin-forms"> 
                                <DropdownButton
                                    bsStyle = 'primary'
                                    title = {this.state.dropdownTitle}
                                    id = {`split-button-basic-1`}
                                    onSelect = {this.handleSelect}
                                    >
                                    <MenuItem eventKey="1">Movies</MenuItem>
                                    <MenuItem eventKey="2">Theatres</MenuItem>
                                </DropdownButton>  
                            </div>
                        </div>
                        <div className='admin-elements' id='search'> 
                            <div className = "admin-forms"> 
                                <Search group={this.state.dropdownTitle} placeholder='Search'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Admin);


