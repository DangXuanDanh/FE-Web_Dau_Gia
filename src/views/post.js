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


import reducer from '../reducers/PostReducer';

import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Post(props) {

  const [state, dispatch] = React.useReducer(reducer, { data: {}, danhmuc: [] });

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

  function Validate() {
      // show err that those fields
  }

  function Submit() {
    if (Validate() == false)
      return;

    //submit data from state.data
  }

  function SelectDanhMuc(e) {

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
            <TextField name="tensanpham" onChange={e => Input(e)} error={true} helperText="" required id="outlined-basic" label="Tên sản phẩm" variant="outlined" />
            <br />
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={state.danhmuc[0]}
                label="Danh mục"
                onChange={SelectDanhMuc}
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
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              id="outlined-number"
              name="giamuangay" onChange={e => Input(e)}
              label="Giá mua ngay"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </Box>
        <br />
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Thời gian kết thúc"
        // value={value}
        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
        />
        <br />
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Tự động gia hạn" />
        </FormGroup>
        <br />
        Ảnh đại diện
        <br />
        Ảnh mô tả
        <br />
        <Typography>
          Mô tả
        </Typography>
        <Editor
          // editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        // onEditorStateChange={this.onEditorStateChange}
        />

        <Button onClick={e => console.log(state.data)}>
          Đăng
        </Button>

      </Container>

    </div>
  )
}
