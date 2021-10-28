import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../../common/alert"
import './profile.css';
const moment = require('moment');
require('moment/locale/vi');


function Profile() {
    const saved = localStorage.getItem('user');;

    const history = useHistory();

    const [profile, setprofile] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [mataikhoan, setId] = useState([]);
    const [hoten, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [ngaysinh, setNgaySinh] = useState([]);
    const [ngaysinhgoc, setNgaySinhGoc] = useState([]);
    const [diachi, setDiaChi] = useState([]);


    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(async () => {
        if (!localStorage.getItem('user')) {
            history.push('/');
        }

        else {
            const initial = JSON.parse(saved);
            setId(initial.mataikhoan);
            await fetch('http://localhost:3000/API/user/profile/' + initial.mataikhoan, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).then(async function (response) {
                const result = await response.json();
                var formatted_date1 = null;
                var formatted_date2 = null;
                if (result.ngaysinh != null) {
                    formatted_date1 = moment(result.ngaysinh).format('DD-MM-YYYY');
                    formatted_date2 = moment(result.ngaysinh).format('YYYY-MM-DD');
                }
                setprofile(result);
                setName(result.hoten);
                setEmail(result.email);
                setNgaySinh(formatted_date1);
                setDiaChi(result.diachi);
                setNgaySinhGoc(formatted_date2);

            }).catch((error) => {
                return error;
            });

        }
    }, []);

    const gochangepass = (e) => {
        history.push('/changepassword');
    };

    const onShowProfile = (e) => {
        showProfileModal();
    };

    const showProfileModal = () => {
        setShowProfile(true);
    };
    
    const hideDeleteProfileModal = () => {
        setShowProfile(false);
        setName(profile.hoten);
        setEmail(profile.email);
        var formatted_date = null;
                if (profile.ngaysinh != null) {
                    formatted_date = moment(profile.ngaysinh).format('DD-MM-YYYY');
                }
        console.log("asdzxcasdasfsdf:   " + formatted_date)
        setNgaySinh(formatted_date);
        setDiaChi(profile.diachi);
    };

    const hideProfileModal = () => {
        setShowProfile(false);

    };

    const ChangetxtName = (e) => {
        setName(e.target.value);
    };
    const ChangetxtEmail = (e) => {
        setEmail(e.target.value);
    };
    const ChangetxtNgaySinh = (e) => {
        setNgaySinh(e.target.value);
    };
    const ChangetxtDiaChi = (e) => {
        setDiaChi(e.target.value);
    };

    async function saveProfile() {
        const initial = JSON.parse(saved);
        console.warn(mataikhoan, hoten, email, ngaysinh, diachi);

        let item = { mataikhoan, hoten, email, ngaysinh, diachi };
        await fetch('http://localhost:3000/API/user/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(async function (response) {
            setErrorMessage("Cập nhật thành công")
            setAlertStatus(true)
            setAlertType("success")
            hideProfileModal();
        }).catch(function (error) {
            setErrorMessage("Cập nhật thất bại")
            setAlertStatus(true)
            setAlertType("error")
        });

        await fetch('http://localhost:3000/API/user/profile/' + initial.mataikhoan, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(async function (response) {
            const result = await response.json();
                var formatted_date1 = null;
                var formatted_date2 = null;
                if (result.ngaysinh != null) {
                    formatted_date1 = moment(result.ngaysinh).format('DD-MM-YYYY');
                    formatted_date2 = moment(result.ngaysinh).format('YYYY-MM-DD');
                }
                setprofile(result);
                setName(result.hoten);
                setEmail(result.email);
                setNgaySinh(formatted_date1);
                setDiaChi(result.diachi);
                setNgaySinhGoc(formatted_date2);
        }).catch((error) => {
            return error;
        });
    }

    return (
        <div className="mt-3">
            <div className="profile">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="w-100 bold">Thông Tin Tài Khoản</h3>
                </div>
                <div className="card-body text-left">
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
                </div>

                <div>
                    <Button className="mt-3 btn btn-info text-white btn-lg" onClick={onShowProfile}>
                        Thay đổi thông tin
                    </Button>
                    <div className="divider" />
                    <Button className="mt-3 btn btn-primary text-white btn-lg" onClick={gochangepass}>
                        Đổi mật khẩu
                    </Button>
                </div>
            </div>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={hideDeleteProfileModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><div className="float-left">Thay Đổi Thông Tin</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="float-left">Họ Tên</Form.Label>
                            <Form.Control type="text" value={hoten} onChange={ChangetxtName} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="float-left">Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={ChangetxtEmail} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicNgaySinh">
                            <Form.Label className="float-left">Ngày Sinh</Form.Label>
                            <Form.Control type="date" value={ngaysinhgoc} onChange={ChangetxtNgaySinh} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDiaChi">
                            <Form.Label className="float-left">Đia Chỉ</Form.Label>
                            <Form.Control type="text" value={diachi} onChange={ChangetxtDiaChi} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" variant="primary" onClick={saveProfile}>
                        Lưu
                    </Button>

                    <Button variant="danger" onClick={hideDeleteProfileModal}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>

            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />
        </div>
    );
}

export default Profile;