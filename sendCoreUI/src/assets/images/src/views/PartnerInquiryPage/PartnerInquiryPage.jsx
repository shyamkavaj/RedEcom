import React from 'react'
import { useEffect } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPartnerInquiry } from 'src/slices/partnerInquirySlice'
import DataTableUI from 'src/components/Table/DataTableUI'
import { DataType } from 'ka-table'
import moment from 'moment'
const PartnerInquiryPage = () => {
  const dispatch = useDispatch()
  const { partnerInquirys } = useSelector((state) => state.partnerInquiry)

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
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'city', title: 'City', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'mo_name', title: 'Occupation', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'massage', title: 'Message', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'sc_title', title: 'Service', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    // { key: ':actions', title: 'Actions', style: { textAlign: 'end' } },
  ]

  const tableData = partnerInquirys.map((partnerInquiry, index) => {
    const { id, name, email, mobile_number, state, city, mo_name, sc_title, massage, createdAt } =
      partnerInquiry
    return {
      id,
      index: index + 1,
      name: name,
      email: email,
      mobile_number: mobile_number,
      state: state,
      city: city,
      mo_name: mo_name,
      massage: massage,
      sc_title: sc_title,
      created: moment(createdAt).format('DD-MM-YYYY'),
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchPartnerInquiry())
  }, [dispatch])

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Partner Inquiry List</h3>
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
    </>
  )
}

export default PartnerInquiryPage
