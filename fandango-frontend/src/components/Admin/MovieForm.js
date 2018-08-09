import React from 'react';
import * as API from '../../api/API';
import {Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import URLRegex from '../Helper/URLRegex';
import  { Redirect } from 'react-router-dom';


class MovieForm extends React.Component {
    notify = (msg) => toast(msg);

    constructor(props){
        super(props);
        this.state = {
            trailer: '',
            photos: '',
            movieName: '',
            description: '',
            seeItIn:'',
            cast: '',
            movieLength: 0,
            genres: '',
            releaseDate: '1900-01-01',
            trailerValidation: true,
            isDeleted: false
          };
        this.uploadPhotos = this.uploadPhotos.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        if (this.props.movieId){
            document.getElementById('submit-button').innerHTML = 'Update Movie';
            document.getElementById('form-header').innerHTML = 'Edit Movie Details';
            document.getElementById('dlt-btn').style.display = 'block';
            API.getMovieById(this.props.movieId).then((result)=> {
                let res = (result.data)[0];
                this.setState({
                    trailer: res.trailer,
                    photos: res.photos,
                    movieName: res.movie_name,
                    description: res.description,
                    seeItIn: res.see_it_in,
                    cast: res.cast,
                    movieLength: res.movie_length ,
                    genres: res.genres,
                    releaseDate: res.release_date
                });
            });
        }
    }

    validateField(fieldType, value){
        let fieldPromise = new Promise(function(resolve, reject){
            let pattern;
            switch (fieldType){
                case 'URL':
                    pattern = URLRegex;
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

    uploadPhotos(){
        if(this.state.movieName === '') {
            this.notify('Please enter the movie name first.');
            return;
        }
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.state.movieName);
        data.append('filefolder', 'posters');
        API.uploadFile(data).then((res)=> {
            res.json().then((body)=> {
                console.log(body);
                  this.setState({   
                        photos: `http://myec2.ddns.net:3001${body.file}`
                    });
            });
        })
    }

    handleDelete(event){
        API.editMovie(this.props.movieId, this.state.movieName, this.state.description, 
            this.state.trailer, this.state.photos, this.state.seeItIn, this.state.cast, 
            this.state.movieLength, this.state.releaseDate, this.state.genres, true).then((result)=>{
            this.notify('Movie deleted successfully');
        }).then((res)=>{
            setTimeout(()=>{
                this.setState({
                    isDeleted: true
                })
            }, 2000);
        })
    }

    handleSubmit(event){
        let now = new Date();
        if(this.state.movieName === ''|| this.state.seeItIn === '' || this.state.releaseDate === '1900-01-01' || this.state.genres === '') {
            this.notify('Please fill all mandatory fields');
            return;
        } else if(now.toISOString().split("T")[0] > this.state.releaseDate) {
            this.notify('Release Date should be current or future date');
            return;
        } else  if(!this.state.trailerValidation){
            this.notify('Inavlid Trailer Input');
            return;
        } else  if(Number.isInteger(this.state.movieLength)){
            this.notify('Movie Length must be a number');
            return;
        } else {
            if(this.props.movieId){
                API.editMovie(this.props.movieId,this.state.movieName, this.state.description, this.state.trailer, this.state.photos, 
                    this.state.seeItIn, this.state.cast, this.state.movieLength, this.state.releaseDate, 
                    this.state.genres, false).then((data)=> {
                        this.notify('Movie updated successfully');
                    });
            } else {
                API.addMovie(this.state.movieName, this.state.description, this.state.trailer, this.state.photos, 
                    this.state.seeItIn, this.state.cast, this.state.movieLength, this.state.releaseDate, 
                    this.state.genres, false).then((data)=> {
                        this.notify('Movie saved successfully');
                    }).catch((err)=> {
                        this.notify(err);
                    });
            }
        }

        
        event.preventDefault();
    }

    render() {
        if(this.state.isDeleted){
            return <Redirect to='/admin'  />
        } 
        return (
            <div id="movieForm"> 
            <br />
                <h3 id="form-header"> <strong> Add Movie Details </strong> </h3> 
                    <br/>
                <form >
                    <br /><br />
                    <div className= "admin-forms">
                        <div className="admin form-group required row ">
                            <label htmlFor="movieName"
                                className="col-sm-2 col-form-label control-label label-color"><strong> Movie Name </strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                    id="movieName"
                                    name="movieName"
                                    required
                                    value={this.state.movieName}
                                    onChange={(event) => {
                                        this.setState({
                                            movieName: event.target.value
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
                            <label htmlFor="description"
                                className="col-sm-2 col-form-label label-color"><strong> Description</strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                    id="description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={(event) => {
                                        this.setState({
                                            description: event.target.value
                                        });
                                    }}
                                    >
                                </input>
                            </div>
                        </div>
                    </div>
                    
                    <br />
        
                    <div className= "admin-forms">  
                        <div className="admin form-group required row ">
                            <label htmlFor="seeItIn"
                                className="col-sm-2 col-form-label control-label label-color"><strong> See It In</strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                    id="seeItIn"
                                    name="seeItIn"
                                    value={this.state.seeItIn}
                                    required
                                    onChange={(event) => {
                                        this.setState({
                                            seeItIn: event.target.value
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
                            <label htmlFor="cast"
                                className="col-sm-2 col-form-label label-color"><strong> Cast </strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                    id="cast"
                                    name="cast"
                                    value={this.state.cast}
                                    onChange={(event) => {
                                        this.setState({
                                            cast: event.target.value
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
                            <label htmlFor="movieLength"
                                className="col-sm-2 col-form-label label-color"><strong> Movie Length </strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                type="number"
                                    id="movieLength"
                                    name="movieLength"
                                    value={this.state.movieLength}
                                    onChange={(event) => {
                                        this.setState({
                                            movieLength: event.target.value
                                        });
                                    }}
                                    >
                                </input>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className= "admin-forms">
                        <div className="admin form-group required row ">
                            <label htmlFor="releaseDate"
                                className="col-sm-2 col-form-label control-label label-color"><strong> Release Date </strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                    type="date"
                                    id="releaseDate"
                                    name="releaseDate"
                                    required
                                    value={this.state.releaseDate}
                                    onChange={(event) => {
                                        this.setState({
                                            releaseDate: event.target.value
                                        });
                                    }}
                                    >
                                </input>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className= "admin-forms"> 
                        <div className="admin form-group required row ">
                            <label htmlFor="genres"
                                className="col-sm-2 col-form-label control-label  label-color"><strong> Genres </strong></label>
                            <div className={'col-sm-9' }>
                                <input className="form-control"
                                    id="genres"
                                    name="genres"
                                    value={this.state.genres}
                                    required
                                    onChange={(event) => {
                                        this.setState({
                                            genres: event.target.value
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
                            <label htmlFor="trailer"
                                className="col-sm-2 col-form-label label-color"><strong> Trailer</strong></label>
                            <div className={'col-sm-9' }>
                            
                            <input className="form-control"
                                    type="url"
                                    id="trailer"
                                    name="trailer"
                                    value={this.state.trailer}
                                    onChange={(event) => {
                                        this.setState({
                                            trailer: event.target.value
                                        }), this.validateField('URL', event.target.value)
                                        .then((res)=>{
                                            this.setState({
                                                trailerValidation: res
                                            })
                                        })
                                        .catch((err) => {
                                            this.setState({
                                                trailerValidation: err
                                            })
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
                            <label htmlFor="photos"
                                className="col-sm-2 col-form-label label-color"><strong> Photos</strong></label>
                            <div className={'col-sm-9' }>
                                <div id="photo-upload"> 
                                    <input ref={(ref) => {this.uploadInput = ref;}} type="file" accept='image/*'/>
                                    {
                                        this.state.photos && 
                                        <img id="pic" src={this.state.photos} alt="img" />
                                    }
                                </div>
                                <Button id="upload-button"  className="col-sm-1 btn btn-light" onClick={this.uploadPhotos}> Upload </Button>
                            </div>
                        </div>
                    </div>
                    <br /> <br /> <br />
                    <div className="col-sm-2"> </div>   
                    <Button  id="dlt-btn" className="col-sm-2 btn btn-danger" onClick={this.handleDelete}> Delete this Movie </Button>
                    <div className="col-sm-6"> </div>     
                    <Button id="submit-button"  className="col-sm-1 btn btn-primary" onClick={this.handleSubmit}> Add Movie </Button>
                    <ToastContainer />
                    <br/> <br/>
                </form> <br/>
            </div>
            );
    }
  }

export default MovieForm;
