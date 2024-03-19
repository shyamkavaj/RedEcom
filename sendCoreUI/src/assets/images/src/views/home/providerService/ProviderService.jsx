import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import withReactContent from 'sweetalert2-react-content'
import ProviderServiceModal from './ProviderServiceModal'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import {
  deleteProviderService,
  fetchProviderService,
  getProviderServiceById,
  updateProviderService,
} from 'src/slices/providerServiceSlice'
import DataTableUI from 'src/components/Table/DataTableUI'
import moment from 'moment'

const confirmDelete = withReactContent(Swal)
const confirmEdit = withReactContent(Swal)

const ProviderService = () => {
  const dispatch = useDispatch()

  const { providerServices, providerService } = useSelector((state) => state.providerService)

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

  const onEdit = async (id) => {
    await dispatch(getProviderServiceById(id))
    setShow(!show)
  }

  const onDelete = (obj) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Service?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProviderService(obj.id))
          confirmDelete.fire('Deleted!', `Service has been deleted.`, 'success')
        }
      })
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
      .then((result) => {
        if (result.isConfirmed) {
          confirmEdit.fire('Updated!', `Status has been updated.`, 'success')
          const obj = {
            ...data,
            s_id: data.id,
            top_service: !data.top_service,
          }
          dispatch(updateProviderService(obj))
        }
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProviderService())
    if (providerService) {
      setModalData(providerService)
    }
  }, [dispatch, providerService])

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
    { key: 'createdAt', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 120,
    },
  ]

  const tableData =
    providerServices &&
    providerServices.map((providerService, index) => {
      // const { id, title, price, top_service, createdAt } = providerService
      return {
        id: providerService.id,
        index: index + 1,
        title: providerService.title,
        price: providerService.price,
        top_service: providerService.top_service,
        createdAt: moment(providerService.createdAt).format('DD-MM-YYYY'),
        category_id: providerService.category_id,
        sub_category_id: providerService.sub_category_id,
        sub_sub_category_id: providerService.sub_sub_category_id,
      }
    })

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
                    deleteRecord={onDelete}
                    updateRecord={onEdit}
                    handleVisibility={onUpdate}
                  />
                  {/* <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Price</th>

                        <th>Top Service</th>
                        <th>createdAt</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providerServices.map((providerService, index) => {
                        const { id, title, price, top_service, createdAt, status } = providerService
                        const created = moment(createdAt).format('DD-MM-YYYY')
                        return (
                          <tr key={index}>
                            <td>{title}</td>
                            <td>₹ {price}/-</td>
                            <td>
                              {' '}
                              {top_service === true ? (
                                <Badge bg="success" pill>
                                  Yes
                                </Badge>
                              ) : (
                                <Badge bg="danger" pill>
                                  No
                                </Badge>
                              )}
                            </td>
                            <td>{created}</td>
                            <td>
                              {top_service === true ? (
                                <Button
                                  variant="outline-success"
                                  onClick={() => onUpdate(providerService)}
                                >
                                  <BsToggleOn />
                                </Button>
                              ) : (
                                <Button
                                  variant="outline-danger"
                                  onClick={() => onUpdate(providerService)}
                                >
                                  <BsToggleOff />
                                </Button>
                              )}{' '}
                              <Button variant="outline-primary" onClick={() => onEdit(id)}>
                                <AiOutlineEdit />
                              </Button>{' '}
                              <Button variant="outline-danger" onClick={() => onDelete(id)}>
                                <CgTrash />
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table> */}
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
        fullscreen={true}
      >
        <ProviderServiceModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default ProviderService
