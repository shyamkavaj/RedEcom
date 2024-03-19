import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import logo from '../../assets/images/ensure_logo.png'
import { authLogin, resetError } from 'src/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { AiFillMail, AiFillLock } from 'react-icons/ai'
import { loginValidationSchema } from 'src/helpers/validation/loginSchema'
import { Button, Card, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'

const Login = () => {
  const { error, status, role } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const rle = localStorage.getItem('role')

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetError())
  }, [dispatch])

  useEffect(() => {
    if (status) {
      navigate('/')
      window.location.reload()
    }

    if (role === 'Customer' || rle === 'Customer') {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      navigate('/login')
    }
  }, [status, role, rle])

  const initialValues = {
    email: '',
    password: '',
  }

  return (
    <>
      <div style={{ backgroundColor: '#359784', height: '100vh' }}>
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={6} className="my-5">
              <Card className="p-5 shadow-lg rounded-4" style={{ backgroundColor: '#fff' }}>
                <Card.Body>
                  <Row className="mb-5">
                    <Image
                      src={logo}
                      alt="logo"
                      className="img-fluid mx-auto"
                      style={{ width: '200px' }}
                    />
                  </Row>
                  <Row className="mb-5">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <h2 className="mt-6 text-center text-3xl font-extrabold signin">
                        Welcome Back !!!
                      </h2>
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={loginValidationSchema}
                        onSubmit={async (values, { resetForm, setSubmitting }) => {
                          await dispatch(authLogin(values))
                          if (!status) {
                            navigate('/login')
                          } else {
                            navigate('/')
                            window.location.reload()
                          }
                          setSubmitting(false)
                        }}
                      >
                        {({ values, handleChange, handleSubmit, errors, touched }) => {
                          return (
                            <Form className="space-y-6" onSubmit={handleSubmit} method="POST">
                              <Row>
                                <Col md={12}>
                                  <Form.Label className="form-label">Email</Form.Label>
                                  <InputGroup className="">
                                    <Form.Control
                                      id="email"
                                      name="email"
                                      type="email"
                                      onChange={handleChange}
                                      value={values.email}
                                    />
                                    <InputGroup.Text id="basic-addon1" className="iconic">
                                      <AiFillMail />
                                    </InputGroup.Text>
                                  </InputGroup>
                                  {touched.email && errors.email && (
                                    <ShowError>{errors.email}</ShowError>
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <Col md={12}>
                                  <Form.Label className="form-label">Password</Form.Label>
                                  <InputGroup className="">
                                    <Form.Control
                                      id="password"
                                      name="password"
                                      type="password"
                                      onChange={handleChange}
                                      value={values.password}
                                    />
                                    <InputGroup.Text id="basic-addon1" className="iconic">
                                      <AiFillLock />
                                    </InputGroup.Text>
                                  </InputGroup>
                                  {touched.password && errors.password && (
                                    <ShowError>{errors.password}</ShowError>
                                  )}
                                  <ShowError>{error}</ShowError>
                                </Col>
                              </Row>
                              <Row className="my-2">
                                <Col className="d-grid gap-2">
                                  <Button
                                    type="submit"
                                    style={{ backgroundColor: '#359784', color: 'white' }}
                                    className="py-3 border-0 shadow-lg"
                                  >
                                    Login
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          )
                        }}
                      </Formik>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default Login
