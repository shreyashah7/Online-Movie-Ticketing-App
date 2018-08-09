import React, { Component } from 'react';
import * as API from '../../api/API';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialItems: [],
            items: [],
            routePath: '',
            isClicked: false
        }
        this.filterList = this.filterList.bind(this);
    }

    componentWillMount() {
        this.setState({ items: this.state.initialItems });
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.group) {
            case 'Movies':
                API.getMovies().then(obj => {
                    this.setState({
                        initialItems: obj.data,
                        routePath: 'movies'
                    });
                });
                document.getElementById('hidden').style.display = 'none';
                break;
            case 'Theatres':
                API.getHalls().then(obj => {
                    this.setState({
                        initialItems: obj.data,
                        routePath: 'halls'
                    });
                });
                document.getElementById('hidden').style.display = 'none';
                break;
            default:
                // Do nothing
                break;
        }
    }

    filterList(event) {

        let itemsArray = [];
        if (this.props.group === 'Select') {
            document.getElementById('hidden').style.display = 'block';
            return;
        }
        let totalList = this.state.initialItems;

        let filterPromise = new Promise((resolve, reject) => {
            totalList.filter((item, index) => {
                let name;
                if (this.props.group === 'Movies') {
                    name = item.movie_name
                } else {
                    name = item.hall_name
                }
                if (name.toLowerCase().search(event.target.value.toLowerCase()) !== -1) {
                    if (event.target.value === "") {
                        console.log('No Data:');
                        this.setState({
                            items: []
                        });
                        return [];
                    } else {
                        console.log('Data found:');
                        itemsArray.push(totalList[index]);
                    }
                }
                return item;
            });
            if (itemsArray.length > 0) {
                resolve(itemsArray);
            } else {
                if (event.target.value === "") {
                    return;
                }
                reject('No match found. Please correct and search again.');
            }
        });
        filterPromise.then((itemsArray) => {
            this.setState({ items: itemsArray });
            document.getElementById('hidden').style.display = 'none';
        }).catch((err) => {
            this.setState({ items: itemsArray });
            document.getElementById('hidden').innerHTML = err;
            document.getElementById('hidden').style.display = 'block';
        })
    }

    render() {
        return (
            <div className="filter-list">
                <form>
                    <fieldset className="form-group">
                        <input type="text" className="form-control form-control-lg"
                            placeholder={this.props.placeholder} onChange={this.filterList} />
                    </fieldset>
                </form>
                <Alert bsStyle="warning" id="hidden">
                    <strong>Warning!</strong> Please Select Movies or Theatres.
                </Alert>
                {
                    this.props.forStats && !this.state.isClicked &&
                    <ul> <StatsList items={this.state.items} />  </ul>
                }
                {
                    !this.props.forStats &&
                    <List items={this.state.items} routePath={this.state.routePath} />
                }

            </div>
        );
    }
}

class List extends Component {
    render() {
        let route = '/admin/' + this.props.routePath + '/';
        return (
            <ul className="list-group">
                {
                    this.props.items.map(function (item, index) {
                        return (
                            <Link className="list-group-item" to={route + item.id} data-category={item} key={index}>{item.movie_name || item.hall_name}</Link>
                        );
                    })
                }
            </ul>
        );
    }
}

class StatsList extends Component {
    render() {
        let route = '/admin/citywiserevenue/';
        return (
            <ul className="list-group">
                {
                    this.props.items.map(function (item, index) {
                        return (
                            <Link className="list-group-item" to={route + item.id} data-category={item} onClick = {()=>{this.setState({isClicked: true})}} key={index}>{item.movie_name}</Link>
                        );
                    })
                }
            </ul>
        );
    }
}

export default Search;