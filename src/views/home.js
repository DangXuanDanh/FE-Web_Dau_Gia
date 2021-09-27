import React from 'react';

import {
  Link
} from 'react-router-dom';


import Button from '@mui/material/Button';
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../utils/axios';

import '../App.css';



import logo from '../logo.svg';

export default function Home(props) {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     

      <Link to="detail">
        <Button variant="contained">
          product 1
        </Button>
      </Link>
      <Link to="detail">
        <Button>
          product 2
        </Button>
      </Link>
    </div>
  )
}
