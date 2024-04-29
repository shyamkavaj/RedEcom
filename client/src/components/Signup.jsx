import React, { useEffect } from 'react';
import signup_img from '../img/login.jpg';
import { NavLink, useNavigate } from 'react-router-dom/dist';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {addUser} from '../RTK/Slice/userSlice'
const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short')
        .required('enter firstname'),
    lastName: Yup.string()
        .min(2, 'Too short')
        .required('enter lastname'),
    email: Yup.string()
        .email('invalid email')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required email'),
    phone: Yup.string()
        .min(10, 'phoneno must be at least 10 digit')
        .required('invalid phone no'),
    password: Yup.string()
        .min(4, 'Password must be 4 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('enter password'),
    confirm_password: Yup.string()
        .min(4, 'Password must be 4 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required('enter password'),
});


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {message,status} = useSelector(state => state.user)
    useEffect(() => {
        console.log("status is out ",status)

        if(status==1){
            console.log("status is ",status)
            navigate('/login')
            window.location.reload();
        }
    },[status])
    return (
        <Formik
            // rede
            enableReinitialize='true'
            initialValues={
                // st.enable ? st.singleEmail :
                {
                    name: '',
                    lastName: '',
                    email: '',
                    phone: '', // Default gender value
                    password: '',
                    confirm_password: '',
                }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, { resetForm, setSubmitting, props }) => {
                // alert(JSON.stringify(values, null, 2));
                // console.log(values)
                dispatch(addUser(values));
                // window.relo
                // alert('user created successfull')
                // navigate('/login')
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
                                    <div className="login_form_inner" >
                                        <h3 style={{ "padding-top": "25px" }}>Create Account to enter</h3>
                                        <form className="row login_form" method="post" id="contactForm" onSubmit={handleSubmit}
                                        >
                                            {/* <div className="col-md-12 form-group">
                                                <input type="text" className="form-control" id="fname" name="fname" placeholder="FirstName" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'" />
                                            </div> */}

                                            <div className="col-md-12 form-group">
                                                <input type="text" className="form-control" id="fname"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="FirstName"
                                                    value={values.name}
                                                />
                                                {errors.name && touched.name && <p style={{"color":"red","margin-bottom":"0"}}>{errors.name}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="text" className="form-control" id="lname" placeholder="LastName"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lastName}
                                                />
                                                {errors.lastname && touched.lastname && <p style={{"color":"red"}}>{errors.lastname}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="text" className="form-control" id="email"
                                                    placeholder="Email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email} />
                                                {errors.email && touched.email && <p style={{"color":"red"}}>{errors.email}</p>}
                                            </div><div className="col-md-12 form-group">
                                                <input type="number" className="form-control" id="phone" placeholder="Phone "
                                                    name="phone"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.phone} />
                                                {errors.phone && touched.phone && <p style={{"color":"red"}}>{errors.phone}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="password" className="form-control" id="password"
                                                    name="password" placeholder="Password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password} />
                                                {errors.password && touched.password && <p style={{"color":"red"}}>{errors.password}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <input type="password" className="form-control" id="name"
                                                    value={values.confirm_password}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange} name="confirm_password" placeholder="Confirm Password" />
                                                {errors.confirm_password && touched.confirm_password && <p style={{"color":"red"}}>{errors.confirm_password}</p>}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <div className="creat_account">
                                                    {/* <input type="checkbox" id="f-option2" name="selector" /> */}
                                                    
                                                    {
                                                        message=="user already exist" ? <label htmlFor="f-option2" style={{'color':'red'}}>{message}</label>:<></>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                            <button type="submit" value="submit" className="primary-btn" >Creact Account</button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="login_box_img">
                                        <img className="img-fluid" src={signup_img} alt />
                                        <div className="hover">
                                            <h4>New to our website?</h4>
                                            <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                                            <NavLink className="primary-btn" to={"/login"} >Login</NavLink>
                                        </div>
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

export default Signup
