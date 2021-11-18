import * as React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';


import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { axiosInstance, parseJwt } from '../utils/axios';

import reducer from '../reducers/HomeReducer';

import { useHistory } from 'react-router-dom';

export default function Header() {
    const [age, setAge] = React.useState('');
    const [data, setData] = React.useState([]);

    const [state, dispatch] = React.useReducer(reducer, { data: {}, login: {} });
    const history = useHistory()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [menuPosition, setMenuPosition] = React.useState(null);


    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(-1);

    function handleClick2(e) {
        if (e == -1 || e == open3)
        {
            setOpen2(!open2);
        } else {
            setOpen2(true);
        }
        setOpen3(e)
    };



    function SelectCategory(id) {
        history.push('/category?id=' + id)
        window.location.reload()
    }
    function listProducts() {
        var element = document.getElementById("standard-basic-search");
        if(element.value!="")
        {
            history.push('/listProducts?name=' + element.value)
            window.location.reload()
        }
    }
    function handleKeyPress(target) {
        if(target.charCode==13){
          alert('Enter clicked!!!');    
        } 
      }
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    React.useEffect(() => {

        dispatch({
            type: 'login',
            payload: {
                data: localStorage.getItem('user'),
            }
        });

        loadCategory(localStorage.getItem('user'))
    }, [])
    async function loadCategory() {
        const res = await axiosInstance.get(`danhmuc/all/get`).then((a) => {
            setData(a.data)
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
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Danh mục
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {/* {
                            data.map((item, index) => {
                                return <MenuItem key={index}
                                    value={item.madanhmuc}
                                    onClick={(e) => SelectCategory(e.target.value)}
                                >
                                    {item.tendanhmuc}
                                </MenuItem>
                            })
                        } */}



                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Danh mục:
                                </ListSubheader>
                            }
                        >
                            <Divider />

                            {
                                data.map((item, index) => {
                                    return item.madanhmuccha == undefined ?
                                        <div key={index}>
                                            <ListItemButton key={index}
                                                value={item.madanhmuc}
                                                onClick={(e) => handleClick2(item.madanhmuc)}
                                            >
                                                <ListItemText primary={item.tendanhmuc} />
                                                {open2 && open3 == item.madanhmuc ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>

                                            <Collapse in={open2 && open3 == item.madanhmuc} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>


                                                {
                                                    data.map((item2,index2) => {
                                                        return item2.madanhmuccha == item.madanhmuc ?
                                                        <ListItemButton key={index2} value={item2.madanhmuc} onClick={(e) => SelectCategory(item2.madanhmuc)} sx={{ pl: 4 }}>
                                                        <ListItemText primary={item2.tendanhmuc} />
                                                    </ListItemButton> : undefined
                                                    })
                                                }

                                                </List>
                                            </Collapse>
                                        </div>
                                        : undefined
                                })
                            }
                        </List>
                    </Menu>
                    <TextField sx={{ my: 1, mx: 1.5, verticalAlign: 'baseline' }} id="standard-basic-search" label="Search" variant="standard" />
                    <IconButton aria-label="search" onClick={listProducts} onKeyPress={handleKeyPress}>
                        <SearchIcon />
                    </IconButton>
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

                    {
                        state.login ? <Link variant="button" color="#00F" href="post" sx={{ my: 1, mx: 1.5 }} > Đăng sản phẩm </Link> : undefined
                    }

                    {
                        state.login ? undefined : <Link variant="button" color="#00F" href="login" sx={{ my: 1, mx: 1.5 }} > Đăng Nhập </Link>
                    }

                    {
                        state.login ? undefined : <Link variant="button" color="#00F" href="register" sx={{ my: 1, mx: 1.5 }}                    >                      Đăng Kí                    </Link>
                    }

                    {
                        state.login ? <Link variant="button" color="#00F" href="profile" sx={{ my: 1, mx: 1.5 }}                    >                        Cá Nhân                    </Link> : undefined
                    }


                </nav>
            </Toolbar>
        </AppBar>
    )
}