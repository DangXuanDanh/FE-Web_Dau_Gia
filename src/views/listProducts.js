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
import { CardActionArea, Stack } from '@mui/material';
import NumberFormat from 'react-number-format';
import Product from '../components/product';
import { useParams } from "react-router-dom";;
import Item from '../components/item';

import { axiosInstance, parseJwt } from '../utils/axios';
import reducer from '../reducers/HomeReducer';


export default function ListProducts(propsListProducts) {
  const queryParams = new URLSearchParams(window.location.search);
  const name = queryParams.get('name') || ""
  // Lay 5 san pham cao gia nhat
  const [resultByName, setData] = React.useState([]);
  

  async function searchByName() {
    const res = await axiosInstance.get(`sanpham/get/Name/`+name)
      setData(res.data)
    }

  const sortTangdan = () => {
    const cloneArray = resultByName.map(item => item);
    cloneArray.sort(function(a,b){
      return a.giakhoidiem-b.giakhoidiem
    })
    setData(cloneArray);
  };
  const sortGiamdan = () => {
    const cloneArray =  resultByName.map(item => item);
    cloneArray.sort(function(a,b){
      return b.giakhoidiem-a.giakhoidiem
    })

    setData(cloneArray);
  };


  React.useEffect(() => {
    searchByName()
  }, [])
  
  React.useEffect(() => {
    sortTangdan()
  }, [])
  return (
    <div>
      <Container>
        <br/>
        <Grid columnSpacing={2} container rowSpacing={2}>
          <br/>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Chip label="Giá tăng dần" variant="outlined" onClick={sortTangdan} />
              <Chip label="Giá giảm dần" variant="outlined" onClick={sortGiamdan} />
            </Stack>
          </Grid>
          {
             resultByName?.length > 0 && resultByName.map((item, index) => {
                return <Product
                  tensanpham={item.tensanpham}
                  giamuangay={item.giamuangay}
                  anhdaidien={item.anhdaidien}
                  masanpham={item.masanpham}
                  luot_ra_gia_hien_tai={item.luot_ra_gia_hien_tai}
                  giakhoidiem={item.giakhoidiem}
                />
              })
            }
        </Grid>
      </Container>
    </div>
  )
}
