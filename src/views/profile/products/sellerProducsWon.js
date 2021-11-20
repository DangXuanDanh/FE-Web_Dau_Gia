import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SellerProducsTableWon from "./sellerProducsWonTable";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');

import { axiosInstance, parseJwt } from '../../../utils/axios';


function sellerProducsWon() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    //const [tendanhmuc, setTenDanhMuc] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);

  const idUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).mataikhoan : 13
    
    async function DanhGia(mataikhoan,masanpham,danhgia)
    {
        const info = {
            mataikhoan: mataikhoan,
            masanpham:masanpham,
            danhgia:danhgia
        }
        await axiosInstance.post(`lichsudanhgia/`,info)
    }

    useEffect(async () => {
        if (!loading) {
            await fetch("http://localhost:3000/api/sanpham/done/" + initial.mataikhoan, {
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
                        formatted_date2 = moment(val.ngaydaugia).format('DD-MM-YYYY h:mm:ss a');
                    }
                    
                    // console.log(val.masanpham)
                    // const res = await axiosInstance.get(`lichsudanhgia/find/${idUser}/${val.masanpham}`).data
                    // let name = "btn btn-sm btn-primary"
                    // if (res){
                    //     name=""
                    // } else {
                    //     name="btn btn-sm btn-primary"
                    // }

                    return {
                        "Id": val.masanpham,
                        "tensanpham": val.tensanpham,
                        "idnguoithang": val.nguoichienthang,
                        "giadamua": val.gia,
                        "ngaydang": formatted_date1,
                        "ngaydaban": formatted_date2,
                        "actions": <td><button onClick={()=>{DanhGia(idUser,val.masanpham,1)}} className="btn btn-sm btn-primary"><ThumbUpIcon /></button> <button onClick={()=>{DanhGia(idUser,val.masanpham,1)}} className="btn btn-sm btn-primary"><ThumbDownIcon/></button></td>
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
                            <SellerProducsTableWon userData={data} />
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

export default sellerProducsWon;