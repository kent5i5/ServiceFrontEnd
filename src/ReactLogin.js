import React, { Component, ReactDOM } from 'react';
import './App.css';
var parser = require('mongo-parse');


class ReactLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        groups: [],
        firstname:"",
        lastname:"",
        addrsss:"",
        statusText: ""
      };

      this.loginWithEmail = this.loginWithEmail.bind(this);
    }

    async componentDidMount() {
    
        const response = await fetch('/api/employer');
        const body = await response.json();
        //parse hal json from mongodb server.
        var parse = parser.parse(body)
        //mapping each embedded data into a json object
        var myJson = parse.map(function(field, stringId) {
          if(field === 'userId')
           return stringId
          }
        )
        var employerData = myJson["_embedded"]["employer"]
        this.setState({groups: employerData})
        const jsonData = this.state.groups.map(employer =>
			this.setState({  firstname: employer["firstName"], 
                        lastname: employer["lastName"],
                        addrsss: employer["address"],
                         isLoading: false })
		);
        
    }

    async loginWithEmail(event){
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept': 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: "ana@ow.com" })
        };
        const response = await fetch('/api/user', requestOptions  );
          
       const data  = await response.json
         console.log(response.body)
         this.setState({ statusText: response.statusText})
       // Promise.resolve(response)
        
    }

    render() {
        
        return (
            <div>
               <p>user login 
               </p>
                <div>{this.state.firstname}
                <p>{this.state.lastname}</p>
                </div>

                <h2>HTML Forms</h2>

                <form method="post" onSubmit={this.loginWithEmail}>
                    <label for="fname">First name:</label><br />
                    <input class="form-control" type="text" id="fistname" name="firstname" value="ana@ow.com"  /><br />
                   
                    <input type="submit" value="Submit" />
                </form> 
                {this.state.statusText}
            </div>
        )
    }
    
}

export default ReactLogin;