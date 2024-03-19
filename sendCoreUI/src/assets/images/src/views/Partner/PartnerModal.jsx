import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { fetchOccupation, getAllCityByState, getAllState } from 'src/slices/subAdminSlice'
import { useFormik } from 'formik'
import { createPartner } from 'src/slices/partnersSlice'
import { fetchProviderService } from 'src/slices/providerServiceSlice'
import { partnerValidationSchema } from 'src/helpers/validation/partnerSchema'

const PartnerModal = ({ modalData, onHide }) => {
  const { states, occupations, citys } = useSelector((state) => state.subAdmin)
  const { providerServices } = useSelector((state) => state.providerService)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllState())
    dispatch(fetchOccupation())
    dispatch(fetchProviderService())
  }, [dispatch])

  const onStateChange = (id) => {
    dispatch(getAllCityByState(id))
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      name: (modalData && modalData?.name) || '',
      mobile_number: (modalData && modalData?.mobile_number) || '',
      email: (modalData && modalData?.email) || '',
      password: (modalData && modalData?.password) || '',
      state: (modalData && modalData?.state) || '',
      city: (modalData && modalData?.city) || '',
      occupation_id: (modalData && modalData?.occupation_id) || '',
      service_id: (modalData && modalData?.service_id) || '',
    },
    validationSchema: partnerValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!modalData) {
        dispatch(createPartner(values))
        onHide()
      } else {
        // dispatch((values))
        onHide()
      }
      resetForm({})
      setSubmitting(false)
    },
  })

  return (
    <>
      <Row>
        <Col md={12}>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <ShowError>{formik.errors.name}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Mobile Number</Form.Label>
                  <Form.Control
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    onChange={formik.handleChange}
                    value={formik.values.mobile_number}
                  />

                  {formik.touched.mobile_number && formik.errors.mobile_number && (
                    <ShowError>{formik.errors.mobile_number}</ShowError>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Service</Form.Label>
                  <Form.Select
                    id="service_id"
                    name="service_id"
                    onChange={formik.handleChange}
                    value={formik.values.service_id}
                  >
                    <option>Select Service</option>
                    {providerServices.map((providerService) => {
                      const { id, title } = providerService
                      return (
                        <option value={id} key={id}>
                          {title}{' '}
                        </option>
                      )
                    })}
                  </Form.Select>
                  <ShowError>{formik.errors.service_id}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label>State</Form.Label>
                <Form.Select
                  id="state"
                  name="state"
                  className="form-control"
                  onChange={(e) => {
                    formik.handleChange(e)
                    onStateChange(e.currentTarget.value)
                  }}
                  value={formik.values.state}
                >
                  <option disabled>Select State</option>
                  {states.map((s) => {
                    return (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    )
                  })}
                </Form.Select>
                <ShowError>{formik.errors.state}</ShowError>
              </Col>
              <Col md={4}>
                <Form.Label>City</Form.Label>
                <Form.Select
                  id="city"
                  name="city"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  disabled={formik.values.state ? false : true}
                >
                  <option disabled>Select City</option>
                  {citys &&
                    citys.map((c, index) => {
                      return (
                        <option value={c.id} key={index}>
                          {c.city}
                        </option>
                      )
                    })}
                </Form.Select>
                <ShowError>{formik.errors.city}</ShowError>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>ocuupation</Form.Label>
                  <Form.Select
                    id="occupation_id"
                    name="occupation_id"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.occupation_id}
                  >
                    <option value="">Select Occupation</option>
                    {occupations.map((occupation, index) => {
                      const { id, name } = occupation
                      return (
                        <option value={id} key={index}>
                          {name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <ShowError>{formik.errors.email}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <ShowError>{formik.errors.password}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Col md={12}>
                <Button
                  variant="success"
                  type="submit"
                  //disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
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

export default PartnerModal
