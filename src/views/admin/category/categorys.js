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

    const [tendanhmuc, settendanhmuc] = useState();
    const [CheckModal, setCheckModal] = useState();
    const [Id, setId] = useState();

    const [CategorysModal, setCategorysModal] = useState(false);
    const [AddCategoryModal, setAddCategorysModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    const onShowProfile = (e) => {
        showProfileModal();
    };

    const showCategoryModal = () => {
        setCategorysModal(true);
    };

    const hideCategorysModal = () => {
        setCategorysModal(false);
    };

    const showAddCategoryModal = () => {
        setAddCategorysModal(true);
    };

    const hideAddCategoryModal = () => {
        setAddCategorysModal(false);
    };

    const hideProfileModal = () => {
        setShowProfile(false);

    };
    
    const ChangetxtName = (e) => {
        settendanhmuc(e.target.value);
    };
    

    async function funCheckModal(check) {
        setCheckModal(check);
        showAddCategoryModal();
    }

    async function funTempEdit(id) {
        setId(id);
        funCheckModal(2);
    }

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
                    return {
                        "Id": val.madanhmuc,
                        "tendanhmuc": val.tendanhmuc,
                        "actions": <td> <button onClick={() => GetCategorys(val.madanhmuc)} className="btn btn-sm btn-info">Danh mục con</button>
                            &nbsp;
                            <button className="btn btn-sm btn-primary" onClick={() => funTempEdit(val.madanhmuc)} >Sửa</button>
                            &nbsp;
                            <button className="btn btn-sm btn-danger" onClick={() => DeleteCategoryRoot(val.madanhmuc)}>Xóa</button>
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
        setId(madanhmuc)
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
                return {
                    "Id": val.madanhmuc,
                    "tendanhmuc": val.tendanhmuc,
                    "actions": <td>
                        <button className="btn btn-sm btn-primary" onClick={() => funTempEdit(val.madanhmuc)} >Sửa</button>
                            &nbsp;
                        <button className="btn btn-sm btn-danger" onClick={() => DeleteCategoryRoot(val.madanhmuc)}>Xóa</button>
                    </td>,
                }
            });
            setData1(listCategorys);

            setLoading(true);
        }).catch((error) => {
            return error;
        });

        showCategoryModal()
    }


    async function AddCategoryRoot() {
        let item = { tendanhmuc };
        if (tendanhmuc == null) {
            setErrorMessage("Tên Danh Mục không được để trống")
            setAlertStatus(true)
            setAlertType("error")
        } else {
            await fetch('http://localhost:3000/API/danhmuc/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(async function (response) {
                setErrorMessage("Thêm danh mục thành công")
                setAlertStatus(true)
                setAlertType("success")
                hideAddCategoryModal();
            }).catch(function (error) {
                setErrorMessage("Thêm danh mục thất bại")
                setAlertStatus(true)
                setAlertType("error")
            });
        }

    }

    async function AddCategory() {
        const madanhmuccha = Id;
        let item = {tendanhmuc ,madanhmuccha};
        if (tendanhmuc == null) {
            setErrorMessage("Tên Danh Mục không được để trống")
            setAlertStatus(true)
            setAlertType("error")
        } else {
            await fetch('http://localhost:3000/API/danhmuc/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(async function (response) {
                setErrorMessage("Thêm danh mục thành công")
                setAlertStatus(true)
                setAlertType("success")
                hideAddCategoryModal();
            }).catch(function (error) {
                setErrorMessage("Thêm danh mục thất bại")
                setAlertStatus(true)
                setAlertType("error")
            });
        }

    }

    async function EditCategoryRoot(id) {
        if (tendanhmuc == null) {
            setErrorMessage("Tên Danh Mục không được để trống")
            setAlertStatus(true)
            setAlertType("error")
        } else {
        let item = {tendanhmuc};
        await fetch('http://localhost:3000/API/danhmuc/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(async function (response) {
            setErrorMessage("Cập nhật danh mục thành công")
            setAlertStatus(true)
            setAlertType("success")
            hideAddCategoryModal();
        }).catch(function (error) {
            setErrorMessage("Cập nhật danh mục thất bại")
            setAlertStatus(true)
            setAlertType("error")
        });
    }
    }

    async function DeleteCategoryRoot(id) {
        const is_deleted = 1;
        let item = { is_deleted };
        await fetch('http://localhost:3000/API/danhmuc/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(async function (response) {
            setErrorMessage("Xóa danh mục thành công")
            setAlertStatus(true)
            setAlertType("success")
        }).catch(function (error) {
            setErrorMessage("Xóa danh mục thất bại")
            setAlertStatus(true)
            setAlertType("error")
        });
    }

    

    useEffect(async () => {
        if (data.length > 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])


    return (
        <>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách danh mục cha</Tab>
                </TabList>

                <TabPanel>
                    <button className="btn btn-sm btn-primary" onClick={() => funCheckModal(1)}>Thêm</button>
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
                className="category_modal"
                show={CategorysModal}
                onHide={hideCategorysModal}
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
                            <button className="btn btn-sm btn-primary" onClick={() => funCheckModal(3)}>Thêm</button>
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
                    <Button variant="danger" onClick={hideCategorysModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                className="Addcategory_modal"
                show={AddCategoryModal}
                onHide={hideAddCategoryModal}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{(CheckModal == 1  || CheckModal == 3)? <div className="float-left">Thêm danh mục</div>:<div className="float-left">Sửa danh mục</div>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-1">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="float-left">Tên Danh Mục</Form.Label>
                            <Form.Control type="text" onChange={ChangetxtName} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>{(CheckModal == 1)?
                    <Button variant="primary" onClick={AddCategoryRoot}>
                        Thêm
                    </Button>
                    :(CheckModal == 2)?
                    <Button variant="primary" onClick={() => EditCategoryRoot(Id)}>
                        Sửa
                    </Button>
                    :
                    <Button variant="primary" onClick={AddCategory}>
                        Thêm
                    </Button>
                    }
                    <Button variant="danger" onClick={hideAddCategoryModal}>
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