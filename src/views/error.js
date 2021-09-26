import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../../utils/axios';

import {
  useLocation
} from "react-router-dom";

export default function Error(props) {
  let location = useLocation();

    return (
      <div className="container">
        404
        .
        <h3>
        No match for <code>{location.pathname}</code>
      </h3>
      </div>
    )
  }
  

  