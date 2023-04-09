import React, { useEffect, useState } from 'react';
import "./loggin.css"
const Loggin = ({ chooseMessage }) => {
    const [user, setuser] = useState();
    const [password, setpassword] = useState();
    const [result, setresult] = useState();
    const [existToken, setexistToken] = useState(false);
   function loggin(){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": user,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://three-points.herokuapp.com/api/login", requestOptions)
            .then(response => response.json())
            .then(result => setresult(result))
            .catch(error => console.log('error', error));
        try {
            setexistToken(result['token'] !== undefined);
            if (existToken) {
                chooseMessage(true)
            }
        } catch (error) {

        }

    }
    const handleUser = (event) => {
        setuser(event.target.value);
    }

    const handlepassword = (event) => {
        setpassword(event.target.value);
    }

    return (
        <div className="Auth-form-container">
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                        className="form-control mt-1"
                        placeholder="Enter email"
                        onChange={handleUser}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        onChange={handlepassword}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-primary" onClick={() => { loggin() }}>
                        Submit
                    </button>
                </div>

            </div>

        </div>
    )
};


export default Loggin