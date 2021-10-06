import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';

import axios from 'axios';

import reducer from '../reducers/PostReducer';

import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Post(props) {

  const [state, dispatch] = React.useReducer(reducer, { data: {}, error: {}, danhmuc: [] });

  async function LoadDanhMuc() {
    const res = await axiosInstance.get(`danhmuc`);
    dispatch({
      type: 'init',
      payload: {
        danhmuc: res.data,
      }
    });
  }

  function Input(e) {
    dispatch({
      type: e.target.name,
      payload: {
        data: e.target.value,
      }
    });
  }

  function SetError(name, value) {
    dispatch({
      type: name,
      payload: {
        data: value,
      }
    });
  }

  function Validate() {
    // show err that those fields
    let flag = true
    if (!state.data.tensanpham || state.data.tensanpham == '') {
      SetError("tensanpham", state.data.tensanpham)
      flag = false
    }
    if (!state.data.madanhmuc || state.data.madanhmuc == '') {
      SetError("madanhmuc", state.data.madanhmuc)
      flag = false
    }
    if (!state.data.giakhoidiem || state.data.giakhoidiem % 50 > 0 || state.data.giakhoidiem < 50) {
      SetError("giakhoidiem", state.data.giakhoidiem)
      flag = false
    }
    if (!!state.data.giamuangay && (state.data.giamuangay % 50 > 0 || state.data.giamuangay < 50)) {
      SetError("giamuangay", state.data.giamuangay)
      flag = false
    }
    if (!state.data.buocgia || state.data.buocgia % 50 > 0 || state.data.buocgia < 50) {
      SetError("buocgia", state.data.buocgia)
      flag = false
    }

    return flag
  }

  async function Submit() {
    if (Validate() == false)
      return;

    console.log(state.data)
    //submit data from state.data
    const res = await axiosInstance.post(`/sanpham`, state.data);
  }

  React.useEffect(() => {
    LoadDanhMuc()
  }, [])


  return (
    <div>
      <Container>

        <BreadCrumb />

        <Typography variant="h6" component="h2">
          Post new Auction
        </Typography>

        <Divider />
        <br />

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            {/* <TextField name='1c2c1' onChange={(e)=>console.log(e.target.name)} error={true} helperText="" required id="outlined-basic" label="Tiêu đề" variant="outlined" />
            <br /> */}
            <TextField name="tensanpham" onChange={e => Input(e)} error={!!state.error.tensanpham} helperText={state.error.tensanpham} required id="outlined-basic" label="Tên sản phẩm" variant="outlined" />
            <br />
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="madanhmuc"
                // value={state.danhmuc[0]}
                label="Danh mục"
                onChange={e => Input(e)}
                error={!!state.error.madanhmuc} helperText={state.error.madanhmuc} required
              >
                {
                  state.danhmuc.map((element, i) =>
                    <MenuItem key={i} value={element.madanhmuc}>
                      {
                        element.tendanhmuc
                      }
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <br />

            <TextField required
              id="outlined-number"
              label="Giá khởi điểm"
              type="number"
              name="giakhoidiem" onChange={e => Input(e)}
              error={!!state.error.giakhoidiem} helperText={state.error.giakhoidiem} required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              id="outlined-number"
              name="giamuangay" onChange={e => Input(e)}
              label="Giá mua ngay"
              error={!!state.error.giamuangay} helperText={state.error.giamuangay}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField required
              id="outlined-number"
              label="Bước giá"
              type="number"
              name="buocgia" onChange={e => Input(e)}
              error={!!state.error.buocgia} helperText={state.error.buocgia} required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Box>
        <br />
        <DateTimePicker
          name="ngayketthuc"
          renderInput={(props) => <TextField {...props} />}
          label="Thời gian kết thúc"
          value={state.data.ngayketthuc}
          minDate={state.error.minDate}
          onChange={(datetime) => {
            const a = {
              target: {
                name: "ngayketthuc",
                value: datetime
              }
            }
            Input(a)
          }}
        />
        <br />
        <FormGroup>
          <FormControlLabel control={<Checkbox name="tudonggiahan" onChange={e => {
            const a = { target: { value: e.target.checked, name: e.target.name } }
            Input(a)
          }} defaultChecked />} label="Tự động gia hạn" />
        </FormGroup>
        <br />
        Ảnh đại diện
        <input type="file" name="anhdaidien" onChange={e => {
          const a = {
            target: {
              value: e.target.files[0],
              name: e.target.name
            }
          }
          Input(a)
        }} />
        <br />
        Ảnh mô tả
        <br />
        <Typography>
          Mô tả
        </Typography>
        <Editor
          //  editorState={state.data.mota}
          name="mota"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={e => {
            const a = {
              target: {
                value: convertToHTML(e.getCurrentContent()),
                name: "mota"
              }
            }

            Input(a)
            // console.log(convertToHTML(e.getCurrentContent()))
            // console.log(state.data.mota)

          }}
        />

        <Button onClick={e => Submit()}>
          Đăng
        </Button>

        <Button onClick={ ()=>{
          const fd = new FormData()
          fd.append('image',state.data.anhdaidien)
axios.post('https://api.imgur.com/3/',fd,{headers:{'Authorization':'bc3ace94b4e2001 6353e36aa9582eff17c7863d7893a003de7ef9ffy'}  }).then(res=>console.log(res.data)).catch(e=>console.log(e))
        
}
        }>
          asdascascascsa
        </Button>

      </Container>

    </div>
  )
}
