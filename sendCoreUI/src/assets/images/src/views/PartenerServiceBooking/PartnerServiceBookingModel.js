import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import baseAPIPDF from 'src/api/baseApiPdf'
import ImagePreview from 'src/components/ImagePreview'
import { getDownloadedPdf } from 'src/slices/downloadPdfSlice'

const PartnerServiceBookingModel = ({ id, onHide }) => {
  const { bookings } = useSelector((state) => state.serviceBooking)
  const { users } = useSelector((state) => state.manageUsers)
  const user = localStorage.getItem('token')
  const singleCustomerService = bookings.find((b) => b.id == id)

  const documents = singleCustomerService && singleCustomerService.documents

  let docs = documents != null ? JSON.parse(documents) : []

  const downloadPdf = (filename) => {
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
      <Form>
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
          {/* <Col md={4}>
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
          </Col> */}
        </Row>
        <Row className="my-2">
          <Col>
            {/* <div className="d-flex justify-content-end align-items-center">
              <Button
                className="mx-2 my-2 px-5 float-end btn-block"
                variant="success"
                type="submit"
              >
                Assign Partner
              </Button>
            </div> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={() => downloadPdf(singleCustomerService?.doc_pdf)}>
              Download Documents
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h6>Documents:</h6>
            {docs &&
              docs.map((d) => {
                return <ImagePreview src={d} height="200" width="200" />
              })}
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default PartnerServiceBookingModel
