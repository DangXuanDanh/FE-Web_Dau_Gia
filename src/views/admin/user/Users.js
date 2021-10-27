import React, {useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { Badge } from 'react-bootstrap';
import UserTable from "./userTable";

import Alert from "../../../common/alert"

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertType, setAlertType] = useState('');

    async function DeleteUser(id) {
       await fetch('http://localhost:3000/API/user/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            setErrorMessage("Tài khoản đã được xóa")
            setAlertStatus(true)
            setAlertType("success")
            return response;
        }).catch((error) => {
            return error;
        });
    }

    useEffect(async () => {
        if(!loading) {
            await fetch("http://localhost:3000/API/user/alluser",{ 
                method: 'GET'
            }).then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw response;
            }).then(data => {
                let listUsers = data.map((val) => {
                    return {
                        "Id": val.mataikhoan,
                        "hoten": val.hoten,
                        "email": val.email,
                        "status": val.activate_status ? <Badge bg="success">Active</Badge> : <Badge bg="secondary">Inactive</Badge>,
                        "actions": <a href={'#'} className="btn btn-sm btn-dark">Chi tiết</a> ,
                        "actions1": <button onClick={() => DeleteUser(val.mataikhoan)} className="btn btn-sm btn-danger">Xóa</button>
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
        if (data.length > 0 ) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data])

    return (
        <>
            <Tabs className="admin-tabs mt-2">
                <TabList>
                    <Tab>Danh sách người dùng</Tab>
                </TabList>

                <TabPanel>
                    <div className="container py-5 px-0">
                        { loading ?
                            <UserTable userData={data}/>
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