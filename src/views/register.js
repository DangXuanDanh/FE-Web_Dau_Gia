import React, { useState, useEffect } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';

import Alert from "../common/alert"
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../../utils/axios';

export default function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hoten, setHoten] = useState('');
    const [diachi, setDiachi] = useState('');
    const [ngaysinh, setNgaysinh] = useState('');
    const [verified, setVerified] = useState(false);
    const history = useHistory();



    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push('/');
        }

    }, []);

    var callback = function () {
        console.log('Done!!!!');
      };

      var verifyCallback = function (response) {
        if(response){
            setVerified(true);
        }
      };

    async function resister() {
        // var atposition = email.indexOf("@");
        //var dotposition = email.lastIndexOf(".");
        if (email == "" || password == "" || hoten == "" || ngaysinh == "" || diachi == "") {
            setErrorMessage("Vui lòng nhập điền đầy đủ thông tin")
            setAlertStatus(true)
            setAlertType("error")
        }else if (verified == false) {
            setErrorMessage("Vui lòng chọn captcha")
            setAlertStatus(true)
            setAlertType("error")
        } else {

            let item = { email, password, hoten, diachi, ngaysinh };
            await fetch('http://localhost:3000/API/user/register', {
                method: 'POST',
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
                const result = await response.json();
                setErrorMessage("Đăng ký thành công!! Vui lòng vào Email để kích hoạt tài khoản")
                setAlertStatus(true)
                setAlertType("success")
            }).catch(function (error) {
                setErrorMessage("Email đã tồn tại vui lòng điền email khác")
                setAlertStatus(true)
                setAlertType("error")
            });
        }
    }
    return (

        <div className="Login">
            <Form className="mt-1">
                <div className="form-title">
                    <h2>Đăng Kí</h2>
                </div>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="float-left">Họ Tên</Form.Label>
                    <Form.Control type="text" onChange={(e) => setHoten(e.target.value)} placeholder="Nhập Họ Tên" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label className="float-left">Ngày Sinh</Form.Label>
                    <Form.Control type="date" onChange={(e) => setNgaysinh(e.target.value)} placeholder="Nhập ngày sinh" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCardId">
                    <Form.Label className="float-left">Đại Chỉ</Form.Label>
                    <Form.Control type="text" onChange={(e) => setDiachi(e.target.value)} placeholder="Nhập địa chỉ" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="float-left">Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="float-left">Mật Khẩu</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
                </Form.Group>

                <Recaptcha
                    sitekey="6LfR9kgdAAAAAEDHDColEwNzScWEUK8dpV9eHaS7"
                    render="explicit"
                    verifyCallback={verifyCallback}
                    onloadCallback={callback}
                />

                <Button className="mt-3 btn btn-default text-white" onClick={resister} variant="primary">
                    Đăng kí
                </Button>
            </Form>

            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />
        </div>

    )
}
