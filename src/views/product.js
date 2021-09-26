import React from 'react';

import Detail from "../components/detail"
import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Product(props) {
  return (
    <div className="product">

      <BreadCrumb />

      <Detail />

    </div>
  )
}
