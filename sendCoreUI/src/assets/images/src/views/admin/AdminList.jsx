import React, { useState, useEffect } from 'react'
import AdminModal from './AdminModal'
import { AiOutlineEye } from 'react-icons/ai'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAdmin, getById } from 'src/slices/adminSlice'
import { Button, Col, Card, Container, Row, Table } from 'react-bootstrap'
import moment from 'moment'
import AdminViewModal from './AdminViewModal'
const AdminList = () => {
  const { admins, admin } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [modalData, setModalData] = useState()

  const handleClose = () => {
    setModalData(undefined)
    setShow(false)
  }

  const handleClose1 = () => {
    setModalData(undefined)
    setShow1(false)
  }

  const onView = async (id) => {
    await dispatch(getById(id))
    setShow1(!show1)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllAdmin())
    if (admin) {
      setModalData(admin)
    }
  }, [dispatch, admin])
  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Admin List</h3>
        </Row>
        <Row>
          <Col>
            <Card className="p-2 mb-5">
              {/* <Card.Header className="">
                            <Button variant="success" onClick={onShowModal}>
                                Add New
                            </Button>
                        </Card.Header> */}
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Name</th>
                      <th>Email</th>
                      {/* <th>Role</th> */}
                      <th>Mobile Number</th>
                      {/* <th>Status</th> */}
                      <th>createdAt</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin, index) => {
                      const { id, name, email, mobile_number, createdAt } = admin
                      const created = moment(createdAt).format('DD-MM-YYYY')
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td>{email}</td>
                          {/* <td>{role}</td> */}
                          <td>{mobile_number}</td>
                          {/* <td>  {status === true ? (
                                                    <Badge bg="success" pill>
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="danger" pill>
                                                        Inactive
                                                    </Badge>
                                                )}
                                                </td> */}
                          <td>{created}</td>
                          <td>
                            <Button
                              variant="outline-warning"
                              onClick={() => {
                                onView(id)
                              }}
                            >
                              <AiOutlineEye />
                            </Button>{' '}
                            {/* <Button variant="outline-primary" onClick={() =>

                                                        onEdit(id)
                                                    }>
                                                        <AiOutlineEdit />
                                                    </Button> */}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BaseModal title={!modalData ? 'Add Admin' : 'Update Admin'} show={show} onHide={handleClose}>
        <AdminModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
      <BaseModal title={!modalData ? 'Add Admin' : 'View Admin'} show={show1} onHide={handleClose1}>
        <AdminViewModal modalData={modalData} />
      </BaseModal>
    </>
  )
}

export default AdminList
