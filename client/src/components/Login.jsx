import React, { useEffect } from 'react'
import login_img from '../img/login.jpg';
import { NavLink, useNavigate } from 'react-router-dom/dist';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../RTK/Slice/userSlice'
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../RTK/Slice/userSlice';
// import { loginUser } from '../RTK/Slice/UserSlice';

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
    const { status,msg } = useSelector(state => state.user)
    const token = localStorage.getItem('token')
    // console.log(status)
    
    var notify = () =>toast.error(msg);
    // useEffect()
    const navigate = useNavigate()
    useEffect(() => {
        // console.log("in notify")
    },[msg])
    // if(token){
        //     navigate('/')
        // }
        notify = () => toast.error(msg)
    useEffect(() => {
        if (token && msg === "Authenticated!,User Login Successfuly") {
            navigate('/')
            window.location.reload();
        }
    },[msg])
    return (
        <Formik
            // rede
            enableReinitialize='true'
            initialValues={
                // st.enable ? st.singleEmail :
                {
                    email: '',
                    password: '',
                }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={ (values, { resetForm, setSubmitting, props }) => {

                // alert(JSON.stringify(values, null, 2))
                // setInterval(dispatch(loginUser),1000)
                dispatch(loginUser(values));
                
                // console.log("st ", status)
                // setInterval(() => {
                    // if (token && msg === "Authenticated!,User Login Successfuly") {
                    //     console.log("hiiiiiiiii")
                    //     navigate('/')
                    // } else {
                    //     console.log('dasfdsafdas')
                    // }
                // }, 1000)

                resetForm({});
                setSubmitting(false);
                // console.log(values)
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
                                                <input type="text" className="form-control" id="name"
                                                    name="email" placeholder="Email"
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    value={values.email} />
                                                {errors.email && touched.email && <p>{errors.email}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="password" className="form-control" id="name"
                                                    name="password" placeholder="Password"
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    value={values.password} />
                                                {errors.password && touched.password && <p>{errors.password}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <div className="creat_account">
                                                    {/* <input type="checkbox" id="f-option2" name="selector" /> */}
                                                    {/* <label htmlFor="f-option2">Keep me logged in</label> */}
                                                    {msg === "Password Incorrect" || msg==="User does not exist" ? 
                                                    
                                                    <label htmlFor="f-option2" style={{"color":"red","margin-bottom":"0"}} >{msg}</label>
                                                     : <></>}
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <button type="submit" value="submit" className="primary-btn" onClick={notify}>Log In</button>
                                                <a href="#">Forgot Password?</a>
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

    )
}

export default Login
