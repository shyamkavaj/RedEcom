import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { addAchivement, updateAchivement } from 'src/slices/achivementSlice'
import Swal from 'sweetalert2'

const AchivementModel = ({ modalData, onHide }) => {
  const dispatch = useDispatch()

  const addData = async (values) => {
    if (!modalData) {
      await dispatch(addAchivement(values))
      onHide()
    } else {
      await dispatch(updateAchivement(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      sub_title: (modalData && modalData?.sub_title) || '',
      achviment_number: (modalData && modalData?.achviment_number) || '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Achivement has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    },
  })

  return (<>
    <Row>
      <Col md={12}>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label> Title</Form.Label>
                <Form.Control
                  id="sub_title"
                  type="text"
                  name="sub_title"
                  onChange={formik.handleChange}
                  value={formik.values.sub_title}
                //isInvalid={formik.errors.sub_title ? true : false}
                //isValid={formik.dirty && !formik.errors.sub_title ? true : false}
                />
                <ShowError>{formik.errors.achviment_number}</ShowError>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label> Achivement Number </Form.Label>
                <Form.Control
                  id="achviment_number"
                  type="text"
                  name="achviment_number"
                  onChange={formik.handleChange}
                  value={formik.values.achviment_number}
                // isInvalid={formik.errors.answer ? true : false}
                //isValid={formik.dirty && !formik.errors.achviment_number ? true : false}
                />
                <ShowError>{formik.errors.achviment_number}</ShowError>
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
  </>)
}

export default AchivementModel
