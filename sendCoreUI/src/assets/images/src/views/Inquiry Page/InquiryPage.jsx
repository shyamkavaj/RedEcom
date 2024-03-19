import React, { useState } from 'react'
import { useEffect } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { contactById, fetchAllInquiry } from 'src/slices/inquirySlice'
import BaseModal from 'src/components/modal/BaseModal'
import InquiryPageModal from './InquiryPageModal'
import DataTableUI from 'src/components/Table/DataTableUI'
import { DataType } from 'ka-table'
import moment from 'moment'
const InquiryPage = () => {
  const dispatch = useDispatch()
  const { inquirys, inquiry } = useSelector((state) => state.inquiry)

  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState()

  const handleClose = () => {
    // setModalData(undefined)
    setShow(false)
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'name', title: 'Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'email', title: 'Email', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'state', title: 'State', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'massage', title: 'Message', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'sc_title', title: 'Service', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 100,
    },
  ]

  const tableData = inquirys.map((inquiry, index) => {
    const { id, name, email, mobile_number, sc_title, massage, state, createdAt } = inquiry
    return {
      id,
      index: index + 1,
      name: name,
      email: email,
      state: state,
      mobile_number: mobile_number,
      massage: massage,
      sc_title: sc_title,
      created: moment(createdAt).format('DD-MM-YYYY'),
    }
  })
  const onUpdate = async (id) => {
    await dispatch(contactById(id))
    setShow(!show)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllInquiry())
    if (inquiry) {
      setModalData(inquiry)
    }
  }, [dispatch, inquiry])

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Contact Inquiry List</h3>
        </Row>
        <Row>
          <Col>
            <Card className="p-2 mb-5">
              <Card.Body>
                <Row>
                  <Col>
                    <DataTableUI
                      tableHeaders={tableHeaders}
                      tableData={tableData}
                      updateRecord={onUpdate}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BaseModal title="Contact Inquiry" show={show} onHide={handleClose}>
        <InquiryPageModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default InquiryPage
