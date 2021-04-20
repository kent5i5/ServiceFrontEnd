import React, { Component, ReactDOM} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';

class Chat extends Component {
    state = {
      isLoading: true,
      groups: [],
      firstname:"",
      lastname:"",
      addrsss:""
    };

    async componentDidMount() {
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