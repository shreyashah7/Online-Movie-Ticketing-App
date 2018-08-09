import React, {Component} from 'react';
import * as API from '../../api/API';
import {Alert, Button, Glyphicon} from 'react-bootstrap';
import AddScreenForm from './AddScreenForm';
import { ToastContainer, toast } from 'react-toastify';
import stateRegex from '../Helper/StateRegex';
import zipcodeRegex from '../Helper/ZipcodeRegex';
import  { Redirect } from 'react-router-dom';

class HallForm extends Component {
    notify = (msg) => toast(msg);

    constructor(props){
        super(props);
        this.state = {
            hallId: '',
            hallName: '',
            street: '',
            city:'',
            state: '',
            zipcode: '',
            totalScreens: '',
            screensAdded: 0,
            screensArray: [],
            isHallSaved: false,
            stateValidation: 'NA',
            zipcodeValidation: 'NA',
            isDeleted: false,
            deletedScreens: []
          };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addScreen = this.addScreen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChildUnmount = this.handleChildUnmount.bind(this);
    }

    componentDidMount(){
        if (this.props.hallId){
            console.log('comp did mount');
            let allScreens = this.props.allScreens;
            document.getElementById('submit-button').innerHTML = 'Update Hall';
            document.getElementById('form-header').innerHTML = 'Edit Hall Details';
            document.getElementById('dlt-btn').style.display = 'block';
            API.getHallById(this.props.hallId).then((result)=> {
                console.log((result.data)[0]);
                let res = (result.data)[0];
                this.setState({
                    hallId: this.props.hallId,
                    hallName: res.hall_name,
                    street: res.street,
                    city: res.city,
                    state: res.state,
                    zipcode: res.zipcode,
                    totalScreens: res.screen_nums,
                    isHallSaved: true,
                    screensAdded: allScreens.length,
                    screensArray: allScreens.map((screen, index)=> {
                      return  <AddScreenForm key={index} 
                        unmountMe={this.handleChildUnmount} 
                        screenId={screen.id}
                        hallId = {this.props.hallId}
                        screenType = {screen.screen_type}
                        totalSeats = {screen.total_seats}
                        screenNumber={screen.screen_num}
                    />
                    })
                });
            });
        }
    }

    addScreen() {
        const screensArray = this.state.screensArray;
        let deletedScreens = this.state.deletedScreens;

        if(this.state.totalScreens < this.state.screensAdded + 1){
            this.notify('Screen Number exceeded the Max No. of Screens in that Hall');
            return;
        }

        if(deletedScreens.length > 0){
            let screenNum =  Math.min(...deletedScreens);
            // console.log(`Min Screen Number: ${screenNum}`);
            let index = deletedScreens.indexOf(screenNum);
            deletedScreens.splice(index, 1);
            // console.log(`Index of Min: ${deletedScreens}`);
            this.setState({
                deletedScreens: deletedScreens,
                screensAdded: this.state.screensAdded + 1,
                screensArray: screensArray.concat(
                        <AddScreenForm key={this.state.screensAdded} 
                            unmountMe={this.handleChildUnmount} 
                            hallId={this.state.hallId}
                            screenNumber={screenNum+1}
                        />
                    )
            });
        } else {
            this.setState({
                screensAdded: this.state.screensAdded + 1,
                screensArray: screensArray.concat(
                        <AddScreenForm key={this.state.screensAdded} 
                            unmountMe={this.handleChildUnmount} 
                            hallId={this.state.hallId}
                            screenNumber={this.state.screensAdded + 1}
                        />
                    )
            });
        }
    }

    handleChildUnmount(deletedScreen){
        let screensArray = this.state.screensArray;
        let deletedScreens = this.state.deletedScreens;
        screensArray = screensArray.filter((screen, index)=> {
            return index != deletedScreen
        });
        if(this.state.screensAdded === 1){
            this.setState({
                screensAdded: 0,
                deletedScreens: [],
                screensArray: []
            })
        } else {
            this.setState({
                screensAdded: this.state.screensAdded - 1,
                deletedScreens: deletedScreens.concat(deletedScreen),
                screensArray: screensArray
            });
        }
    }

    validateField(fieldType, value){
        let fieldPromise = new Promise(function(resolve, reject){
            let pattern;
            switch (fieldType){
                case 'state':
                    pattern = stateRegex;
                    break;
                case 'zipcode':
                    pattern = zipcodeRegex;
                    break;
            }
            if(pattern.test(value)) {
                resolve(true)
            } else {
                reject(false);
            }
        });
        return fieldPromise;
    }

    handleDelete(){
        API.editHall(this.props.hallId,this.state.hallName, this.state.street, this.state.city, this.state.state, this.state.zipcode, 
            this.state.totalScreen, true).then((result)=>{
            this.notify('Hall deleted successfully');
        }).then((res)=>{
            setTimeout(()=>{
                this.setState({
                    isDeleted: true
                })
            }, 2000);
        })
    }

