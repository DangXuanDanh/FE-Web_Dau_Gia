import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Login from '../login';
import Users from '../admin/user/Users';
import './admin.css';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function TabPanel(props) {
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
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Quản lý người dùng" {...a11yProps(1)} />
                        <Tab label="Login" {...a11yProps(2)} />
                        <Tab label="Thay đổi mật khẩu" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Login />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Users />
                </TabPanel>
                
            </div>
        </Provider>
    );
}