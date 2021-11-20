import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '../common/alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otd_code, setOtd_code] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mataikhoan, setMaTaiKhoan] = useState(0);
    const [screen, setScreen] = useState(1);
    const history = useHistory();



    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push('/');
        }

    }, []);

    const request = (type) => {
        let item = { email };
        fetch('http://14.161.28.224:4001/API/user/change-profile-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(function (response) {
            if (response.ok) {
                if (type === 2) {
                    setErrorMessage('Yêu cầu tạo lại mã đã được gửi. Vui lòng kiểm tra Email!');
                    setAlertType("success")
                    setAlertStatus(true)
                } else {
                    setErrorMessage('Mã xác nhận đã được gửi trong Email. Vui lòng kiểm tra!');
                    setAlertType("success")
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
        let item = { email, otd_code };
        fetch('http://14.161.28.224:4001/API/user/change-profile-password', {
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
            return response;
        }).then(async function (response) {
            const result = await response.json();
            setScreen(3);
            setMaTaiKhoan(result.mataikhoan)
            setErrorMessage('Nhập mã xác nhận thành công!');
            setAlertType("success")
            setAlertStatus(true)
        }).catch(function (error) {
            setErrorMessage('Sai mã xác nhận. Vui lòng kiểm tra lại Email!');
            setAlertType("error")
            setAlertStatus(true)
        });
    };

    const changepassword = () => {
        let item = { mataikhoan, newPassword };
        console.log(mataikhoan + " + " + newPassword)
        if (!newPassword) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin!")
            setAlertStatus(true)
            setAlertType("error")
        } else {
            fetch('http://14.161.28.224:4001/API/user/change-password', {
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
            }).then(function (response) {
                history.push('/login')
            }).catch(function (error) {
                setErrorMessage("Không thể thay đổi mật khẩu. Vui lòng thử lại!")
                setAlertStatus(true)
                setAlertType("error")
            });

        }
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
                                <h2>Xác Nhận Tài Khoản Email</h2>
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
                                <Form.Control required type="number" onChange={(e) => setOtd_code(e.target.value)}
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
                            <div className="form-title mb-5">
                                <h3 className="bold">Thay Đổi Mật Khẩu</h3>
                            </div>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label className='float-left bold'>Mật Khẩu Mới</Form.Label>
                                <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu mới" />
                            </Form.Group>
                            <Button className="mt-3 btn btn-default text-white" onClick={changepassword} variant="primary">
                                Xác Nhận
                            </Button>
                        </div> : ''
                }

            </Form>
        </div>
    );
};

export default ForgotPassword;