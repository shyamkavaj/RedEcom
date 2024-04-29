import React, { useEffect, useState } from 'react'
import login_img from '../img/login.jpg';
import { NavLink, useNavigate } from 'react-router-dom/dist';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {  useGoogleLogin } from '@react-oauth/google';
// import { loginUser } from '../RTK/Slice/userSlice'
import * as Yup from 'yup';
// import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../RTK/Slice/userSlice';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
// import { loginUser } from '../RTK/Slice/UserSlice';
// import { toast } from "react-toastify";
const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
        .email('invalid email')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required email'),
    password: Yup.string()
        .min(4, 'Password must be 4 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('enter password'),
});

const Login = () => {

    const dispatch = useDispatch();
    const { msg } = useSelector(state => state.user)
    const token = localStorage.getItem('token')
    // var notify = () => toast.error(msg);
    // const [loginData, setLoginData] = useState(
    //     localStorage.getItem('loginData')
    //         ? JSON.parse(localStorage.getItem('loginData'))
    //         : null
    // );
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false)
    // notify = () => toast.error(msg)

    useEffect(() => {
        if (token && msg === "Authenticated!,User Login Successfuly") {
            // navigate('/')
            toast.success(msg, {
                autoClose: 2500,
                position: "top-right",
                onClose: () => {
                    navigate('/')
                    window.location.reload();
                }
            })
        } else if(msg ==="Password Incorrect" || msg === "User does not exist"){
            toast.error(msg,{
                autoClose:2000,
                position:"top-right",
                onClose:() => {
                    window.location.reload();
                }
            })
        }
    }, [msg])

    // const handleFailure = (result) => {
    //     alert(result);
    // };
    const handlegooglelogin = useGoogleLogin({
        onSuccess: async tokenResponce => {
            console.log("token response is ", tokenResponce)

            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponce.access_token}` },
                })
                .then(res => res.data);

            console.log("google userinfo ", userInfo)
            dispatch(loginUser({ ...userInfo, loginVia: 1 }));
        }
    })
    function MyVerticallyCenteredModal(props) {
        const [email, setEmail] = useState()
        const handleSend = async () => {
            // alert(`please verify your email address from gmail ${email}`)
            const res = await axios.post('http://localhost:5001/forgotPassword', { email })
            console.log("res forgot is ", res.data)
            if (res.data.success === false) {
                alert(`'${email} Doesn't Exist'`)
                setModalShow(false)
            }
            else {
                toast.success(res.data.message, {
                    autoClose: 2500,
                    position: "top-right",
                    onClose: () => {
                        navigate('/')
                    }
                });
            }
            // setModalShow(false)
        }
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="order_details_table m-0" style={{ 'fontFamily': 'Poppins' }}>
                        <h2>Forgotten password</h2>
                        <div className="col-md-12 form-group">
                            <input type="text" className="form-control mb-3" id="email"
                                name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                            />
                            <Button style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={
                                handleSend
                                // props.onHide()
                            } >Ok</Button>
                        </div>
                        {/* {res.data.msg} */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={props.onHide} >Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    return (
        <>

            <Formik
                // rede
                enableReinitialize='true'
                initialValues={
                    {
                        email: '',
                        password: '',
                    }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={(values, { resetForm, setSubmitting, props }) => {
                    dispatch(loginUser(values));
                    
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
                                            <img className="img-fluid" src={login_img} alt={'login image'} />
                                            <div className="hover">
                                                <h4>New to our website?</h4>
                                                <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                                                <NavLink className="primary-btn" to={"/signup"} >Create an Account</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="login_form_inner" style={{ 'padding-top': '115px' }}>
                                            <h3 style={{ "margin-bottom": "30px" }}>Log in to enter</h3>
                                            <form className="row login_form" method="post" id="contactForm" noValidate="novalidate" onSubmit={handleSubmit}>
                                                <div className="col-md-12 form-group">
                                                    <input type="text" className="form-control" id="email"
                                                        name="email" placeholder="Email"
                                                        onChange={handleChange} onBlur={handleBlur}
                                                        value={values.email} />
                                                    {errors.email && touched.email && <p>{errors.email}</p>}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <input type="password" className="form-control" id="password"
                                                        name="password" placeholder="Password"
                                                        onChange={handleChange} onBlur={handleBlur}
                                                        value={values.password} />
                                                    {errors.password && touched.password && <p>{errors.password}</p>}
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <div className="creat_account">
                                                        {/* <input type="checkbox" id="f-option2" name="selector" /> */}
                                                        {/* <label htmlFor="f-option2">Keep me logged in</label> */}
                                                        {/* {msg === "Password Incorrect" || msg === "User does not exist" ?

                                                            <label htmlFor="f-option2" style={{ "color": "red", "margin-bottom": "0" }} >{msg}</label>
                                                            : <></>} */}
                                                    </div>
                                                </div>
                                                <div className="col-md-12 form-group">
                                                    <button type="submit" value="submit" className="primary-btn">Log In</button>
                                                    <hr />
                                                    <div>
                                                        {/* {loginData ? (
                                                        <div>
                                                            <h3>You logged in as {loginData.email}</h3>
                                                            <button onClick={handleLogout}>Logout</button>
                                                        </div>
                                                    ) : ( */}
                                                        {/* <GoogleLogin
                                                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                                            buttonText="Log in with Google"
                                                            onSuccess={handleLogin}
                                                            onFailure={handleFailure}
                                                            cookiePolicy={'single_host_origin'}
                                                        ></GoogleLogin> */}
                                                        <button className="primary-btn mb-3" onClick={handlegooglelogin}>Google Log In</button>
                                                        {/* )} */}
                                                    </div>
                                                    <button className="primary-btn" onClick={() => setModalShow(true)} >Forgot Password?</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </Formik>
            {modalShow ? (<MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />) : (<></>)}
            <ToastContainer position='top-right' />
        </>

    )
}

export default Login
