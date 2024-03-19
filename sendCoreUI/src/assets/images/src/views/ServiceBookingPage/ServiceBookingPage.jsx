import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import DataTableUI from 'src/components/Table/DataTableUI'
import { fetchAllUsers } from 'src/slices/manageUsersSlice'
import { fetchCustomer, fetchServiceReport } from 'src/slices/serviceBookingReportsSlice'
import ServicebookingPageModal from './ServicebookingPageModal'
import moment from 'moment'

const ServiceBookingPage = () => {
  const dispatch = useDispatch()

  const { bookings } = useSelector((state) => state.serviceBooking)

  const paymentSuccessed = bookings?.filter((book) => book.payment_status === 'succeeded')

  const [show, setShow] = useState(false)
  const [id, setId] = useState(undefined)

  const handleClose = () => {
    setId(undefined)
    setShow(false)
  }

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

  const onUpdate = async (id) => {
    setId(id)
    setShow(!show)
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'name', title: 'User Name', colGroup: { style: { minWidth: 100 } }, width: 150 },
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 150 },
    { key: 'title', title: 'Service Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'service_fee',
      title: 'Service Fees',
      colGroup: { style: { minWidth: 100 } },
      width: 150,
    },
    { key: 'created', title: 'Date', colGroup: { style: { minWidth: 100 } }, width: 150 },
    {
      key: 'payment_status',
      title: 'Payment Status',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'partner_name', title: 'Partner', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Assign Partner',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 150 } },
      width: 150,
    },
  ]

  const tableData = paymentSuccessed?.reverse().map((booking, index) => {
    return {
      id: booking.id,
      index: index + 1,
      name: booking.name,
      state: booking.state,
      title: booking.title,
      service_fee: booking.service_fee,
      created: moment(booking.createdAt).format('DD-MM-YYYY'),
      payment_status: booking.payment_status,
      partner_name: booking.partner_name,
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchServiceReport())
    dispatch(fetchAllUsers())
  }, [dispatch, id])

  useEffect(() => {
    dispatch(fetchCustomer(formik.values.service_id))
  }, [dispatch, formik.values.service_id])

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Customer Service Booking</h3>
        </Row>
        <Row>
          <Card className="my-3">
            <Card.Body>
              <DataTableUI
                tableData={tableData}
                tableHeaders={tableHeaders}
                updateRecord={onUpdate}
              />
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <BaseModal title="View Service" show={show} onHide={handleClose}>
        <ServicebookingPageModal id={id} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default ServiceBookingPage
