import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '../common/alert';

const activeAccount = (props) => {
    const { code } = useParams() || 1
    useEffect(async () => {
        let item = { code };
        await fetch("http://localhost:3000/API/user/activate-account", {
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
        }).catch(function (error) {

        });
    }, []);

    return (
        <div className="Login">
            <div className="form-title">
                <h2>Tài khoản đã được kích hoạt!! Bạn có thể đăng nhập</h2>
            </div>
        </div>
    );
};

export default activeAccount;