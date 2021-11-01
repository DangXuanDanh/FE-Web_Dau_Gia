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


// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../utils/axios';

import Item from '../components/item';

import { axiosInstance, parseJwt } from '../utils/axios';
import reducer from '../reducers/HomeReducer';


export default function Home(props) {

  const [state, dispatch] = React.useReducer(reducer, {data:[]});
  const handleClick = (event) => {
    
  };
  React.useEffect(() => {
    LoadInfo()
  }, [])

  async function LoadInfo() {
    const res = await axiosInstance.get(`sanpham/get/New`).then((a) => {
      dispatch({
        type: 'init',
        payload: {
          data: a.data,
        }
      });
    });
  }
//Lay danh muc
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    loadCategory()
  }, [])
  async function loadCategory() {
    const res = await axiosInstance.get(`danhmuc`).then((a) => {
      setData(a.data)
    });
  }
// Lay 5 san pham cao gia nhat
const [productMaxPrice, setproductMaxPrice] = React.useState([]);
React.useEffect(() => {
  loadproductMaxPrice()
}, [])
async function loadproductMaxPrice() {
  const res = await axiosInstance.get(`sanpham/get/MaxPrice`).then((a) => {
    setproductMaxPrice(a.data)
  });
}
  return (
    <div>
      <Container>
        <Grid container spacing={1}>
          <Grid sx={{ py: [4,4], mx:[0,3] }}>
            <Chip label="Home" onClick={handleClick} />
          </Grid>
          {
            data.map((item, index) => {
              return <Grid sx={{ py: 4, mx:[0,3] }}>
                <Chip
                value={item.madanhmuc}
                label={item.tendanhmuc}
                onClick={handleClick} />
              </Grid>
            })
          }
        </Grid>
        <Typography variant="subtitle1" gutterBottom component="h4">
            Top 5 Products With The Highest Prices 
          </Typography>
        <div style={{display:"flex"}}>
          <Card sx={{ maxWidth: 345 }} style={{margin:30}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="http://res.cloudinary.com/auction1190/image/upload/v1635599430/irejfiyccaadgaklalcw.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }} style={{margin:30}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="http://res.cloudinary.com/auction1190/image/upload/v1635599430/irejfiyccaadgaklalcw.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }} style={{margin:30}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="http://res.cloudinary.com/auction1190/image/upload/v1635599430/irejfiyccaadgaklalcw.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }} style={{margin:30}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="http://res.cloudinary.com/auction1190/image/upload/v1635599430/irejfiyccaadgaklalcw.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ maxWidth: 345 }} style={{margin:30}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="http://res.cloudinary.com/auction1190/image/upload/v1635599430/irejfiyccaadgaklalcw.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </div>
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
            {
                state.data.map((element, i) =>
                <Item key={i} idi={element.masanpham} />
                )
              }
            

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
