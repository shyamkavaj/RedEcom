import React, { useEffect, useState } from 'react'
import login_img from '../img/login.jpg';
import { NavLink, useNavigate, useParams } from 'react-router-dom/dist';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const DisplayingErrorMessagesSchema = Yup.object().shape({
    newpassword: Yup.string()
        .min(4, 'Password must be 4 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('Please enter a password'),
    conpassword: Yup.string()
        .oneOf([Yup.ref('newpassword')], 'Passwords must match')
        .required('Please confirm your password'),
});

const ResetPassword = () => {
    const { email } = useParams()
    console.log("email from url is ", email)
    const navigate = useNavigate();

    return (
        <>
            <Formik
                // rede
                enableReinitialize='true'
                initialValues={
                    {
                        newpassword: '',
                        conpassword: '',
                    }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values, { resetForm, setSubmitting, props }) => {
                    console.log("forgot password value is ", values)
                    const data = {
                        email: email,
                        password: values.newpassword
                    }
                    // dispatch(loginUser(values));
                    const res = await axios.patch('http://localhost:5001/resetpassword',data)
                    if (!res.data.success) {
                        toast.error(res.data.message, {
                            autoClose: 2500,
                            position: "top-right",
                            onClose:() => {
                                navigate('/login')
                            }
                        });
                    } else {
                        toast.success(res.data.message, {
                            autoClose: 2500,
                            position: "top-right",
                            onClose: () => {
                                navigate('/')
                            }
                        }
                        );
                    }
                    resetForm({});
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleSubmit, handleBlur, errors, touched, setFieldValue }) => (
                    <div>
                        <section className="login_box_area section_gap">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="login_box_img">
                                            <img className="img-fluid" src={login_img} alt />
                                            <div className="hover">
                                                <h4>Reset Password</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="login_form_inner" style={{ 'padding-top': '115px' }}>
                                            <h3 style={{ "margin-bottom": "30px" }}>Reset Your Password</h3>
                                            <form className="row login_form" method="post" id="contactForm" noValidate="novalidate" onSubmit={handleSubmit}>
                                                <div className="col-md-12 form-group">
                                                    <input type="password" className="form-control" id="email"
                                                        name="newpassword" placeholder="Enter New Password"
                                                        onChange={handleChange} onBlur={handleBlur}
                                                        value={values.newpassword} />
                                                    {errors.newpassword && touched.newpassword && <p>{errors.newpassword}</p>}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <input type="password" className="form-control" id="password"
                                                        name="conpassword" placeholder="Confirm Your Password"
                                                        onChange={handleChange} onBlur={handleBlur}
                                                        value={values.conpassword} />
                                                    {errors.conpassword && touched.conpassword && <p>{errors.conpassword}</p>}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <button type="submit" value="submit" className="primary-btn" >Submit</button>
                                                </div>
                                            </form>
                                            <ToastContainer position='top-right' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </Formik>
        </>

    )
}

export default ResetPassword
