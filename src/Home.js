import logo from './logo.svg';
import './App.css';
import ReactLogin from './ReactLogin';
import React, { Component, ReactDOM} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
var parser = require('mongo-parse');


class Home extends Component {
  state = {
    isLoading: true,
    groups: [],
    firstname:"",
    lastname:"",
    addrsss:"",
    password: ""
  };

  async componentDidMount() {
    let formData = new FormData();
        formData.append('username', this.state.firstname);
        formData.append('password',  this.state.password)
        const userdata = await fetch('/login', { formData} );
    
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

    if (isLoading) {
      
      return (<div>{firstname} {lastname} {address}
          <p>Loading...</p>
          
          </div>
      )
    }
    const employers = this.state.groups.map(account =>
			<Employer Key={account._links.self.href} apiUrl={account._links.self.href} data={account}/>
		);
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2>User List</h2>
           { <h3> {employers}</h3> }
          
          </div>
          <Link  to="/user">Login</Link>
          <Link  to="/chat">Chat </Link>

         
        </header>

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
            <div>
            
			<tr>
				<td>
          {/* <a href={this.props.apiUrl}>
            {this.props.data.name}

          </a> */}
          {this.props.data.name}
          </td>
				<td>{this.props.data.address}</td>
            
			</tr>

            
            </div>
		)
	}
}

export default Home;

