import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import ProductTable from "./productTable";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');



function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

   

    useEffect(async () => {
        if (!loading) {
            await fetch("http://localhost:3000/API/sanpham/", {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(data => {
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
                        "actions":<button onClick={() => DeleteProduct(val.masanpham)} className="btn btn-sm btn-danger">Xóa</button> ,
                    }
                });
                setData(listProducts);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    async function DeleteProduct(masanpham) {
        console.log("asdasdasd     "+masanpham)
        const is_delete = 1;
        let item = {masanpham, is_delete};
        await fetch('http://localhost:3000/API/sanpham/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            setErrorMessage("Sản phẩm đã được xóa")
            setAlertStatus(true)
            setAlertType("success")
            return response;
        }).catch((error) => {
            return error;
        });
    }

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
                            <ProductTable userData={data} />
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