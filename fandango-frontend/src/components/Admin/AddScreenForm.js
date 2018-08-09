import React, {Component} from 'react';
import NavBar from './Navigation';
import CommonHeader from '../header/CommonHeader';
import { Grid, Row, Col, DropdownButton, MenuItem, Button, Glyphicon } from 'react-bootstrap';
import * as API from '../../api/API';
import { ToastContainer, toast } from 'react-toastify';


class AddScreenForm extends Component {
    notify = (msg) => toast(msg);

    constructor(props){
        super(props);
        this.state = {
            hallName: 'select',
            screenNum: '',
            screenType: '',
            totalSeats: '',
            allScreens: [],
            hallId: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismiss = this.dismiss.bind(this);
    }

    componentDidMount(){
        this.setState({
            screenNum : this.props.screenNumber,
            hallId: this.props.hallId,
            screenType: this.props.screenType,
            totalSeats: this.props.totalSeats
        })
    }

    handleSelect(hallId, maxScreenNum){
        return ((event)=> {
            this.setState({
                hallName: event.target.innerHTML,
                hallId,
                maxScreenNum
            });
        })
    }

    handleSubmit(){
        if(this.props.screenId){
            API.editScreen(this.props.screenId, this.state.screenType, 
                this.state.totalSeats, false).then((result)=>{
                    this.notify(result.meta.message);
            }).catch((err)=> {
                this.notify(err);
            });
        } else {
            API.addScreen(this.props.hallId, this.props.screenNumber, this.state.screenType, 
                this.state.totalSeats, false).then((result)=>{
                    this.notify(result.meta.message);
            }).catch((err)=> {
                this.notify(err);
            });
        }
    }

    dismiss() {
        this.props.unmountMe(this.props.screenNumber - 1);
        API.editScreen(this.props.screenId, this.state.screenType, 
            this.state.totalSeats, true).then((result)=>{
                this.notify('Screen deleted successfully');
        }).catch((err)=> {
            this.notify(err);
        });
    } 

    render(){
        console.log(`HALLID: ${this.props.hallId}`);
        return (
            <div className="screenForm"> 
            <div>
                <Grid> 
                    <Row className="show-grid"> 
                        <Col md={2}>
                            <div className="screen-title"> 
                                <div className="form-group row">
                                        <label htmlFor="screenNum"
                                        className="form-label label-color"><strong> Screen-{this.props.screenNumber} </strong></label>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                        <div className="screen-form">
                            <div className="form-group row">
                            <label htmlFor="screenType"
                                className="col-form-label label-color"><strong> Screen Type </strong></label>
                                <input className="form-control"
                                    type="text"
                                    id="screenType"
                                    name="screenType"
                                    value={this.state.screenType}
                                    required 
                                    onChange={(event) => {
                                        this.setState({
                                            screenType: event.target.value
                                        });
                                    }}
                                    >
                                </input>
                            </div>
                            </div>
                        </Col>
                        <Col md={3}>
                        <div className="form-group row">
                            <label htmlFor="totalSeats"
                                className="col-form-label label-color"><strong> Total Seats </strong></label>
                            <div className="screen-form">
                                <input className="form-control"
                                    id="totalSeats"
                                    name="totalSeats"
                                    type="number"
                                    value={this.state.totalSeats}
                                    required 
                                    onChange={(event) => {
                                        this.setState({
                                            totalSeats: event.target.value
                                        });
                                    }}
                                    >
                                </input>
                            </div>
                        </div>
                        </Col>
                        <Col md={3}>
                        <div className="screenButton">
                        <Button bsSize="small" className="btn btn-primary" id="trash" type="submit"
                                onClick={this.dismiss} 
                        >
                            <Glyphicon glyph="trash" /> 
                        </Button>
                        <Button id="submit-user" className="btn btn-primary" id="save" onClick={this.handleSubmit}> Save Screen </Button>
                        <ToastContainer />
                        </div>
                        </Col>
                    </Row>
                </Grid>              
                <br />
            </div>
            </div>
        );
    }
}

export default AddScreenForm;
