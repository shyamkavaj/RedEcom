import React, { useEffect } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import DataTable from 'src/components/Table/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubAdmin } from 'src/slices/subAdminSlice'
import { DataType, SortDirection } from 'ka-table/enums'
import moment from 'moment'

const SubAdminReports = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.manageUsers)
  const subAdmin = users.filter((user) => user.role === 'Sub Admin')

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchSubAdmin())
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
      key: 'email',
      title: 'Email',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    {
      key: 'createdAt',
      title: 'Created At',
      sortDirection: SortDirection.Descend,
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData = subAdmin.map((s, index) => {
    const { id, name, email, mobile_number, createdAt } = s
    return {
      id: id,
      index: index + 1,
      name: name,
      email: email,
      mobile_number: mobile_number,
      createdAt: moment(createdAt).format('DD-MM-YYYY'),
    }
  })

  return (
    <Container>
      <Row>
        <h3 className="maintitle">Sub Admin Reports</h3>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <DataTable tableData={tableData} tableHeaders={tableHeaders} fName="SubAdminReport" />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default SubAdminReports
