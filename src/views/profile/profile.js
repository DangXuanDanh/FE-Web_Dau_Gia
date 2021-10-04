import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from "../../common/alert"
import './profile.css';


function Profile () {
    const [showProfile, setShowProfile] = useState(false);
    const onShowProfile = (e) => {
        showProfileModal();
    };

    const showProfileModal = () => {
        setShowProfile(true);
    };
    return (
            <div className="mt-3">
                <div className="profile">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="w-100 bold">Thông Tin Tài Khoản</h3>
                    </div>
                    <div className="card-body text-left">
                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Họ Tên</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                Danh
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                asd@gmail.com
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Ngày Sinh</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                14/01/1999
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-3 vertical-base">
                                <h6 className="mb-0 float-left">Địa Chỉ</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                74/9 asdsad asdf
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button className="mt-3 btn btn-default text-white btn-lg" onClick={onShowProfile}>Thay
                            Đổi</Button>
                    </div>
                </div>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={false}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title><div className="float-left">Thay Đổi Thông Tin</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="float-left">Họ Tên</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="float-left">Email</Form.Label>
                            <Form.Control type="email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className="float-left">Điện Thoại</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCardId">
                            <Form.Label className="float-left">Chứng Minh Nhân Dân</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" variant="primary">
                        Lưu
                    </Button>

                    <Button variant="danger" onClick={false}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>

        
        </div>
    );
}

export default Profile;