import React, { useEffect } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'src/components/Table/DataTable'
import { fetchAllUsers } from 'src/slices/manageUsersSlice'
import { DataType, SortDirection } from 'ka-table/enums'
import moment from 'moment'
const UsersReports = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.manageUsers)
  const customer = users.filter((u) => u.role === 'Customer')

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllUsers())
  }, [dispatch])

  const tableHeaders = [
    {
      key: 'index',
      title: 'Sr No',
      sortDirection: SortDirection.Ascend,
      colGroup: { style: { minWidth: 80 } },
      width: 80,
    },
    {
      key: 'name',
      title: 'Name',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'dob',
      title: 'DOB',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'email',
      title: 'Email',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'created',
      title: 'Created At',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData = customer.map((user, index) => {
    return {
      id: user.id,
      index: index + 1,
      name: user.name,
      dob: user.dob,
      email: user.email,
      mobile_number: user.mobile_number,
      created: moment(user.createdAt).format('DD-MM-YYYY'),
    }
  })

  return (
    <React.Fragment>
      <Container>
        <Row>
          <h3 className="maintitle">User Report</h3>
        </Row>
        <Row>
          <Card className="my-3">
            <Card.Body>
              <DataTable tableData={tableData} tableHeaders={tableHeaders} filename="UserReport" />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default UsersReports
