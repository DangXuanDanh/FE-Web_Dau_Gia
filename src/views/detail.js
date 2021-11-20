import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, Divider } from '@mui/material';
import { useParams } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Product from '../components/product';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import BlockIcon from '@mui/icons-material/Block';

import ReactQuill from "react-quill";

import Item from '../components/item';

import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";


import { formatDuration, intervalToDuration, startOfYesterday } from 'date-fns';

import reducer from '../reducers/DetailReducer';
import reactDom from 'react-dom';

import BreadCrumb from "../components/breadcrumbs"

import { axiosInstance, parseJwt } from '../utils/axios';
import { StaticTimePicker } from '@mui/lab';
import { border } from '@mui/system';

export default function Detail(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const { idProduct } = useParams() || 1
  const idUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).mataikhoan : 13

  const [state, dispatch] = React.useReducer(reducer, { yeuthich: false, relatedProduct: [], data: { mota: '', taikhoan: {}, anhsanphams: [], giacuoc: 0, danhmuc: {} }, history: [], error: {}, popup: { open: false, type: 'success', mess: 'auct successfully' } });

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

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
    setOpen(false);

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

  async function YeuThich() {
    if (state.yeuthich == false) {
      await axiosInstance.post(`yeuthich`, {
        masanpham: idProduct,
        mataikhoan: idUser
      })
    } else {
      await axiosInstance.delete(`yeuthich/find/${idUser}/${idProduct}`)
    }
    dispatch({
      type: 'yeuthich',
    });
  }

  async function Deny(){
    await axiosInstance.get(`lichsudaugia/deny/${state.history[0].taikhoan.mataikhoan}/${idProduct}`)
    LoadDetail()
    LoadHistory()
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

      const yeuthich = await axiosInstance.get(`yeuthich/find/${idUser}/${idProduct}`).then((res) => {
        if (res.data) {
          if (res.data.mayeuthich) {
            dispatch({
              type: 'yeuthich',
            });
          }
        }
      })


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
  const user = localStorage.getItem('user');
  return (
    <div className="detail">
      <Container>
        <BreadCrumb tensanpham={state.data.tensanpham} madanhmuc={state.data.madanhmuc} tendanhmuc={state.data.danhmuc.tendanhmuc} />
        <div>
          <Typography variant="h6" gutterBottom component="div">
            {
              state.data.tensanpham
            }
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <AliceCarousel autoPlay autoPlayInterval="3000">
                <img src={state.data.anhdaidien} />
                <img src={state.data.anhdaidien} />
                <img src={state.data.anhdaidien} />
                <img src={state.data.anhdaidien} />
                {/* {state.data.anhsanphams.map((each, index) => (
                      <Image
                      className="sliderimg"
                      centered
                      src={each.url}/>))} */}
              </AliceCarousel>
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

                {state.history.length && idUser == state.data.manguoidang ? <Button onClick={() => { Deny() }}>  <BlockIcon /> </Button> 
                :""}

              </Typography>

              <Typography variant="subtitle1" gutterBottom component="div">
                Giá khởi điểm:
                {
                  " " + new Intl.NumberFormat().format(state.data.giakhoidiem)
                } vnđ
              </Typography>
              {
                state.data.giamuangay ? <Typography variant="subtitle1" gutterBottom component="div">
                  Giá mua ngay:
                  {
                    " " + new Intl.NumberFormat().format(state.data.giamuangay)
                  } vnđ
                </Typography> : undefined
              }
              <Typography variant="subtitle1" gutterBottom component="div">
                Giá hiện tại:
                {
                  " " + (state.history.length > 0 ? new Intl.NumberFormat().format(state.history[0].gia) : new Intl.NumberFormat().format(state.data.giakhoidiem))
                } vnđ
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Bước giá:
                {
                  " " + new Intl.NumberFormat().format(state.data.buocgia)
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
                <Button variant="contained" onClick={handleDialogOpen}>
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
                    <Divider />
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

          <br />

          <Button onClick={() => YeuThich()}>
            {state.yeuthich == true ? <FavoriteIcon /> : ""}
            {state.yeuthich == true ? " Bỏ yêu thích" : ""}

            {state.yeuthich == false ? <FavoriteBorderIcon /> : ""}
            {state.yeuthich == false ? " Yêu thích" : ""}
          </Button>
          <br />

          <Typography variant="subtitle1" gutterBottom component="div">
            {"Mô tả "}
            {
              idUser == state.data.manguoidang ? <Button variant="outlined" onClick={undefined}>
                Sửa mô tả
              </Button> : undefined
            }

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
          <Container>
            <Grid container>

              {
                state.relatedProduct.map((element, i) =>
                  <Product key={i}
                    tensanpham={element.tensanpham}
                    giamuangay={element.giamuangay}
                    anhdaidien={element.anhdaidien}
                    masanpham={element.masanpham}
                    stay={true}
                  />
                )
              }

            </Grid>
          </Container>
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

        <div>
          <Dialog
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Xác nhận đấu giá?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn đồng ý đấu giá sản phẩm <b>{state.data.tensanpham}</b> với mức giá <b>{new Intl.NumberFormat().format(state.data.giacuoc)} vnđ</b>?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Khoan đã!</Button>
              <Button onClick={TryToBid} autoFocus>
                Đồng ý
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </Container >

    </div >
  )
}
