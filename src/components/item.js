import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useState } from 'react';
import Grid from '@mui/material/Grid';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Item(props) {

  // const [state, dispatch] = React.useReducer(reducer, {});

  const [data, setData] = useState(0);

  React.useEffect(() => {
    LoadInfo()
  }, [])

  async function LoadInfo() {
    const res = await axiosInstance.get(`sanpham/${props.idi}`).then((a) => {

      setData(a.data)
    });
  }

  return (
    <Link underline="hover" color="inherit" href={"/detail?id=" + props.idi}>

      <Grid container spacing={4}>
        <Grid item xs={4}>
          <img src={data.anhdaidien} alt="Stickman" width="222" height="222"></img>

        </Grid>
        <Grid item xs={8}>

          <Typography color="text.primary">
            {data.tensanpham}
          </Typography>
        </Grid>
      </Grid>

    </Link>


  )
}