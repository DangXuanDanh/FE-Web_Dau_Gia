import React, {useState, useEffect} from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { Badge } from 'react-bootstrap';
import UserTable from "./userTable";

function Users() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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
                        "actions": <a href={'#'} className="btn btn-sm btn-dark">Chi tiết</a>
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
        </>
    )
};

export default Users;