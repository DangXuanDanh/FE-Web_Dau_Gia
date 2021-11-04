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
  {
    props.tendanhmuccha ?   <Link
    underline="hover"
    color="inherit"
    href={"/category?id="+props.madanhmuccha}
  >
    {
      props.tendanhmuccha
    }
  </Link> : undefined
  }
  <Link
    underline="hover"
    color="inherit"
    href={"/category?id="+props.madanhmuc}
  >
    {
      props.tendanhmuc
    }
  </Link>
{ props.tensanpham ? <Typography color="text.primary">{props.tensanpham}</Typography> : undefined}
</Breadcrumbs>


    )
}