import React, { useEffect, useState } from 'react';
import "./loggin.css"
const Loggin = ({ chooseMessage }) => {
    const [user, setuser] = useState();
    const [password, setpassword] = useState();
    const [error, seterror] = useState(false);

    function loggin() {

        var raw = JSON.stringify({
            "username": user,
            "password": password
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('https://three-points.herokuapp.com/api/login', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                debugger
                // check for error response
                if (!response.ok) {
                    seterror(true);
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                chooseMessage(true);
            })
            .catch(error => {
                seterror(true);
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });


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
                {error == true &&
                    <div class="alert alert-danger" role="alert">
                        Password or user error!
                    </div>
                }
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