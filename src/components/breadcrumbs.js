import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function BreadCrumb() {
    return (

<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    Home
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href="/getting-started/installation/"
  >
    Car
  </Link>
  <Typography color="text.primary">Breadcrumbs</Typography>
</Breadcrumbs>


    )
}