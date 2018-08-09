import React, {Component} from 'react';
import Search from './Search';
import NavBar from './Navigation';
import HallForm from './HallForm';
import * as API from '../../api/API';
import CommonHeader from '../header/CommonHeader';
import '../MovieHall/subheader.css';

class EditHallForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            group: '',
            allScreens: [],
            isCompMounted: false
        };
    }
    componentDidMount(){
        API.getScreensByHall({hallId: this.props.match.params.hallId}).then((result)=>{
            console.log(`Result Screens: ${JSON.stringify(result)}`);
            this.setState({
                allScreens : result.data,
                group: 'Theatres',
                isCompMounted: true
            })
        });
    }
    render(){
        return (
            <div className="admin-sub-header">  
                <CommonHeader />
                <NavBar />
                {
                    this.state.isCompMounted && 
                    <HallForm 
                    hallId={this.props.match.params.hallId}
                    allScreens={this.state.allScreens}
                    />
                }
            </div>
        );
    }
}
  
export default EditHallForm;