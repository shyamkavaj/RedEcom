import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllIntrestedList } from 'src/slices/intrestedListSlice'
import { Card, Col, Container, Row } from 'react-bootstrap'
import DataTableUI from 'src/components/Table/DataTableUI'
import { DataType } from 'ka-table'
import moment from 'moment'

const IntrestedList = () => {
  const dispatch = useDispatch()
  const { intrested } = useSelector((state) => state.intrested)

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'user_name', title: 'Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'user_mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'master_event_title',
      title: 'Event Title',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'start', title: 'Start Date', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
  ]
  const tableData = intrested.map((intrest, index) => {
    const {
      id,
      user_name,
      user_mobile_number,
      master_event_start_date,
      master_event_title,
      createdAt,
    } = intrest
    return {
      id,
      index: index + 1,
      user_name: user_name,
      user_mobile_number: user_mobile_number,
      master_event_title: master_event_title,
      start: moment(master_event_start_date).format('DD-MM-YYYY'),
      created: moment(createdAt).format('DD-MM-YYYY'),
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllIntrestedList())
  }, [dispatch])
  return (
    <Container>
      <Row>
        <h3 className="maintitle">Event Intrested List</h3>
      </Row>
      <Row>
        <Col>
          <Card className="p-2 mb-5">
            <Card.Body>
              <Row>
                <Col>
                  <DataTableUI tableHeaders={tableHeaders} tableData={tableData} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IntrestedList
