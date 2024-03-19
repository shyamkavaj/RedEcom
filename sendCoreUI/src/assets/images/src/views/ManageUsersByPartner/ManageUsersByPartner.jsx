import { Card, Col, Container, Row } from 'react-bootstrap'
import DataTableUI from 'src/components/Table/DataTableUI'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersByPartner } from 'src/slices/partnersSlice'

const ManageUsersByPartner = () => {
  const { partnerUsers } = useSelector((state) => state.partner)
  const dispatch = useDispatch()

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'name', title: 'Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'email', title: 'Email', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'created', title: 'CreatedAt', colGroup: { style: { minWidth: 100 } }, width: 200 },
  ]
  const tableData = partnerUsers.map((user, index) => {
    const { id, name, email, mobile_number, dob, role, createdAt } = user
    const created = moment(createdAt).format('DD-MM-YYYY')
    return {
      id,
      name: name,
      email: email,
      mobile_number: mobile_number,
      created: created,
      index: index + 1,
    }
  })
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchUsersByPartner())
  }, [dispatch])
  return (
    <Container>
      <Row>
        <h3 className="maintitle">Users List</h3>
      </Row>
      <Row>
        <Col>
          <Card>
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

export default ManageUsersByPartner
