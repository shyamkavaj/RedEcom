import { useFormik } from 'formik'
import React from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import DataTable from 'src/components/Table/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomer, fetchServiceReport } from 'src/slices/serviceBookingReportsSlice'
import { useEffect } from 'react'
import { fetchAllUsers } from 'src/slices/manageUsersSlice'
import { DataType } from 'ka-table'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const CustomerBookingReports = () => {
  const dispatch = useDispatch()

  const { bookings } = useSelector((state) => state.serviceBooking)

  const payment = bookings.filter((book) => book.payment_status === 'succeeded')

  const formik = useFormik({
    initialValues: {
      user_id: '',
      start_date: '',
      end_date: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      resetForm({})
      setSubmitting(false)
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchServiceReport())
  }, [dispatch])

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Service Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'name', title: 'User Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
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
    { key: 'partner_name', title: 'Partner', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'documents', title: 'Documents', colGroup: { style: { minWidth: 100 } }, width: 200 },
  ]

  const tableData = payment.map((booking, index) => {
    return {
      id: booking.id,
      index: index + 1,
      title: booking.title,
      name: booking.name,
      state: booking.state,
      mobile_number: booking.mobile_number,
      service_fee: booking.service_fee,
      created: moment(booking.createdAt).format('DD-MM-YYYY'),
      payment_status: booking.payment_status,
      partner_name: booking.partner_name,
      documents: booking.documents,
    }
  })

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCustomer(formik.values.service_id))
  }, [dispatch, formik.values.service_id])

  return (
    <Container>
      <Row>
        <h3 className="maintitle">Customer Service Booking Report</h3>
      </Row>
      <Row>
        <Card className="my-3">
          <Card.Body>
            <DataTable
              tableData={tableData}
              tableHeaders={tableHeaders}
              filename="CustomerServiceBookingReport"
            />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default CustomerBookingReports
