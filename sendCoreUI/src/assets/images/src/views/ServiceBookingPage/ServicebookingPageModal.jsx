import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from 'src/slices/manageUsersSlice'
import { updateServicebooking } from 'src/slices/serviceBookingReportsSlice'
import Swal from 'sweetalert2'
import { toLocalImageUrl } from 'src/helpers/AssetHelpers'
import baseAPIPDF from 'src/api/baseApiPdf'

const ServicebookingPageModal = ({ id, onHide }) => {
  const { bookings } = useSelector((state) => state.serviceBooking)
  const { users } = useSelector((state) => state.manageUsers)
  const user = localStorage.getItem('token')
  const singleCustomerService = bookings.find((b) => b.id == id)
  const partners =
    users &&
    users.filter(
      (user) =>
        user.role === 'Partner' &&
        singleCustomerService &&
        user.state === singleCustomerService.state &&
        user.service_id == singleCustomerService.service_id,
    )

  const dispatch = useDispatch()

  const documents = singleCustomerService && singleCustomerService.documents

  let docs = documents != null ? JSON.parse(documents) : []

  const addData = async (values) => {
    await dispatch(updateServicebooking(values))
    onHide()
  }

  const formik = useFormik({
    initialValues: {
      s_id: (singleCustomerService && singleCustomerService.id) || undefined,

      partner_name: (singleCustomerService && singleCustomerService.partner_name) || '',
    },
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

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  const downloadPdf = async (filename) => {
    console.log('FILE NAME ', filename)
    fetch(`${baseAPIPDF}/download/${filename}`, {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    }).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob)
        // Setting various property values
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.download = filename
        alink.click()
      })
    })
  }

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={4}>
            <h6>Name:</h6>
            <h3>{singleCustomerService && singleCustomerService.name}</h3>
          </Col>
          <Col md={4}>
            <h6>Service Name:</h6>
            <h3>{singleCustomerService && singleCustomerService.title}</h3>
          </Col>
          <Col md={4}>
            <h6>Service Fee:</h6>
            <h3>{singleCustomerService && singleCustomerService.service_fee}</h3>
          </Col>
          <Col md={4}>
            <h6>State:</h6>
            <h3>{singleCustomerService && singleCustomerService.state}</h3>
          </Col>
          <Col md={4}>
            <h6>Status:</h6>
            <h3>{singleCustomerService && singleCustomerService.status}</h3>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label> Partner</Form.Label>
              <Form.Select
                id="partner_name"
                type="text"
                name="partner_name"
                onChange={formik.handleChange}
                value={formik.values.partner_name}
              >
                <option>Select Partner</option>
                {partners &&
                  partners.map((partner, index) => {
                    const { id, name } = partner
                    return (
                      <option value={name} key={index}>
                        {name}
                      </option>
                    )
                  })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <div className="d-flex justify-content-end align-items-center">
              <Button
                className="mx-2 my-2 px-5 float-end btn-block"
                variant="success"
                type="submit"
              >
                Assign Partner
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => downloadPdf(singleCustomerService.doc_pdf)}>
              Download Documents
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h6>Documents:</h6>
            {docs &&
              docs.map((d, index) => {
                return (
                  <Image src={toLocalImageUrl(d)} height="200" width="200" key={index} id={d} />
                )
              })}
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ServicebookingPageModal
