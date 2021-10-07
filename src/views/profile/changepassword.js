import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

import Alert from "../../common/alert"

const ForgotPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mataikhoan, setUserId] = useState(0);
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push('/');
        }
        else {
            const user = localStorage.getItem('user');
            const initial = JSON.parse(user);
            setUserId(initial.mataikhoan);
        }
    }, []);

    const request = () => {
        let item = { mataikhoan, oldPassword, newPassword };
        if (!oldPassword || !newPassword) {
            setErrorMessage("Vui lòng điền đầy đủ thông tin!")
            setAlertStatus(true)
            setAlertType("error")
        } else {
            fetch('http://localhost:3000/API/user/change-profile-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(item)
            }).then(function (response) {
                if (response.ok) {
                    setErrorMessage("Thay đổi thành công!")
                    setAlertStatus(true)
                    setAlertType("success")
                } else {
                    setErrorMessage("Mật khẩu cũ không chính xác. Vui lòng thử lại!")
                    setAlertStatus(true)
                    setAlertType("error")
                }
            }).catch(function (error) {
                setErrorMessage("Không thể thay đổi mật khẩu. Vui lòng thử lại!")
                setAlertStatus(true)
                setAlertType("error")
            });

        }
    };
    return (
        <div className="Login">
            <div className="mt-3 lasagna">
                <Form className="mt-5">
                    <div>
                        <div className="form-title mb-5">
                            <h3 className="bold">Thay Đổi Mật Khẩu</h3>
                        </div>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label className='float-left bold'>Mật Khẩu Cũ</Form.Label>
                            <Form.Control type="password" onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Nhập mật khẩu cũ" />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label className='float-left bold'>Mật Khẩu Mới</Form.Label>
                            <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới" />
                        </Form.Group>
                        <Button className="mt-3 btn btn-default text-white" onClick={request} variant="primary">
                            Xác Nhận
                        </Button>
                    </div>
                </Form>
            </div>
            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />
        </div>
    );
};

export default ForgotPassword;