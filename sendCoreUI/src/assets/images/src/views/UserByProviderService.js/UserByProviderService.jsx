import { useDispatch, useSelector } from 'react-redux'
import { fetchPartnerService } from 'src/slices/partnersSlice'
import React, { useEffect, useState } from 'react'
import BaseModal from 'src/components/modal/BaseModal'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import moment from 'moment'
import DataTableUI from 'src/components/Table/DataTableUI'
import ProviderServiceModal from '../home/providerService/ProviderServiceModal'
import { updateProviderService } from 'src/slices/providerServiceSlice'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const UserByProviderService = () => {
  const { partnerServices } = useSelector((state) => state.partner)
  const disaptch = useDispatch()
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState()

  const onShowModal = () => {
    setModalData(undefined)
    setShow(!show)
  }
  const handleClose = () => {
    setModalData(undefined)
    setShow(false)
  }
  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Title', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'price', title: 'Price', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'top_service',
      title: 'Top Service',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    //{ key: ':actions', title: 'Actions', style: { textAlign: 'end' } },
  ]

  const tableData =
    partnerServices &&
    partnerServices.map((partnerService, index) => {
      const { id, title, price, top_service, createdAt } = partnerService
      const created = moment(createdAt).format('DD-MM-YYYY')
      return {
        id,
        index: index + 1,
        title,
        price,
        top_service,
        created,
      }
    })

  // STATUS ACTIVE-INACTIVE
  const confirmEdit = withReactContent(Swal)

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
      .then((result) => {
        if (result.isConfirmed) {
          confirmEdit.fire('Updated!', `Status has been updated.`, 'success')
          const obj = {
            ...data,
            s_id: data.id,
            top_service: !data.top_service,
          }
          disaptch(updateProviderService(obj))
        }
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    disaptch(fetchPartnerService())
  }, [disaptch])
  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Provider Service</h3>
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
                    // deleteRecord={onDelete}
                    //    updateRecord={onEdit}
                    //handleVisibility={onUpdate}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Provider Service' : 'Update Provider Service'}
        show={show}
        onHide={handleClose}
      >
        <ProviderServiceModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default UserByProviderService
