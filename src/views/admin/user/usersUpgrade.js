import React, { useState, useEffect } from 'react';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Badge, Button, Modal, Form } from 'react-bootstrap';
import UsersUpgradeTable from "./usersUpgradeTable";
import Alert from "../../../common/alert"
const moment = require('moment');
require('moment/locale/vi');



function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    //const [exp_seller, setexp_seller] = useState();

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    async function UpgradeRole(id) {
        var exp_seller = new Date();
        exp_seller.setDate(exp_seller.getDate() + 7);
        let item = {exp_seller};
        await fetch('http://localhost:3000/API/user/upgrade/' + id, {
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
            setErrorMessage("Tài khoản đã nâng cấp thành seller")
            setAlertStatus(true)
            setAlertType("success")
            return response;
        }).catch((error) => {
            return error;
        });
    }

    useEffect(async () => {
        if (!loading) {
            
            await fetch("http://localhost:3000/API/user/allactivate_upgrade", {
                method: 'GET'
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listUsers = data.map((val) => {
                    return {
                        "Id": val.mataikhoan,
                        "hoten": val.hoten,
                        "email": val.email,
                        "role": (val.role == 1) ? <Badge bg="info">bidder</Badge> : <Badge bg="info">seller</Badge>,
                        "actions": <button onClick={() => UpgradeRole(val.mataikhoan)} className="btn btn-sm btn-dark">Nâng Cấp</button>,
                    }
                });
                setData(listUsers);
                setLoading(true);
            }).catch((error) => {
                return error;
            });
        }
    }, []);

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
                    <Tab>Danh sách người dùng xin nâng cấp</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5 px-0">
                        {loading ?
                            <UsersUpgradeTable userData={data} />
                            :
                            <div>Loading...</div>
                        }
                    </div>
                </TabPanel>
            </Tabs>

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