import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import SellerProducsTable from "./sellerProducsTable";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');



function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    //const [tendanhmuc, setTenDanhMuc] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);
    
    
    

    useEffect(async () => {
        if (!loading) {
            await fetch("http://localhost:3000/API/sanpham/detail/" + initial.mataikhoan, {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then( data => {
                let listProducts = data.map((val) => {
                    var formatted_date1 = null;
                    var formatted_date2 = null;
                    
                    if (val.ngaydang != null || val.ngayketthuc != null) {
                        formatted_date1 = moment(val.ngaydang).format('DD-MM-YYYY h:mm:ss a');
                        formatted_date2 = moment(val.ngayketthuc).format('DD-MM-YYYY h:mm:ss a');
                    }

                    return {
                        "Id": val.masanpham,
                        "tensanpham": val.tensanpham,
                        "madanhmuc": val.madanhmuc,
                        "giakhoidiem": val.giakhoidiem,
                        "giamuangay": val.giamuangay,
                        "ngaydang": formatted_date1,
                        "ngayketthuc": formatted_date2,
                    }
                });
                setData(listProducts);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);


    useEffect(async () => {
        if (data.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])

    return (
        <>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách sản phẩm</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5 px-0">
                        {loading ?
                            <SellerProducsTable userData={data} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>

            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />
        </>
    )
};

export default Users;