import React, { useEffect } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'src/components/Table/DataTable'
import { getAllPlanBookings } from 'src/slices/planBookingSlice'
import { DataType } from 'ka-table'
import moment from 'moment'
const CustomerPlanBookingReport = () => {
  const dispatch = useDispatch()
  const { planBookingList } = useSelector((state) => state.planBooking)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllPlanBookings())
  }, [dispatch])

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Plan Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'name', title: 'User Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'plan_fee', title: 'Plan Fees', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Date', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'payment_status',
      title: 'Payment Status',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData = planBookingList
    ?.filter((p) => p.payment_status === 'succeeded')
    .map((booking, index) => {
      return {
        id: booking.id,
        index: index + 1,
        title: booking.title,
        name: booking.name,
        mobile_number: booking.mobile_number,
        state: booking.state,
        plan_fee: booking.plan_fee,
        created: moment(booking.createdAt).format('DD-MM-YYYY'),
        payment_status: booking.payment_status,
      }
    })
    .sort((c) => c.createdAt)
  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Plan Booking Report</h3>
        </Row>
        <Row>
          <Card className="my-3">
            <Card.Body>
              <DataTable
                tableData={tableData}
                tableHeaders={tableHeaders}
                filename="PlanBookingReport"
              />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default CustomerPlanBookingReport
