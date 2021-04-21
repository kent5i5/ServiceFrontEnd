import React, { Component, ReactDOM} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import '../services/AccountServices';
import AccountService from '../services/AccountServices';

const API_URL = "/api"

class Chat extends Component {
    state = {
      isLoading: true,
      groups: [],
      firstname:"",
      lastname:"",
      addrsss:""
    };

    async componentDidMount() {

        //AccountService.getAccount()
    }

    // if (isLoading) {
      
    //     return (<div>{firstname} {lastname} {address}
    //         <p>Loading...</p>
            
    //         </div>
    //     )
    // }

    render(){
        return(
            <div class="content"> <h1> Chat </h1>
            </div>
        )
    }
}

export default Chat;