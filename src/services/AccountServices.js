import React, { Component, ReactDOM} from 'react';

import axios from'axios';

const API_URL = "/api"

class AccountService {

    getAccountInfo(){

       return axios(API_URL+ "/account")
    }

    login(){

    }
}

export default AccountService;