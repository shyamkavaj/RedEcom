import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import DataTableUI from 'src/components/Table/DataTableUI'
import { fetchAllUsers, getUserById, updateUserStatus } from 'src/slices/manageUsersSlice'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import SubAdminModal from './SubAdminModal'
import SubAdminViewModal from './SubAdminViewModal'
import { DataType } from 'ka-table'
import { fetchSubAdmin } from 'src/slices/subAdminSlice'
import moment from 'moment'

const confirmEdit = withReactContent(Swal)
const SubAdmin = () => {
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [modalData, setModalData] = useState(false)

  const { subAdmins, subAdmin } = useSelector((state) => state.subAdmin)
  const dispatch = useDispatch()

  const onShowModal = () => {
    setModalData(undefined)
    setShow(!show)
  }
  const handleClose = () => {
    setModalData(undefined)
    setShow(false)
  }
  const handleClose1 = () => {
    setModalData(undefined)
    setShow1(false)
  }
  const onView = async (data) => {
    await dispatch(getUserById(data.id))
    setShow1(!show1)
    setModalData(data)
  }

  // STATUS ACTIVE-INACTIVE
  const onUpdate = (data) => {
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
          dispatch(fetchSubAdmin())
        }
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchSubAdmin())
    if (subAdmin) {
      setModalData(subAdmin)
    }
  }, [dispatch, subAdmin])

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
    { key: 'status', title: 'Status', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 100,
    },
  ]
  const tableData =
    subAdmins &&
    subAdmins.map((s, index) => {
      const { id, name, email, mobile_number, status, createdAt } = s
      return {
        index: index + 1,
        id,
        name: name,
        email: email,
        mobile_number: mobile_number,
        status: status,
        created: moment(createdAt).format('DD-MM-YYYY'),
      }
    })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Sub Admin List</h3>
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
                      handleVisibility={onUpdate}
                      handleView={onView}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Sub Admin' : 'Update Sub Admin'}
        show={show}
        onHide={handleClose}
      >
        <SubAdminModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
      <BaseModal title="View Partner" show={show1} onHide={handleClose1}>
        <SubAdminViewModal modalData={modalData} />
      </BaseModal>
    </>
  )
}
export default SubAdmin
