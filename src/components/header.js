import * as React from 'react';
import ReactDOM from 'react-dom';
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
import {TextField, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { axiosInstance, parseJwt } from '../utils/axios';


export default function Header() {
    const [age, setAge] = React.useState('');
    const [data, setData] = React.useState([]);
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    React.useEffect(() => {
        loadCategory()
      }, [])
      async function loadCategory() {
        const res = await axiosInstance.get(`danhmuc`).then((a) => {
          setData(a.data)
          console.log(a.data);
        });
      }
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="/"
                        sx={{ my: 1, mx: 1.5 }}
                        >
                        QDL Auction
                    </Link>
                </Typography>
                <nav>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Danh mục</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="category"
                        value={age}
                        onChange={handleChange}
                        autoWidth
                        label="Danh mục"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                data.map((item, index) => {
                                return <MenuItem
                                    value={item.madanhmuc}>
                                        {item.tendanhmuc}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField sx={{ my: 1, mx: 1.5 , verticalAlign: 'baseline'}} id="standard-basic" label="Search" variant="standard" />
                </nav>
                <nav>
                    {/* <Link
                        variant="button"
                        color="text.primary"
                        href="post"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Post a bid
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="faqs"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        FAQs
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="about"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        About us
                    </Link> */}

                    <Link
                        variant="button"
                        color="#00F"
                        href="login"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                         Đăng Nhập
                    </Link>

                    <Link
                        variant="button"
                        color="#00F"
                        href="register"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Đăng Kí
                    </Link>

                    <Link
                        variant="button"
                        color="#00F"
                        href="profile"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Cá Nhân
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    )
}