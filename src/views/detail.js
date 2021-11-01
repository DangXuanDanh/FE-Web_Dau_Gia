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
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';


import ReactQuill from "react-quill";

import Item from '../components/item';

import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";


import { formatDuration, intervalToDuration } from 'date-fns';

import reducer from '../reducers/DetailReducer';
import reactDom from 'react-dom';

import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';
import { StaticTimePicker } from '@mui/lab';

export default function Detail(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const idProduct = queryParams.get('id') || 1
  const idUser = JSON.parse(localStorage.getItem('user')).mataikhoan || 13

  const [state, dispatch] = React.useReducer(reducer, { relatedProduct: [], data: { mota: '', taikhoan: {}, anhsanphams: [], giacuoc: 0, danhmuc: {} }, history: [], error: {}, popup: { open: false, type: 'success', mess: 'auct successfully' } });

  const modules = {
    toolbar: false,
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
      masanpham: idProduct,
      mataikhoan: idUser,
      gia: state.data.giacuoc,
    }

    // SetPrice(0)

    // validate then post

    let val = {
      open: false,
      type: 'error',
      mess: 'something went wrong'
    }

    if (!!state.error.giacuoc || state.error.giacuoc != '' || parseInt(state.data.giacuoc) == 0) {
      val.open = true
      val.mess = 'validation error'
      SetPrice(state.data.giacuoc)
      handleClick(val)
      return;
    }

    await axiosInstance.post(`lichsudaugia/`, data).then(res => {
      // console.log(res.data)
      val = {
        open: true,
        type: res.data.status == true ? 'success' : 'error',
        mess: res.data.messenger
      }
    });


    await LoadHistory()
    SetPrice(0)
    dispatch({
      type: 'reset'
    });

    handleClick(val)
  }

  function SetPrice(value) {
    dispatch({
      type: 'giacuoc',
      payload: {
        data: value,
      }
    });
  }

  async function LoadDetail() {
    const res = await axiosInstance.get(`sanpham/${idProduct}`).then(async e => {
      e.data.giacuoc = 0
      e.data.thoigian /= 1000
      dispatch({
        type: 'init',
        payload: {
          data: e.data,
        }
      });

      await axiosInstance.get(`sanpham/get/New/${e.data.masanpham}/${e.data.madanhmuc}`).then(r => {
        dispatch({
          type: 'sanphamtuongtu',
          payload: {
            data: r.data,
          }
        });
      })
    });
  }


  function tiktok() {
    dispatch({
      type: 'tick',
    });
  }

  async function LoadHistory() {
    const history = await axiosInstance.get(`lichsudaugia/sanpham/${idProduct}`);

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
    setInterval(tiktok, 1000);
  }, [])

  function HideName(name) {
    let a = name.split(' ')
    let index = a.length - 1 >= 0 ? a.length - 1 : 0
    return "****" + a[index]
  }

  const handleClick = (val) => {
    dispatch({
      type: 'popup',
      payload: {
        data: val,
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
      type: 'popup',
      payload: {
        data: false,
      }
    });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="detail">
      <Container>

        <BreadCrumb tensanpham={state.data.tensanpham} madanhmuc={state.data.madanhmuc} tendanhmuc={state.data.danhmuc.tendanhmuc} />


        <div>

          <Typography variant="subtitle1" gutterBottom component="div">
            {
              state.data.tensanpham
            }
          </Typography>

          <Typography variant="caption" gutterBottom component="div">
            {
              state.data.taikhoan.hoten
            }
          </Typography>

          <Typography variant="caption" gutterBottom component="div">
            Điểm đánh giá:
            {
              " " + (state.data.taikhoan.danhgiatot || 0)
            }
            |
            {
              state.data.taikhoan.danhgiaxau || 0
            }
          </Typography>

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <img src={state.data.anhdaidien} alt="Stickman" width="222" height="222"></img>

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

              <Typography variant="caption" gutterBottom component="div">
                Ngày đăng sản phẩm:
                {
                  " " + state.data.ngaydang
                }
              </Typography>
              <Typography variant="caption" gutterBottom component="div">
                Người giữ giá hiện tại:
                {
                  state.history.length > 0 ? (" " + state.history[0].taikhoan.hoten + " " + (state.history[0].taikhoan.danhgiatot || 0) + "|" + (state.history[0].taikhoan.danhgiaxau)) || 0 : undefined
                }
              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                Giá khởi điểm:
                {
                  " "+new Intl.NumberFormat().format(state.data.giakhoidiem)
                } vnđ
              </Typography>
              {

                state.data.giamuangay ? <Typography variant="subtitle1" gutterBottom component="div">
                  Giá mua ngay:
                  {
                    " "+new Intl.NumberFormat().format(state.data.giamuangay)
                  } vnđ
                </Typography> : undefined

              }
              <Typography variant="subtitle1" gutterBottom component="div">
                Giá hiện tại:
                {
                  " "+ (state.history.length > 0 ? new Intl.NumberFormat().format(state.history[0].gia) : new Intl.NumberFormat().format(state.data.giakhoidiem))
                } vnđ
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Bước giá:
                {
                  " "+ new Intl.NumberFormat().format(state.data.buocgia)
                } vnđ
              </Typography>



              <FormControl sx={{ m: 1 }} variant="standard">
                {/* <InputLabel htmlFor="standard-adornment-amount">Giá cược</InputLabel> */}
                <TextField error={!!state.error.giacuoc} helperText={state.error.giacuoc}
                  value={state.data.giacuoc}
                  label="Giá cược"
                  onChange={e => SetPrice(e.target.value)}
                  type="number"
                  id="standard-adornment-amount"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">vnđ</InputAdornment>,
                  }}
                />
                <Button onClick={TryToBid}>
                  Đấu giá
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={2}>

              ----<br />
              {
                state.data.thoigianconlai || ''
              }
              <br />
              -----

              <Typography variant="subtitle1" gutterBottom component="div">
                Lịch sử đấu giá gần đây:
              </Typography>

              {
                state.history.map((element, i) =>
                  <div key={i}>
                    <Divider/>
                    <Typography variant="caption" gutterBottom component="div">
                      Thời điểm: {element.ngaydaugia}
                    </Typography>
                    <Typography variant="caption" gutterBottom component="div">
                      Người mua: {HideName(element.taikhoan.hoten)}
                    </Typography>
                    <Typography variant="caption" gutterBottom component="div">
                      {new Intl.NumberFormat().format(element.gia)} vnđ
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
          // onChange={undefined}
          />
          {/* <Grid container>

</Grid> */}

          <br />
          <br />
          <br />
          Sản phẩm tương tự:
          {
            state.relatedProduct.map((element, i) =>
              <Item key={i} idi={element.masanpham} />
            )
          }
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/HTML5_logo_resized.svg/300px-HTML5_logo_resized.svg.png"/> */}




          {/* <Button onClick={()=>{dispatch({type:'change_id',payload:{id: 13123}})}}>
    Đấu giá
  </Button> */}

        </div>

        <Snackbar
          open={state.popup.open}
          autoHideDuration={2500}
          onClose={handleClose}
          message="Note archived"
          action={action}
        >
          <Alert onClose={handleClose} severity={state.popup.type} sx={{ width: '100%' }}>
            {state.popup.mess}
          </Alert>
        </Snackbar>

      </Container >

    </div >
  )
}
