import React, { Component, ReactDOM } from 'react';
import { Redirect } from 'react-router';
import './App.css';
var parser = require('mongo-parse');


class ReactLogin extends Component {
    userStruct = {
        email: "",
        password: "",
        firstname:"",
        lastname:"",
        addrsss:"",
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: ''
      };
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        user: this.userStruct,
        email: "",
        password: "",
        firstname:"",
        lastname:"",
        addrsss:"",
        statusText: ""
      };
      this.onFormChange = this.onFormChange.bind(this)
      this.loginWithEmail = this.loginWithEmail.bind(this);
    }

    async componentDidMount() {
    
        // const response = await fetch('/api/employer');
        // const body = await response.json();
        // //parse hal json from mongodb server.
        // var parse = parser.parse(body)
        // //mapping each embedded data into a json object
        // var myJson = parse.map(function(field, stringId) {
        //   if(field === 'userId')
        //    return stringId
        //   }
        // )
        // var employerData = myJson["_embedded"]["employer"]
        // this.setState({groups: employerData})
        // const jsonData = this.state.groups.map(employer =>
		// 	this.setState({  firstname: employer["firstName"], 
        //                 lastname: employer["lastName"],
        //                 addrsss: employer["address"],
        //                  isLoading: false })
		// );
        
    }

    onFormChange(event){
        const target = event.target
        const data  = target.value
        const name  = target.name
        let user = {...this.state.user}
        user[name] = data
        this.setState({user: user})
    }

    async loginWithEmail(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append('username', this.state.user['email']);
        formData.append('password',  this.state.user['password'] )
        console.log("payload" +  this.state.user['email']  + this.state.user.password)
        const response = await fetch('/login', { formData} );
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin' : '127.0.0.1:3000'},
        //     body: formData
        // };
        //const response = await fetch('/api/user', requestOptions  );
 
        

       const data  = await response.json
         //console.log(data)
         this.setState({ statusText: response.statusText})
       // Promise.resolve(response)
    }

    render() {
        const arg1 = this.state.user.email
        const arg2 = this.state.user.password
        return (
            <div class="content">
               <p>user login 
               </p>
                {/* <div>{this.state.firstname}
                <p>{this.state.lastname}</p>
                </div> */}

                <h2>HTML Forms</h2>
                {/* onSubmit={this.loginWithEmail}   action="/login"  */ }
                <form method="post" onSubmit={this.loginWithEmail} >
                    <label for="fname">User Email:</label><br />
                    <input class="form-control" onChange={this.onFormChange} type="text" 
                    id="username" name="email" value={arg1 || ''}  /><br />
                    <label for="fname">Password:</label><br />
                    <input class="form-control" onChange={this.onFormChange} type="password" 
                    id="password" name="password" value={arg2 || ''}  /><br />
                   
                    <input type="submit" value="Submit" />
                </form> 
                {this.state.statusText}
            </div>
        )
    }
    
}

export default ReactLogin;