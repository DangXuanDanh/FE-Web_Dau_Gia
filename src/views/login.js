import React, { useState, useEffect } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';
import Alert from "../common/alert"

// import { axiosInstance, parseJwt } from '../../utils/axios';


import reducer from '../reducers/HomeReducer';

export default function Login(props) {

    const [state, dispatch] = React.useReducer(reducer, { data: {}, login: {} });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');



    const location = window.location.pathname;


    useEffect(() => {
        if (localStorage.getItem('user')) {
            history.push('/');
        }

    }, []);

    async function login() {
        // var atposition = email.indexOf("@");
        //var dotposition = email.lastIndexOf(".");
        if (email == "") {
            setErrorMessage("Vui lòng nhập địa chỉ email")
            setAlertStatus(true)
            setAlertType("error")
        }
        /*else if (atposition < 1 || dotposition < (atposition + 2)
                || (dotposition + 2) >= email.length) {
            setErrorMessage("Hãy nhập địa chỉ email hợp lệ.\nExample@gmail.com")
            setAlertStatus(true)
            setAlertType("error")
        }*/
        else if (password == "") {
            setErrorMessage("Vui lòng nhập mật khẩu")
            setAlertStatus(true)
            setAlertType("error")
        } else {

            let item = { email, password };
            await fetch('http://localhost:3000/API/user/login', {
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
                if (result.status === 0) {
                    setErrorMessage("Tài khoản chưa được kích hoạt!\n Vui lòng vào Email kích hoạt")
                    setAlertStatus(true)
                    setAlertType("error")
                }
                else {
                    localStorage.setItem('user', JSON.stringify(result));

                    dispatch({
                        type: 'login',
                        payload: {
                            data: JSON.stringify(result),
                        }
                    });

                    console.log(result);
                    history.push('/');
                    window.location.reload()

                }
            }).catch(function (error) {
                setErrorMessage("Sai email hoặc mật khẩu")
                setAlertStatus(true)
                setAlertType("error")
            });
        }
    }
    return (

        <div className="Login">
            <Form className="mt-1">
                <div className="form-title">
                    <h2>Đăng Nhập</h2>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="float-left">Email</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="float-left">Mật Khẩu</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label className="float-right"><a href="/forgot_pass" className="forgot-pass">Quên Mật Khẩu?</a></Form.Label>
                </Form.Group>

                <br />

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check className="float-left" type="checkbox" label="Nhớ mật khẩu" />
                </Form.Group>
                <Button className="mt-3 btn btn-default text-white" onClick={login} variant="primary">
                    Đăng nhập
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
