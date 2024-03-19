import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import DataTableUI from 'src/components/Table/DataTableUI'
import { fetchAllUsers } from 'src/slices/manageUsersSlice'
import { fetchServiceReport } from 'src/slices/serviceBookingReportsSlice'
import PartnerServiceBookingModel from './PartnerServiceBookingModel'

const PartnerServiceBooking = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [id, setId] = useState(undefined)

  const partnerEmail = localStorage.getItem('email')

  const { bookings } = useSelector((state) => state.serviceBooking)

  const { users } = useSelector((state) => state.manageUsers)

  const findPartner = users.find((u) => u.email === partnerEmail)

  const payment = bookings.filter((book) => book.payment_status === 'succeeded')

  const getPaymentSuccessOfPartner = payment.filter((p) => p.partner_name === findPartner.name)

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'name', title: 'User Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'title', title: 'Service Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
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
    {
      key: ':actions',
      title: 'Assign Partner',
      style: { textAlign: 'end' },
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData =
    getPaymentSuccessOfPartner &&
    getPaymentSuccessOfPartner.map((booking, index) => {
      const created = moment(booking.createdAt).format('DD-MM-YYYY')
      return {
        id: booking.id,
        index: index + 1,
        name: booking.name,
        state: booking.state,
        title: booking.title,
        service_fee: booking.service_fee,
        created: created,
        payment_status: booking.payment_status,
        partner_name: booking.partner_name,
      }
    })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchServiceReport())
    dispatch(fetchAllUsers())
  }, [dispatch])

  const handleClose = () => {
    setId(undefined)
    setShow(false)
  }

  const onUpdate = async (id) => {
    setId(id)
    setShow(!show)
  }

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
        <PartnerServiceBookingModel id={id} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default PartnerServiceBooking
