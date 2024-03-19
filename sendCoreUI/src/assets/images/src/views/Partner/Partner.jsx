import Swal from 'sweetalert2'
import PartnerModal from './PartnerModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import withReactContent from 'sweetalert2-react-content'
import DataTableUI from 'src/components/Table/DataTableUI'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { getUserById, updateUserStatus } from 'src/slices/manageUsersSlice'
import PartnerViewModal from './PartnerViewModal'
import { fetchPartners } from 'src/slices/partnersSlice'
import moment from 'moment'

const confirmEdit = withReactContent(Swal)

const Partner = () => {
  const { partners, partner } = useSelector((state) => state.partner)

  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [modalData, setModalData] = useState()

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
  // STATUS ACTIVE-INACTIVE

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
          dispatch(fetchPartners())
        }
      })
  }
  const onView = async (data) => {
    await dispatch(getUserById(data.id))
    setShow1(!show1)
    setModalData(data)
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 100 } }, width: 200 },
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
  const tableData = partners?.map((p, index) => {
    const { id, name, email, mobile_number, status, createdAt, service_id } = p
    return {
      index: index + 1,
      id: id,
      name: name,
      service_id: service_id,
      email: email,
      mobile_number: mobile_number,
      status: status,
      created: moment(createdAt).format('DD-MM-YYYY'),
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchPartners())
    if (partner) {
      setModalData(partner)
    }
  }, [dispatch, partner])

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Partners</h3>
        </Row>
        <Row>
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
                    handleVisibility={onEdit}
                    handleView={onView}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Partner' : 'Update Partner'}
        show={show}
        onHide={handleClose}
      >
        <PartnerModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
      <BaseModal title="View Partner" show={show1} onHide={handleClose1}>
        <PartnerViewModal modalData={modalData} />
      </BaseModal>
    </>
  )
}

export default Partner
