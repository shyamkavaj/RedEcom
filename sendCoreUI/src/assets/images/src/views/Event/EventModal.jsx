import React from 'react'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { createEvent, updateEvent } from 'src/slices/eventSlice'

const EventModal = ({ modalData, onHide }) => {
  const disablePastDate = () => {
    const today = new Date()
    const dd = String(today.getDate() - 1).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }
  const dispatch = useDispatch()

  const addData = (values) => {
    if (!modalData) {
      dispatch(createEvent(values))
      onHide()
    } else {
      dispatch(updateEvent(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      title: (modalData && modalData?.title) || '',
      description: (modalData && modalData?.description) || '',
      end_date: (modalData && modalData?.end_date) || '',
      start_date: (modalData && modalData?.start_date) || '',
    },
    validationSchema: Yup.object().shape({
      start_date: Yup.date()
        .default(() => new Date())
        .required('Start date required'),
      end_date: Yup.date()
        .min(Yup.ref('start_date'), 'End date must be greater than start date')
        .required('End date required'),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Event has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Group>
                    <Form.Label> Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    <ShowError>{formik.errors.title}</ShowError>
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Group>
                    <Form.Label> Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                    <ShowError>{formik.errors.description}</ShowError>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Group>
                    <Form.Label> Event Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="start_date"
                      onChange={formik.handleChange}
                      value={formik.values.start_date}
                      required
                      min={disablePastDate()}
                    />
                    <ShowError>{formik.errors.start_date}</ShowError>
                  </Form.Group>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Group>
                    <Form.Label> Event End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="end_date"
                      onChange={formik.handleChange}
                      value={formik.values.end_date}
                      min={disablePastDate()}
                    />
                    <ShowError>{formik.errors.end_date}</ShowError>
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-3">
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
    </React.Fragment>
  )
}

export default EventModal
