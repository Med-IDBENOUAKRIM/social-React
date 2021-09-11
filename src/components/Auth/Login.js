import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL__API } from '../../config';
import { withRouter } from 'react-router-dom';
import { checkLogin } from '../../helpers/check';

function Login({history}) {

    useEffect(() => {
        checkLogin() && setTimeout(() => history.push('/'), 500);
    },[history])

    const validationSchema = Yup.object({
        email: Yup.string()
                  .email('Enter a valid email')
                  .required("Email is required"),
        password: Yup.string()
                        .min(6, "Password must contain at least of 6 characters")
                        .max(10, "Password must contain a maximum of 10 characters")
                        .required("Password is required"),
        
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, {resetForm}) => {
            fetch(`${URL__API}/user/signin`, {
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
                    console.log(res)
                    toast.error(res.error)
                }else{
                    toast.success("You login successfully");
                    resetForm();
                    localStorage.setItem('jwt_info', JSON.stringify(res))
                    setTimeout(() => history.push('/'), 2500)
                }
                resetForm()
            } )
            
        },
        validationSchema
    })


    return (
        <div className="login" >
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
                <div className="login__form title">
                    <h1>Login</h1>
                </div>
                <div className="login__form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        className="login__input"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email ? (
                        <div className="errors">
                        {formik.errors.email}
                        </div>
                    ) : null}
                </div>
                <div className="login__form">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password" 
                        className="login__input" 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                {formik.errors.password ? (
                    <div className="errors">
                      {formik.errors.password}
                    </div>
                  ) : null}
                  </div>
                <div className="login__form">
                    <button type="submit" className="login__btn" >Login</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login)
