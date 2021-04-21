import logo from './logo.svg';
import './App.css';
import ReactLogin from './ReactLogin';
import React, { Component, ReactDOM} from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Chat from './components/Chat';

import axios from 'axios'
var parser = require('mongo-parse');


class App extends Component {
  state = {
    isAuthenciated: false,
    isLoading: true,
    groups: [],
    firstname:"",
    lastname:"",
    addrsss:""
  };

  async componentDidMount() {
    
    // Proxy set to server Url
    const response = await fetch('/api/account/');
    const body = await response.json();
    //parse hal json from mongodb server.
    var parse = parser.parse(body)
    //mapping each embedded data into a json object
    var myJson = parse.map(function(field, stringId) {
      if(field === 'userId')
       return stringId
      }
    )
    var employerData = myJson["_embedded"]["account"]
    this.setState({ groups: employerData , firstname: parse["firstName"], 
                    lastname: parse["lastName"],
                    addrsss: body["address"],
                     isLoading: false });
  }


  render() {
    
    const {groups, isLoading, firstname, lastname,address} = this.state;

    // if (isLoading) {
      
    //   return (<div>{firstname} {lastname} {address}
    //       <p>Loading...</p>
          
    //       </div>
    //   )
    // }

    const employers = this.state.groups.map(account =>
			<Employer Key={account._links.self.href} apiUrl={account._links.self.href} data={account}/>
		);
    return (
      <div className="App">
        <header className="App-header">
          
          <div className="App-intro">
            
           { <h3> {employers}</h3> }
           <ReactLogin></ReactLogin>
          </div>

         
        </header>


        <Router>
        <Switch>
          <Route path='/'exact={true}  >{this.state.isAuthenciated ? <Redirect to="/home" /> : <Redirect to="/" />}</Route>
          <Route path='/home' exact={true} component={ Home }/>
          {/* <Route path='/user' exact={true} component={ ReactLogin }/> */}
          <Route path='/chat' exact={true} component={Chat}/>
        </Switch>
      </Router>
      </div>
    );
  }
  
}

class Employer extends React.Component{
  state = {
    firstname:"",
    lastname:"",
    addrsss:"",
    name: "",
  };

	render() {
		return (
			<tr>
				<td>
          {/* <a href={this.props.apiUrl}>
            {this.props.data.name}

          </a> */}
          {this.props.data.name}
          </td>
				<td>{this.props.data.address}</td>
        
			</tr>
		)
	}
}

export default App;

