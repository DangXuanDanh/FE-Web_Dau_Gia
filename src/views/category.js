import StarIcon from '@mui/icons-material/StarBorder';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import Product from '../components/product';

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../utils/axios';

import Item from '../components/item';

import { axiosInstance, parseJwt } from '../utils/axios';
import reducer from '../reducers/HomeReducer';

import BreadCrumb from "../components/breadcrumbs"

export default function Category(props) {

  const queryParams = new URLSearchParams(window.location.search);
  const idDanhMuc = queryParams.get('id') || 1

  const [state, dispatch] = React.useReducer(reducer, { danhmuc: {}, data: [] });

  React.useEffect(() => {
    LoadInfo()
  }, [])

  async function LoadInfo() {
    const res = await axiosInstance.get(`sanpham/get/New/` + idDanhMuc).then(async (a) => {
      dispatch({
        type: 'init',
        payload: {
          data: a.data,
        }
      });

      await axiosInstance.get(`danhmuc/` + idDanhMuc).then(async (danhmuc) => {

        if (danhmuc.data.madanhmuccha) {
          const danhmuccha = await axiosInstance.get(`danhmuc/` + danhmuc.data.madanhmuccha)
          danhmuc.data.tendanhmuccha = danhmuccha.data.tendanhmuc
        }

        dispatch({
          type: 'danhmuc',
          payload: {
            data: danhmuc.data,
          }
        });

      })

    });
  }

  return (
    <div>
      <Container>
        <BreadCrumb madanhmuc={state.danhmuc.madanhmuc} tendanhmuc={state.danhmuc.tendanhmuc} madanhmuccha={state.danhmuc.madanhmuccha} tendanhmuccha={state.danhmuc.tendanhmuccha} />


        <Grid container spacing={4}>

          <Grid item xs={8}>
            <Typography variant="subtitle1" gutterBottom component="div">
              Sort bar
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              Product List::::::
            </Typography>
            {/* <Item id="48" />
            <Item id="51" />
            <Item id="3" /> */}
      <Container>
        <Grid container>

            {
              state.data.map((element, i) =>
              <Product key={i}
              tensanpham={element.tensanpham}
              giamuangay={element.giamuangay}
              anhdaidien={element.anhdaidien}
              masanpham={element.masanpham}
              />
              )
            }
        </Grid>
        </Container>


            {/* <Link href="detail">
          <Button variant="contained">
            product 1
          </Button>
        </Link>
        <Link href="detail">
          <Button>
            product 2
          </Button>
        </Link> */}

            <Typography variant="subtitle1" gutterBottom component="div">
              Pagination
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
