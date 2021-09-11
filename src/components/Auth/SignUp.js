import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL__API } from '../../config';
import { withRouter } from 'react-router-dom';

function SignUp({history}) {

    const validationSchema = Yup.object({
        username: Yup.string()
                  .min(4, "must contain at least of 4 characters")
                  .max(50, "must contain a maximum of 50 characters")
                  .required("username is required"),
        email: Yup.string()
                  .email('Enter a valid email')
                  .required("Email is required"),
        password: Yup.string()
                        .min(6, "must contain at least of 6 characters")
                        .max(10, "must contain a maximum of 10 characters")
                        .required("Password is required"),
        
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: (values, {resetForm}) => {
            fetch(`${URL__API}/user/signup`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    console.log(res.error)
                    toast.error(res.error.email || res.error.password || res.error.username)
                }else{
                    toast.success(res.msg);
                    resetForm();
                    setTimeout(() => history.push('/auth'), 2500)
                }
                resetForm()
            } )
        },
        validationSchema
    })

    return (
        <div className="register" >
            <ToastContainer
                position="bottom-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <form onSubmit={formik.handleSubmit} >
                <div className="register__form title">
                    <h1>Register</h1>
                </div>
                <div className="register__form">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="register__input"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.username ? (
                        <div className="errors">
                        {formik.errors.username}
                        </div>
                    ) : null}
                </div>
                <div className="register__form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        className="register__input"
                        value={formik.values.email} 
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email ? (
                        <div className="errors">
                        {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div className="register__form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password" 
                        className="register__input" 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password ? (
                        <div className="errors">
                        {formik.errors.password}
                        </div>
                    ) : null}
                </div>
                <div className="register__form">
                    <button type="submit" className="register__btn" >Register</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(SignUp)
