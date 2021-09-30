import React from 'react';
import { Form, Button } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../../utils/axios';

export default function Login(props) {
    return (
      
        <div className="Login">
            <Form className="mt-1">
                <div className="form-title">
                    <h2>Đăng Nhập</h2>
                </div>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="float-left">Email</Form.Label>
                    <Form.Control type="email"  placeholder="Nhập email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="float-left">Mật Khẩu</Form.Label>
                    <Form.Control type="password"  placeholder="Nhập mật khẩu"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label className="float-right"><a href="/forgot_pass" className="forgot-pass">Quên Mật Khẩu?</a></Form.Label>
                </Form.Group>

                <br/>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check className="float-left" type="checkbox" label="Nhớ mật khẩu"/>
                </Form.Group>
                <Button className="mt-3 btn btn-default text-white"  variant="primary">
                    Đăng nhập
                </Button>
            </Form>
        </div>
    )
  }
  