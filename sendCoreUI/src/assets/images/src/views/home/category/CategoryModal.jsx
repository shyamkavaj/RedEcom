import React from 'react'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { addCategory, updateCategory } from 'src/slices/categorySlice'

const CategoryModal = ({ modalData, onHide, status }) => {
  const dispatch = useDispatch()

  const addData = (values) => {
    if (!modalData) {
      dispatch(addCategory(values))
      onHide()
    } else {
      dispatch(updateCategory(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      cat_id: (modalData && modalData?.id) || undefined,
      title: (modalData && modalData?.title) || '',
      description: (modalData && modalData?.description) || '',
    },
    //validationSchema: categoryValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Service has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <>
      <Row>
        <Col md={12}>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    // isInvalid={formik.errors.title ? true : false}
                    //isValid={formik.dirty && !formik.errors.title ? true : false}
                  />
                  <ShowError>{formik.errors.title}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    // isInvalid={formik.errors.description ? true : false}
                    // isValid={formik.dirty && !formik.errors.description ? true : false}
                  />
                  <ShowError>{formik.errors.description}</ShowError>
                </Form.Group>
              </Col>
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

export default CategoryModal
