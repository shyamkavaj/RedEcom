import React from 'react'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from '../../assets/images/ensure_logo.png'
import { authRegister } from 'src/slices/authSlice'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { registerValidationSchema } from 'src/helpers/validation/registerSchema'

const Register = () => {
  const dispatch = useDispatch()

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }

  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={6}>
          <Card className="p-5 shadow-lg">
            <Card.Body>
              <Row>
                <img src={logo} alt="logo" />
              </Row>{' '}
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Register to your account
                </h2>
              </div>
              <Row>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={registerValidationSchema}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                      dispatch(authRegister(values))
                      resetForm({})
                      setSubmitting(false)
                    }}
                  >
                    {({ values, handleChange, handleSubmit, handleBlur, errors }) => {
                      return (
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label htmlFor="first_name" className="form-label">
                                  Firstname
                                </Form.Label>

                                <Form.Control
                                  id="first_name"
                                  name="first_name"
                                  type="text"
                                  onChange={handleChange}
                                  value={values.first_name}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label htmlFor="last_name" className="form-label">
                                  LastName
                                </Form.Label>
                                <Form.Control
                                  id="last_name"
                                  name="last_name"
                                  type="text"
                                  onChange={handleChange}
                                  value={values.last_name}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label htmlFor="email" className="form-label">
                                  Email
                                </Form.Label>

                                <Form.Control
                                  id="email"
                                  name="email"
                                  type="email"
                                  onChange={handleChange}
                                  value={values.email}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label htmlFor="password" className="form-label">
                                  Password
                                </Form.Label>
                                <Form.Control
                                  id="password"
                                  name="password"
                                  type="password"
                                  onChange={handleChange}
                                  value={values.password}
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row className="my-2">
                            <Button variant="primary" type="submit">
                              Register
                            </Button>
                          </Row>
                        </Form>
                      )
                    }}
                  </Formik>
                  <div className="mt-6">
                    <div className="relative">
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                          Or <Link to="/login"> Login</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default Register
