import React from 'react';

import DetailHeader from "../components/detailHeader"
import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Detail(props) {
  return (
    <div className="detail">

      <BreadCrumb />

      <DetailHeader />

    </div>
  )
}