    handleSubmit(event){
        if(this.state.hallName === ''|| this.state.city === '' || this.state.zipcode === '' || this.state.totalScreens === '') {
            this.notify('Please fill all mandatory fields');
            return;
        } else if(!this.state.stateValidation){
            this.notify('Invalid State field Input');
            return;
        } else if(!this.state.zipcodeValidation){
            this.notify('Invalid Zipcode field Input');
            return;
        }  
        

        if(this.props.hallId){
            API.editHall(this.props.hallId,this.state.hallName, this.state.street, this.state.city, this.state.state, this.state.zipcode, 
                this.state.totalScreens, false).then((data)=> {
                    this.notify('Hall updated successfully');
                });
        } else {
            API.addHall(this.state.hallName, this.state.street, this.state.city, this.state.state, this.state.zipcode, 
                this.state.totalScreens, false).then((result)=> {
                    this.setState({
                        hallId: result.data.data.id,
                        isHallSaved : true
                    });
                    this.notify('Hall saved successfully');
                });
        }
        event.preventDefault();
    }


    render(){
        console.log(`Screens Array length: ${this.props.allScreens}`);
        console.log(`Hall ID: ${this.props.hallId}`);
        if(this.state.isDeleted){
            return <Redirect to='/admin'  />
        } 

        return (
            <div id="hallForm">  
            <br />
            <h3 id="form-header"> <strong> Add Hall Details </strong> </h3> 
            <form> 
            <br /><br />
                <div className= "admin-forms">
                    <div className="admin form-group required row">
                        <label htmlFor="hallName"
                            className="col-sm-2 col-form-label control-label label-color"><strong> Hall Name </strong></label>
                        <div className={'col-sm-7' }>
                            <input className="form-control"
                                id="hallName"
                                name="hallName"
                                value={this.state.hallName}
                                required 
                                onChange={(event) => {
                                    this.setState({
                                        hallName: event.target.value
                                    });
                                }}
                                >
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                <div className= "admin-forms">
                    <div className="form-group row">
                        <label htmlFor="street"
                            className="col-sm-2 col-form-label label-color"><strong> Street  </strong></label>
                        <div className={'col-sm-9' }>
                            <input className="form-control"
                                id="street"
                                name="street"
                                value={this.state.street}
                                required 
                                onChange={(event) => {
                                    this.setState({
                                        street: event.target.value
                                    });
                                }}
                                >
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                <div className= "admin-forms">
                    <div className="admin form-group required row">
                        <label htmlFor="city"
                            className="col-sm-2 col-form-label control-label label-color"><strong> City  </strong></label>
                        <div className={'col-sm-9' }>
                            <input className="form-control"
                                id="city"
                                name="city"
                                value={this.state.city}
                                required 
                                onChange={(event) => {
                                    this.setState({
                                        city: event.target.value
                                    });
                                }}
                                >
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                <div className= "admin-forms">
                    <div className="form-group row">
                        <label htmlFor="state"
                            className="col-sm-2 col-form-label label-color"><strong> State  </strong></label>
                        <div className={'col-sm-9' }>
                            <input className="form-control"
                                id="state"
                                name="state"
                                value={this.state.state}
                                required 
                                onChange={(event) => {
                                    this.setState({
                                        state: event.target.value
                                    }),this.validateField('state', event.target.value)
                                    .then((res)=>{
                                        this.setState({
                                            stateValidation: res
                                        })
                                    })
                                    .catch((err) => {
                                        this.setState({
                                            stateValidation: err
                                        })
                                    })
                                }}
                                >
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                <div className= "admin-forms">
                    <div className="admin form-group required row">
                        <label htmlFor="zipcode"
                            className="col-sm-2 col-form-label control-label label-color"><strong> ZipCode  </strong></label>
                        <div className={'col-sm-9' }>
                            <input className="form-control"
                                id="zipcode"
                                name="zipcode"
                                value={this.state.zipcode}
                                required 
                                onChange={(event) => {
                                    this.setState({
                                        zipcode: event.target.value
                                    }),this.validateField('zipcode', event.target.value)
                                    .then((res)=>{
                                        this.setState({
                                            zipcodeValidation: res
                                        })
                                    })
                                    .catch((err) => {
                                        this.setState({
                                            zipcodeValidation: err
                                        })
                                    })
                                }}
                                >
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                <div className= "admin-forms">
                    <div className="admin form-group required row">
                        <label htmlFor="totalScreens"
                            className="col-sm-2 col-form-label control-label label-color"><strong> Total No. of Screens  </strong></label>
                        <div className={'col-sm-9' }>
                            <input className="form-control"
                                type="number"
                                id="totalScreens"
                                name="totalScreens"
                                value={this.state.totalScreens}
                                required 
                                onChange={(event) => {
                                    this.setState({
                                        totalScreens: event.target.value
                                    });
                                }}
                                >
                            </input>
                        </div>
                    </div>
                </div>
                <br />
                { this.state.isHallSaved && 
                    <div> 
                        {/* {this.state.deletedScreen ? this.state.screensArray : this.state.screensArray.splice(this.state.deletedScreen, 1)}  */}
                        {this.state.screensArray}
                        <br />
                        <div className="col-sm-1"> </div>
                        <div className="form-buttons"> 
                            <Button bsSize="small" className="btn btn-primary" onClick={this.addScreen}>
                                <Glyphicon glyph="plus" /> Add Screen
                            </Button>
                        </div>  
                    </div> 
                }
                <br /> <br />
                <div className="col-sm-2"> </div>   
                <Button  id="dlt-btn" className="col-sm-2 btn btn-danger" onClick={this.handleDelete}> Delete this Hall </Button>
                <div className="col-sm-5"> </div>     
                <Button id="submit-button"  className="col-sm-1 btn btn-primary" onClick={this.handleSubmit}> Save Hall </Button>
                <ToastContainer />
                <br /> <br />
            </form>
            </div>
        );
    }
}

export default HallForm;
