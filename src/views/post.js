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
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import reducer from '../reducers/PostReducer';
import reactDom from 'react-dom';

import BreadCrumb from "../components/breadcrumbs"

// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

import { axiosInstance, parseJwt } from '../utils/axios';

export default function Post(props) {

  return (
    <div className="detail">
      <Container>

        <BreadCrumb />

        <Typography variant="h6" component="h2">
          Post new Auction
        </Typography>

        <Divider/>
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
          <TextField error={true} helperText="" required id="outlined-basic" label="Tiêu đề" variant="outlined" />
          <br />
          <TextField error={true} helperText="" required id="outlined-basic" label="Tên sản phẩm" variant="outlined" />
          <br />
          <FormControl sx={{ m: 1, minWidth: 150 }}>
  <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
    label="Danh mục"
    // onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
<br />

          <TextField required
            id="outlined-number"
            label="Giá khởi điểm"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <TextField 
            id="outlined-number"
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

        <Button>
          Đăng
        </Button>

      </Container>

    </div>
  )
}
