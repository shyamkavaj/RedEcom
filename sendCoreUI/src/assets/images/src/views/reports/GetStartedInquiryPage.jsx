import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll } from 'src/slices/getStartedInquiryPageSlice'
import { Card, Container, Row } from 'react-bootstrap'
import DataTable from 'src/components/Table/DataTable'
import { DataType } from 'ka-table'
import moment from 'moment'

const GetStartedInquiryPage = () => {
  const dispatch = useDispatch()
  const { starts } = useSelector((state) => state.start)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAll())
  }, [dispatch])

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'email', title: 'Email', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'language', title: 'Language', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'createdAt', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
  ]

  const tableData = starts?.map((start, index) => {
    const { id, email, mobile_number, state, language, createdAt } = start
    return {
      id,
      index: index + 1,
      email: email,
      mobile_number: mobile_number,
      state: state,
      language: language,
      createdAt: moment(createdAt).format('DD-MM-YYYY'),
    }
  })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Get Started Inquiry</h3>
        </Row>
        <Row>
          <Card className="my-3">
            <Card.Body>
              <DataTable
                tableData={tableData}
                tableHeaders={tableHeaders}
                filename="GetStartedInquiryReport"
              />
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default GetStartedInquiryPage
