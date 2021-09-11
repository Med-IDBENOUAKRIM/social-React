import React, { useState } from 'react';
import './Auth.css'
import Login from './Login';
import SignUp from './SignUp';

function FormAuth() {
    const [show, setShow] = useState(true);

    const handleShowForm = e => {
        if(e.target.id === "register") {
            setShow(true)
        }else {
            setShow(false)
        }
    }
    return (
        <div className="container" >
            <div>
                {show && (<Login />)}
                {!show && (<SignUp />)}
            </div>
            <ul>
                {!show && (<li onClick={handleShowForm} id="register">Go to Login</li>)}
                {show && (<li onClick={handleShowForm} id="login" >Go to Register</li>)}
            </ul>
        </div>
    )
}

export default FormAuth
