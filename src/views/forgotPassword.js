import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '../common/alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [keycode, setKeyCode] = useState('');
    const [userId, setUserId] = useState(0);
    const [newPassword, setNewPassWord] = useState('');
    const [screen, setScreen] = useState(1);
    const history = useHistory();
    

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const request = (type) => {
        let item = {email};
        fetch('http://localhost:3000/API/user/change-profile-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
           if (response.ok) {
                if(type === 2) {
                    setErrorMessage('Yêu cầu tạo lại mã đã được gửi. Vui lòng kiểm tra Email!');
                    setAlertType("error")
                    setAlertStatus(true)
                }
                setScreen(2);
                return response;
            } else {
                setErrorMessage('Tài khoản không tồn tại vui lòng kiểm tra lại');
                setAlertType("error")
                setAlertStatus(true)
            }
        }).catch(function (error) {
            setErrorMessage('Tài khoản không tồn tại vui lòng kiểm tra lại');
            setAlertType("error")
            setAlertStatus(true)
        });
    };

    const confirmCode = () => {
        setScreen(3);
        /*let item = {keycode};
        fetch('https://nhatrovn.herokuapp.com/api/password/keycode-verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (response.ok) {
                setScreen(3);
                return response.json();
            } else {
                setAlertError('Sai mã xác nhận. Vui lòng kiểm tra lại Email!');
            }
        }).then(function (response) {
            if (typeof response) {
                setUserId(response);
            }
        }).catch(function (error) {
            setAlertError('Sai mã xác nhận. Vui lòng kiểm tra lại Email!');
        });*/
    };

    return (
        <div className="Login">
           <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />

            <Form className="mt-5">
                {
                    screen === 1 ?
                        <div>
                            <div className="form-title">
                                <h2>Tạo Mới Mật Khẩu</h2>
                            </div>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email" />
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={() => request(1)} variant="primary">
                                Gửi yêu cầu
                            </Button>
                        </div> : ''
                }

                {
                    screen === 2 ?
                        <div>
                            <div className="form-title">
                                <h2>Nhập Mã Xác Nhận</h2>
                            </div>
                            < Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control required type="number" onChange={(e) => setKeyCode(e.target.value)}
                                    placeholder="Nhập mã xác nhận" />
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={confirmCode} variant="primary">
                                Xác Nhận Mã OTP
                            </Button>
                            <Button className="mt-3 btn btn-default text-white" onClick={() => request(2)} variant="primary">
                                Gửi lại xác nhận
                            </Button>
                        </div> : ''
                }

                {
                    screen === 3 ?
                        <div>
                            <div className="form-title">
                                <h2>Nhập mật khẩu mới</h2>
                            </div>
                            < Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left'>Mật Khẩu</Form.Label>
                                <Form.Control required type="password" onChange={(e) => setNewPassWord(e.target.value)}
                                    placeholder="Nhập mật khẩu" />
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white"  variant="primary">
                                Gửi yêu cầu
                            </Button>
                        </div> : ''
                }

            </Form>
        </div>
    );
};

export default ForgotPassword;