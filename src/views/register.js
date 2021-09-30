import React from 'react';
import { Form, Button } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// import { axiosInstance, parseJwt } from '../../utils/axios';

export default function Register(props) {
    return (
       
        <div className="Login">
        <Form className="mt-1">
            <div className="form-title">
                <h2>Đăng Kí</h2>
            </div>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="float-left">Họ Tên</Form.Label>
                <Form.Control type="text"  placeholder="Nhập Họ Tên" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label className="float-left">Ngày Sinh</Form.Label>
                <Form.Control type="date"  placeholder="Nhập ngày sinh" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCardId">
                <Form.Label className="float-left">Đại Chỉ</Form.Label>
                <Form.Control type="text"  placeholder="Nhập địa chỉ" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="float-left">Email</Form.Label>
                <Form.Control type="email"  placeholder="Nhập email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="float-left">Mật Khẩu</Form.Label>
                <Form.Control type="password"  placeholder="Nhập mật khẩu" />
            </Form.Group>
            <Button className="mt-3 btn btn-default text-white"  variant="primary">
                Đăng kí
            </Button>
        </Form>
        </div>
     
    )
  }
  