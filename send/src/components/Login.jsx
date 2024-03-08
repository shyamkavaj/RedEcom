import React from 'react'
import login_img from '../img/login.jpg';
import { NavLink } from 'react-router-dom/dist';
import { Formik } from 'formik';
import * as Yup from 'yup';


const DisplayingErrorMessagesSchema = Yup.object().shape({
    // firstname: Yup.string()
    //     .min(2, 'Too short')
    //     .required('enter firstname'),
    // lastname: Yup.string()
    //     .min(2, 'Too short')
    //     .required('enter lastname'),
    email: Yup.string()
        .email('invalid email')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required email'),
    // phone: Yup.string()
    //     .min(10, 'phoneno must be at least 10 digit')
    //     .required('invalid phone no'),
    password: Yup.string()
        .min(4, 'Password must be 4 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('enter password'),
    // confirm_password: Yup.string()
    //     .min(4, 'Password must be 4 characters long')
    //     .matches(/[0-9]/, 'Password requires a number')
    //     .matches(/[a-z]/, 'Password requires a lowercase letter')
    //     .matches(/[A-Z]/, 'Password requires an uppercase letter')
    //     .matches(/[^\w]/, 'Password requires a symbol')
    //     .required('enter password'),
});


const Login = () => {
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
            onSubmit={(values, { resetForm, setSubmitting, props }) => {

                alert(JSON.stringify(values, null, 2));
                // dispatch(addStudent(values));
                resetForm({});
                setSubmitting(false);
                console.log(values)
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
                                                value={values.email}   />
                                                {errors.email && touched.email && <p>{errors.email}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="password" className="form-control" id="name" 
                                                name="password" placeholder="Password"
                                                onChange={handleChange} onBlur={handleBlur}
                                                value={values.password}  />
                                                {errors.password && touched.password && <p>{errors.password}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <div className="creat_account">
                                                    <input type="checkbox" id="f-option2" name="selector" />
                                                    <label htmlFor="f-option2">Keep me logged in</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <button type="submit" value="submit" className="primary-btn">Log In</button>
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
