import moment from 'moment'
import React, { useEffect } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import DataTable from 'src/components/Table/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServiceReport } from 'src/slices/serviceBookingReportsSlice'

const ServiceBookingReports = ({ formData }) => {
  const { bookings } = useSelector((state) => state.serviceBooking)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchServiceReport())
  }, [dispatch])

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Service Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'name', title: 'User Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'service_fee',
      title: 'Service Fees',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'created', title: 'Date', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'payment_status',
      title: 'Payment Status',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData = bookings.map((booking, index) => {
    const created = moment(booking.createdAt).format('DD-MM-YYYY')
    return {
      id: booking.id,
      index: index + 1,
      title: booking.title,
      name: booking.name,
      service_fee: booking.service_fee,
      created: created,
      payment_status: booking.payment_status,
    }
  })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Service Booking Report</h3>
        </Row>
        <Row>
          {/* <Card className="my-3">
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Label>
                      <h6>Date From</h6>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.start_date}
                      id="start_date"
                      name="start_date"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>
                      <h6>Date To</h6>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.end_date}
                      id="end_date"
                      name="end_date"
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Label>
                      <h6>Users</h6>
                    </Form.Label>
                    <Form.Select
                      name="service_id"
                      value={formik.values.service_id}
                      onChange={formik.handleChange}
                    >
                      <option disabled>Select User</option>
                      {customer.map((c, index) => {
                        const { id, name } = c
                        return (
                          <option value={id} key={index}>
                            {name}
                          </option>
                        )
                      })}
                    </Form.Select>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card> */}
          <Card className="my-3">
            <Card.Body>
              <DataTable
                tableData={tableData}
                tableHeaders={tableHeaders}
                filename="ServiceBookingReport"
              />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default ServiceBookingReports
