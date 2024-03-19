import moment from 'moment'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import ManageUserModel from './ManageUserModel'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import withReactContent from 'sweetalert2-react-content'
import {
  deleteUser,
  fetchAllUsers,
  getUserById,
  updateUserStatus,
} from 'src/slices/manageUsersSlice'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import DataTableUI from 'src/components/Table/DataTableUI'

const confirmDelete = withReactContent(Swal)
const confirmEdit = withReactContent(Swal)

const ManageUsers = () => {
  const dispatch = useDispatch()

  const { users, user } = useSelector((state) => state.manageUsers)

  const customer = users?.filter((user) => user.role === 'Customer')

  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({})

  const onShowModal = () => {
    setModalData(undefined)
    setShow(!show)
  }

  const handleClose = () => {
    setModalData(undefined)
    setShow(false)
  }
  const onUpdate = async (id) => {
    await dispatch(getUserById(id))
    // await dispatch(getPartnerById(id))
    setShow(!show)
  }

  const onEdit = (data) => {
    confirmEdit
      .fire({
        title: `Are you sure you want to update Status?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          confirmEdit.fire('Updated!', `Status has been updated.`, 'success')
          const obj = {
            ...data,
            status: !data.status,
          }
          await dispatch(updateUserStatus(obj))
        }
      })
  }

  const onDelete = (data) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete User ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUser(data.id))
          confirmDelete.fire('Deleted!', `User has been deleted.`, 'success')
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'name', title: 'Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'DOB', title: 'DOB', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'email', title: 'Email', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'mobile_number',
      title: 'Mobile Number',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'status', title: 'Status', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 125 } },
      width: 125,
    },
  ]
  const tableData = customer.map((user, index) => {
    const { id, name, email, mobile_number, status, dob, createdAt } = user
    const DOB = moment(dob).format('DD-MM-YYYY')
    return {
      id,
      name: name,
      email: email,
      mobile_number: mobile_number,
      status: status,
      DOB: DOB,
      // role,
      created: moment(createdAt).format('DD-MM-YYYY'),
      index: index + 1,
    }
  })
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchAllUsers())
    if (user) {
      setModalData(user)
    }
  }, [dispatch, user])
  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Users List</h3>
        </Row>
        <Row>
          <Col>
            <Card className="p-2 mb-5">
              <Card.Header className="">
                <Button variant="success" onClick={onShowModal}>
                  Add New
                </Button>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <DataTableUI
                      tableHeaders={tableHeaders}
                      tableData={tableData}
                      updateRecord={onUpdate}
                      handleVisibility={onEdit}
                      deleteRecord={onDelete}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add User' : 'Assign Partner'}
        show={show}
        onHide={handleClose}
      >
        <ManageUserModel modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default ManageUsers
