import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import SellerProducsTable from "./sellerProducsTable";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';

import { axiosInstance, parseJwt } from '../../../utils/axios';

function WatchList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    //const [tendanhmuc, setTenDanhMuc] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);

    async function removeItem(idProduct,state){
        const idUser = saved ? initial.mataikhoan : 13
        await axiosInstance.delete(`yeuthich/find/${idUser}/${idProduct}`).then((res=>{
            const newList = data.filter(function(item) {
                return item.masanpham != idProduct
            })
            // console.log(idProduct)
            // console.log(newList)
            setData(newList)
            window.location.reload() // dùng tạm do state không get được array
        }))
    }



    useEffect(async () => {
        if (!loading) {
            await fetch("http://localhost:3000/API/yeuthich/findAll/" + initial.mataikhoan, {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(res => {
                let listProducts = res.map((val) => {
                    var formatted_date1 = null;
                    var formatted_date2 = null;

                    if (val.ngaydang != null || val.ngayketthuc != null) {
                        formatted_date1 = moment(val.ngaydang).format('DD-MM-YYYY h:mm:ss a');
                        formatted_date2 = moment(val.ngayketthuc).format('DD-MM-YYYY h:mm:ss a');
                    }

                    return {
                        "Id": val.masanpham,
                        "tensanpham": <Link
                            variant="button"
                            color="text.primary"
                            href={"/detail/"+val.masanpham}
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            {val.tensanpham}
                        </Link>,
                        "madanhmuc": val.madanhmuc,
                        "giakhoidiem": val.giakhoidiem,
                        "giamuangay": val.giamuangay,
                        "ngaydang": formatted_date1,
                        "ngayketthuc": formatted_date2,
                        "actions": <button  onClick={() => removeItem(val.masanpham)} className="btn btn-sm"><DeleteIcon/></button>
                    }
                });
                setData(listProducts);
                console.log(this.data)
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

export default WatchList;