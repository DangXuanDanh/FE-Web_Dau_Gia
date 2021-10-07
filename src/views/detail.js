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


import ReactQuill from "react-quill";

import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";


import reducer from '../reducers/detailReducer';
import reactDom from 'react-dom';

import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Detail({ id }) {
  id = 1

  const [state, dispatch] = React.useReducer(reducer, { data: {anhsanphams:[]}, history: [] });

  const [price, SetPrice] = React.useState('')

  const modules = {
    toolbar: false
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
  ];

  async function TryToBid() {
    const data = {
      masanpham: id,
      mataikhoan: 1,
      gia: price
    }

    SetPrice('')

    // validate then post

    await axiosInstance.post(`lichsudaugia/`, data);


    LoadHistory()
  }

  async function LoadDetail() {
    const res = await axiosInstance.get(`sanpham/${id}`);

    dispatch({
      type: 'init',
      payload: {
        data: res.data,
      }
    });

  }

  async function LoadHistory() {
    const history = await axiosInstance.get(`lichsudaugia/sanpham/${id}`);

    dispatch({
      type: 'init_history',
      payload: {
        history: history.data,
      }
    });
  }

  React.useEffect(() => {
    LoadDetail()
    LoadHistory()
  }, [])

  return (
    <div className="detail">
      <Container>

        <BreadCrumb />


        <div>

          <Typography variant="subtitle1" gutterBottom component="div">
            {
              state.data.tensanpham
            }
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              {
                // console.log(state.data.anhsanphams)
                state.data.anhsanphams.map((element, i) =>
                  <div key={i}>
                    <img src={element.url} alt="Stickman" width="222" height="222"></img>
                  </div>
                )
              }

            </Grid>
            <Grid item xs={6}>

              <Typography variant="subtitle1" gutterBottom component="div">
                Giá:
                {
                  state.data.giamuangay
                }
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Bước giá:
                {
                  state.data.buocgia
                }
              </Typography>



              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input onChange={e => SetPrice(e.target.value)}
                  type="number"
                  id="standard-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                <Button onClick={TryToBid}>
                  Đấu giá
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={2}>

              ----<br />
              Thoi gian<br />
              -----

              <Typography variant="subtitle1" gutterBottom component="div">
                Lịch sử đấu giá gần đây
              </Typography>

              {
                state.history.map((element, i) =>
                  <div key={i}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Mã tài khoản: {element.mataikhoan}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Giá: {element.gia}
                    </Typography>
                  </div>
                )
              }
            </Grid>
          </Grid>

          
          <Typography variant="subtitle1" gutterBottom component="div">
            Mô tả
          </Typography>
          <ReactQuill
            value={state.data.mota}
            readOnly={true}
            modules={modules}
            formats={formats}
            // onChange={null}
          />
          {/* <Grid container>

</Grid> */}

          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/HTML5_logo_resized.svg/300px-HTML5_logo_resized.svg.png"/> */}




          {/* <Button onClick={()=>{dispatch({type:'change_id',payload:{id: 13123}})}}>
    Đấu giá
  </Button> */}

        </div>



      </Container>

    </div>
  )
}
