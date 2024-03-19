import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import ImagePreview from 'src/components/ImagePreview'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ImageFilePreview from 'src/components/ImageFilePreview'
import { createTestimonial, updateTestimonial } from 'src/slices/testimonialSlice'

const TestimonialModal = ({ modalData, onHide }) => {
  const imageRef = useRef()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData.id) || undefined,
      image: '',
      name: (modalData && modalData.name) || '',
      description: (modalData && modalData.description) || '',
      designation: (modalData && modalData.designation) || '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!modalData) {
        dispatch(createTestimonial(values))
        onHide()
      } else {
        dispatch(updateTestimonial(values))
      }
      onHide()
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Testimonial has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })

  return (<>
    <Row>
      <Col md={12}>
        <Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                //isInvalid={formik.errors.name ? true : false}
                //isValid={formik.dirty && !formik.errors.name ? true : false}
                />
                <ShowError>{formik.errors.name}</ShowError>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Designation </Form.Label>
                <Form.Control
                  name="designation"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.designation}
                // isInvalid={formik.errors.designation ? true : false}
                // isValid={formik.dirty && !formik.errors.designation ? true : false}
                />
                <ShowError>{formik.errors.designation}</ShowError>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <div>
                  <Button variant='success' onClick={() => imageRef.current.click()}>
                    Upload Image
                  </Button>
                </div>
                {modalData && !formik.values.image ? (
                  <div className='mt-2'>
                    {modalData.image ? (
                      <ImagePreview width={200} height={100} src={modalData.image} alt='image' />
                    ) : null}
                  </div>
                ) : (
                  formik.values.image && (
                    <ImageFilePreview width={200} height={100} file={formik.values.image} />
                  )
                )}
                <Form.Control
                  hidden
                  ref={imageRef}
                  name='image'
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    formik.setFieldValue('image', e.currentTarget.files[0])
                  }
                />
                <ShowError>{formik.errors.image}</ShowError>

              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  type="text"
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
              <Button variant='success' type='submit'
                disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
              >
                {!modalData ? "Submit" : "Update"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </>)
}

export default TestimonialModal
