import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../../common/alert"
import './profile.css';


function Profile() {
    const saved = localStorage.getItem('user');;

    const history = useHistory();

    const [profile, setprofile] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [id, setId] = useState([]);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [date, setDate] = useState([]);
    const [diachi, setDiaChi] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [transactionsProgram, setTransactionsProgram] = useState([]);

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
                setprofile(result);
                setName(result.hoten);
                setEmail(result.email);
                setDate(result.ngaysinh);
                setDiaChi(result.diachi);

            }).catch((error) => {
                return error;
            });

        }
    }, []);


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
                            {name}
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
                            {date}
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
                    <Button className="mt-3 btn btn-default text-white btn-lg">Thay
                        Đổi</Button>
                </div>
            </div>
        </div>
    );
}

export default Profile;