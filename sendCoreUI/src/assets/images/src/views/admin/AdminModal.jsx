import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { createAdmin, updateAdmin } from 'src/slices/adminSlice'
import Swal from 'sweetalert2'

const AdminModal = ({ modalData, onHide }) => {
  const dispatch = useDispatch()

  const addData = async (values) => {
    if (!modalData) {
      await dispatch(createAdmin(values))
      onHide()
    } else {
      dispatch(updateAdmin(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      name: (modalData && modalData?.name) || '',
      mobile_number: (modalData && modalData?.mobile_number) || '',
      email: (modalData && modalData?.email) || '',
      password: (modalData && modalData?.password) || '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your details has been Updated',
        showConfirmButton: false,
        timer: 3000,
      })
    },
  })

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <ShowError>{formik.errors.name}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    placeholder="Enter Mobile Number"
                    onChange={formik.handleChange}
                    value={formik.values.mobile_number}
                  />
                  <ShowError>{formik.errors.mobile_number}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    disabled
                  />
                  <ShowError>{formik.errors.email}</ShowError>
                </Form.Group>
              </Col>
              {/* <Col md={6}>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="password"
                                    type='text'
                                    name="password"
                                    placeholder='*******'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <ShowError>{formik.errors.password}</ShowError>
                            </Form.Group>
                        </Col> */}
            </Row>
            <Row className="my-2">
              <Col md={12}>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                >
                  {!modalData ? 'Submit' : 'Update'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default AdminModal
