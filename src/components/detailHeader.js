import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import { axiosInstance } from '../utils/axios';
import reducer from '../reducers/DetailReducer';


export default function DetailHeader({id}) {

  id = 11

  const [state, dispatch] = React.useReducer(reducer, {data:{}});

  React.useEffect(()=>{
    async function Load(){
      const res = await axiosInstance.get(`sanpham/${id}`);

      dispatch({
        type: 'init',
        payload: {
          data: res.data,
        }
      });
    }

    Load()
  },[])

  return (
      <div>
      <Typography variant="subtitle1" gutterBottom component="div">
        {
          state.data.tensanpham
        }
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {
          state.data.mota
        }
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {
          state.data.giamuangay
        }
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
        {
          state.data.buocgia
        }
      </Typography> 


        {/* <Button onClick={()=>{dispatch({type:'change_id',payload:{id: 13123}})}}>
asdas
        </Button> */}
      </div>
  );
}
