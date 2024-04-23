import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { adminLogin } from 'src/RTK/slice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'src/RTK/context/authProvider';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
const Login = () => {

  const dispatch = useDispatch();
  const { status } = useSelector(state => state.admin);
  const { loginToken } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("tokenAuth");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      navigate('/')
    }
  })
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: ""
  }
  const loginSchema = Yup.object({
    email: Yup.string().email().required("Plaese enter your email"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please provide a password')
  });
  // const { loginToken } = useAuth();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('Form submitted with values:', values);
      const res = await axios.post('http://localhost:5001/login', { data: values });
      console.log("res res is ", res.data)
      if (res.data.status) {
        loginToken(res.data.token, "admin")
      } else {
        alert(res.data.message)
      }
      
      resetForm(); // No need to await resetForm() as it's synchronous
    }

  });
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username"
                        autoComplete="username"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </CInputGroup>
                    {errors.email && touched.email ? (
                      <p className='form-error text-danger'>{errors.email}</p>
                    ) : null}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </CInputGroup>
                    {errors.password && touched.password ? (
                      <p className='form-error text-danger'>{errors.password}</p>
                    ) : null}
                    <CRow>
                      <CCol xs={6}>
                        <CButton className="px-4"  style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }}
                          onClick={handleSubmit}>
                          Login
                        </CButton>
                        {/* <ToastContainer position="top-right" /> */}
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '44%', background: 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>E-Commerce</h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
