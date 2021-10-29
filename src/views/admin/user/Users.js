import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import UserTable from "./userTable";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');



function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [profile, setprofile] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [mataikhoan, setMaTaiKhoan] = useState([]);
    const [hoten, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [ngaysinh, setNgaySinh] = useState([]);
    const [diachi, setDiaChi] = useState([]);
    const [role, setRole] = useState([]);
    const [activate_status, setactivate_status] = useState([]);
    const [danhgiatot, setdanhgiatot] = useState([]);
    const [danhgiaxau, setdanhgiaxau] = useState([]);


    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const onShowProfile = (e) => {
        showProfileModal();
    };

    const showProfileModal = () => {
        setShowProfile(true);
    };

    const hideDeleteProfileModal = () => {
        setShowProfile(false);
    };

    const hideProfileModal = () => {
        setShowProfile(false);

    };

    async function getthongtin(id) {

        await fetch('http://localhost:3000/API/user/profileuser/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(async function (response) {
            const result = await response.json();

            setprofile(result);
            setMaTaiKhoan(id)
            setName(result.hoten);
            setEmail(result.email);
            setNgaySinh(result.ngaysinh);
            setDiaChi(result.diachi);
            setRole(result.role);
            setactivate_status(result.activate_status);
            setdanhgiatot(result.danhgiatot);
            setdanhgiaxau(result.danhgiaxau);
        }).catch((error) => {
            return error;
        });

        showProfileModal()
    }


    async function DeleteUser(id) {
        await fetch('http://localhost:3000/API/user/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            setErrorMessage("Tài khoản đã được xóa")
            setAlertStatus(true)
            setAlertType("success")
            return response;
        }).catch((error) => {
            return error;
        });
    }

    async function DegradeRole(id) {
        await fetch('http://localhost:3000/API/user/degrade/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            setErrorMessage("Tài khoản đã hạ cấp thành bidder")
            setAlertStatus(true)
            setAlertType("success")
            return response;
        }).catch((error) => {
            return error;
        });
    }

    useEffect(async () => {
        if (!loading) {
            await fetch("http://localhost:3000/API/user/alluser", {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listUsers = data.map((val) => {
                    return {
                        "Id": val.mataikhoan,
                        "hoten": val.hoten,
                        "email": val.email,
                        "status": val.activate_status ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>,
                        "role": (val.role == 1) ? <Badge bg="info">bidder</Badge> : (val.role == 2) ? <Badge bg="info">seller</Badge> :<Badge bg="info">admin</Badge> ,
                        "actions": <button onClick={() => getthongtin(val.mataikhoan)} className="btn btn-sm btn-dark">Chi tiết</button>,
                        "actions1": <button onClick={() => DeleteUser(val.mataikhoan)} className="btn btn-sm btn-danger">Xóa</button>
                    }
                });
                setData(listUsers);
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
                    <Tab>Danh sách người dùng</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5 px-0">
                        {loading ?
                            <UserTable userData={data} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={hideDeleteProfileModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><div className="float-left">Thông Tin Chi Tiết (ID: #{mataikhoan})</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Họ Tên</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {hoten}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {email}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Ngày Sinh</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {ngaysinh}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Địa Chỉ</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {diachi}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Role</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {(role == 1) ? <Badge bg="info">bidder</Badge> : (role == 2) ? <Badge bg="info">seller</Badge> :<Badge bg="info">admin</Badge>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {activate_status ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Đánh giá tốt</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {danhgiatot} Lượt
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-sm-3 vertical-base">
                            <h6 className="mb-0 float-left">Đánh giá xấu</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            {danhgiaxau} Lượt
                        </div>
                    </div>



                </Modal.Body>
                <Modal.Footer>{(role == 2 ) ?
                    <Button variant="primary" onClick={() => DegradeRole(mataikhoan)}>
                        Hạ cấp    
                    </Button>: null}
                    <Button variant="danger" onClick={hideDeleteProfileModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

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