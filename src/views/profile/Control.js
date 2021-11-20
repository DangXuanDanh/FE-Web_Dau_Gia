import React, {useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Profile from '../profile/profile';
import SellerProducsTable from './products/sellerProducts';
import WatchList from './products/watchList';
import Products from '../admin/product/products';
import Category from '../admin/category/categorys';
import './../admin/admin.css';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function TabPanel(props) {
    const history = useHistory();
    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
        history.push('/');
    }

}, []);
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        maxWidth: "75%",
        margin: "0 auto",
    },
}));

export default function SimpleTabs() {
    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const alertOptions = {
        timeout: 5000,
        position: positions.TOP_CENTER
      };

    return (
        <Provider template={AlertTemplate} {...alertOptions}>
            <div className={[classes.root, "host-container"].join(" ")}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
                        <Tab label="Sản phẩm yêu thích" {...a11yProps(1)}/>
                        {initial.role == 2 ? 
                        <Tab label="Danh sách các sản phẩm còn bán" {...a11yProps(2)} />
                        : ""}
                        
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Profile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <WatchList/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SellerProducsTable />
                </TabPanel>
                
                
            </div>
        </Provider>
    );
}