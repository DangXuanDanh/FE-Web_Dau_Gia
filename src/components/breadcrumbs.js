import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function BreadCrumb(props) {


    return (

<Breadcrumbs my={2} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    Home
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href={"/category?id="+props.madanhmuc}
  >
    {
      props.tendanhmuc
    }
  </Link>
  <Typography color="text.primary">{props.tensanpham}</Typography>
</Breadcrumbs>


    )
}