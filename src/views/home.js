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
