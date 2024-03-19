import React from 'react'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import { contactPartner, contactPartnerConfirm } from 'src/slices/inquirySlice'
import { fetchProviderService } from 'src/slices/providerServiceSlice'
import Swal from 'sweetalert2'

const InquiryPageModal = ({ onHide, modalData }) => {
  const dispatch = useDispatch()
  const { providerServices } = useSelector((state) => state.providerService)
  const { cPartners } = useSelector((state) => state.inquiry)

  const addData = async (values) => {
    dispatch(contactPartnerConfirm(values))
    onHide()
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validateMobileNumber = Yup.object({
    mobile_number: Yup.string()
      .required('Mobile number is Required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Add 10 digit mobile number')
      .max(10, 'Add 10 digit mobile number'),
  })
  const statePartner = cPartners?.filter((p) => p.state === modalData.state)
  useEffect(() => {
    dispatch(contactPartner(modalData.id))
    dispatch(fetchProviderService())
  }, [dispatch, modalData])
  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData.id) || undefined,
      name: (modalData && modalData.name) || '',
      email: (modalData && modalData.email) || '',
      mobile_number: (modalData && modalData.mobile_number) || '',
      state: (modalData && modalData.state) || '',
      service_id: (modalData && modalData.service_id) || undefined,
      partner_id: (modalData && modalData.partner_id) || undefined,
      createdAt: (modalData && modalData.createdAt) || '',
    },
    validationSchema: validateMobileNumber,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Assign Partner Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control id="name" type="text" name="name" value={formik.values.name} disabled />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                disabled
                id="email"
                type="text"
                name="email"
                value={formik.values.email}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                id="mobile_number"
                type="text"
                name="mobile_number"
                value={formik.values.mobile_number}
                disabled
              />
            </Form.Group>

            {formik.touched.mobile_number && formik.errors.mobile_number && (
              <ShowError>{formik.errors.mobile_number}</ShowError>
            )}
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                id="state"
                type="text"
                name="state"
                value={formik.values.state}
                disabled
              />
            </Form.Group>

            {formik.touched.state && formik.errors.state && (
              <ShowError>{formik.errors.state}</ShowError>
            )}
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label> Service</Form.Label>
              <Form.Select
                disabled
                id="service_id"
                type="text"
                name="service_id"
                onChange={formik.handleChange}
                value={formik.values.service_id}
              >
                <option>Select Service</option>
                {providerServices &&
                  providerServices.map((providerService, index) => {
                    const { title, id } = providerService
                    return (
                      <option value={id} key={index}>
                        {title}
                      </option>
                    )
                  })}
              </Form.Select>
              <ShowError>{formik.errors.service_id}</ShowError>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label> Partner</Form.Label>
              <Form.Select
                id="partner_id"
                type="text"
                name="partner_id"
                onChange={formik.handleChange}
                value={formik.values.partner_id}
              >
                <option>Select Partner</option>
                {statePartner &&
                  statePartner.map((partner, index) => {
                    const { id, name } = partner
                    return (
                      <option value={id} key={index}>
                        {name}
                      </option>
                    )
                  })}
              </Form.Select>
              <ShowError>{formik.errors.partner_id}</ShowError>
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
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default InquiryPageModal
