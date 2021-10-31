import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import CategoryTableRoot from "./categoryTableRoot";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');



function Users() {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const onShowProfile = (e) => {
        showProfileModal();
    };

    const showProfileModal = () => {
        setShowProfile(true);
    };

    const hideDeleteProfileModal = () => {
        setShowProfile(false);
    };

    const hideProfileModal = () => {
        setShowProfile(false);

    };

    useEffect(async () => {
        if (!loading) {
            await fetch("http://localhost:3000/API/danhmuc/danhmuccha/get", {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listProducts = data.map((val) => {
                    console.log(val.tendanhmuc);
                    return {
                        "Id": val.madanhmuc,
                        "tendanhmuc": val.tendanhmuc,
                        "actions": <td> <button onClick={() => GetCategorys(val.madanhmuc)} className="btn btn-sm btn-info">Danh mục con</button>
                                        &nbsp;
                                        <button className="btn btn-sm btn-danger">Xóa</button>
                                    </td>,
                    }
                });
                setData(listProducts);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

    async function GetCategorys(madanhmuc) {
        console.log("asdasdasd     " + madanhmuc)
        let item = { madanhmuc };
        await fetch('http://localhost:3000/API/danhmuc/danhmuccon/' + madanhmuc, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(data => {

            let listCategorys = data.map((val) => {
                console.log(val.tendanhmuc);
                return {
                    "Id": val.madanhmuc,
                    "tendanhmuc": val.tendanhmuc,
                    "actions": <td>
                                    <button className="btn btn-sm btn-danger">Xóa</button>
                                </td>,
                }
            });
            setData1(listCategorys);

            setLoading(true);
        }).catch((error) => {
            return error;
        });

        showProfileModal()
    }

    useEffect(async () => {
        if (data.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])

    useEffect(async () => {
        if (data1.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data1])

    return (
        <>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách danh mục cha</Tab>
                </TabList>

                <TabPanel>
                    <button className="btn btn-sm btn-primary">Thêm</button>
                    <div className="container py-5 px-0">
                        {loading ?
                            <CategoryTableRoot userData={data} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>

            <Modal
                className="details_modal"
                show={showProfile}
                onHide={hideDeleteProfileModal}
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title><div className="float-left">Danh mục con</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs className="admin-tabs mt-2">
                        <TabList>
                            <Tab>Danh sách danh mục con</Tab>
                        </TabList>

                        <TabPanel>
                            <button className="btn btn-sm btn-primary">Thêm</button>
                            <div className="container py-5 px-0">
                                {loading ?
                                    <CategoryTableRoot userData={data1} />
                                    :
                                    <div>Loading...</div>
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={hideDeleteProfileModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Alert
                status={alertStatus}   // true or false
                type={alertType}   // success, warning, error, info
                title={errorMessage}   // title you want to display
                setIsAlert={setAlertStatus}
            />
        </>
    )
};

export default Users;