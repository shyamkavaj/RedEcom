import React from 'react'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { createPlan, updatePlan } from 'src/slices/planSlice'

const PlanModal = ({ modalData, onHide }) => {
  const dispatch = useDispatch()

  const addData = async (values) => {
    if (!modalData) {
      await dispatch(createPlan(values))
      onHide()
    } else {
      await dispatch(updatePlan(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      title: (modalData && modalData?.title) || '',
      price: (modalData && modalData?.price) || '',
      plan_type: (modalData && modalData?.plan_type) || '',
      description1: (modalData && modalData?.description1) || '',
      description2: (modalData && modalData?.description2) || '',
      description3: (modalData && modalData?.description3) || '',
      description4: (modalData && modalData?.description4) || '',
      description5: (modalData && modalData?.description5) || '',
      description6: (modalData && modalData?.description6) || '',
      description7: (modalData && modalData?.description7) || '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Plan has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Title</Form.Label>
                  <Form.Control
                    id="title"
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    //isInvalid={formik.errors.title ? true : false}
                    //isValid={formik.dirty && !formik.errors.title ? true : false}
                  />
                  <ShowError>{formik.errors.title}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Price</Form.Label>
                  <Form.Control
                    id="price"
                    type="text"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    //isInvalid={formik.errors.price ? true : false}
                    //isValid={formik.dirty && !formik.errors.price ? true : false}
                  />
                  <ShowError>{formik.errors.price}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Plan Type</Form.Label>
                  <Form.Select
                    id="plan_type"
                    name="plan_type"
                    onChange={formik.handleChange}
                    value={formik.values.plan_type}
                    aria-label="Default select example"
                    //isInvalid={formik.errors.plan_type ? true : false}
                    //isValid={formik.dirty && !formik.errors.plan_type ? true : false}
                  >
                    <option>Select Status</option>
                    <option value="Month">Month</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Year">Year</option>
                  </Form.Select>
                  <ShowError>{formik.errors.plan_type}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-1 </Form.Label>
                  <Form.Control
                    id="description1"
                    type="text"
                    name="description1"
                    onChange={formik.handleChange}
                    value={formik.values.description1}
                    //isInvalid={formik.errors.description1 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description1 ? true : false}
                  />
                  <ShowError>{formik.errors.description1}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-2</Form.Label>
                  <Form.Control
                    id="description2"
                    type="text"
                    name="description2"
                    onChange={formik.handleChange}
                    value={formik.values.description2}
                    //isInvalid={formik.errors.description2 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description2 ? true : false}
                  />
                  <ShowError>{formik.errors.description2}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-3 </Form.Label>
                  <Form.Control
                    id="description3"
                    type="text"
                    name="description3"
                    onChange={formik.handleChange}
                    value={formik.values.description3}
                    //isInvalid={formik.errors.description3 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description3 ? true : false}
                  />
                  <ShowError>{formik.errors.description3}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-4</Form.Label>
                  <Form.Control
                    id="description4"
                    type="text"
                    name="description4"
                    onChange={formik.handleChange}
                    value={formik.values.description4}
                    //isInvalid={formik.errors.description4 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description4 ? true : false}
                  />
                  <ShowError>{formik.errors.description4}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-5 </Form.Label>
                  <Form.Control
                    id="description5"
                    type="text"
                    name="description5"
                    onChange={formik.handleChange}
                    value={formik.values.description5}
                    //isInvalid={formik.errors.description5 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description5 ? true : false}
                  />
                  <ShowError>{formik.errors.description5}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-6</Form.Label>
                  <Form.Control
                    id="description6"
                    type="text"
                    name="description6"
                    onChange={formik.handleChange}
                    value={formik.values.description6}
                    //isInvalid={formik.errors.description6 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description6 ? true : false}
                  />
                  <ShowError>{formik.errors.description6}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Description-7</Form.Label>
                  <Form.Control
                    id="description7"
                    type="text"
                    name="description7"
                    onChange={formik.handleChange}
                    value={formik.values.description7}
                    //isInvalid={formik.errors.description7 ? true : false}
                    //isValid={formik.dirty && !formik.errors.description7 ? true : false}
                  />
                  <ShowError>{formik.errors.description7}</ShowError>
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

export default PlanModal
