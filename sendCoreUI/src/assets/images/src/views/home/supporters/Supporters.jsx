import Swal from 'sweetalert2'
import SupportersModal from './SupportersModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import BaseModal from 'src/components/modal/BaseModal'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { deleteSupporters, getAllSupporters, getSupporterById } from 'src/slices/supportersSlice'
import DataTableUI from 'src/components/Table/DataTableUI'

const Supporters = () => {
  const dispatch = useDispatch()
  const { supporters, supporter } = useSelector((state) => state.supporters)

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

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllSupporters())
    if (supporter) {
      setModalData(supporter)
    }
  }, [dispatch, supporter])

  const onEdit = async (id) => {
    await dispatch(getSupporterById(id))
    setShow(!show)
  }
  const confirmDelete = withReactContent(Swal)
  const onDelete = (obj) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Suppoter?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `Suppoter has been deleted.`, 'success')
          dispatch(deleteSupporters(obj.id))
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'suppoter_name', title: 'Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'image', title: 'Image', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'suppoter', title: 'Suppoter', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 150,
    },
  ]

  const tableData = supporters.map((supporter, index) => {
    const { id, suppoter_name, image, suppoter } = supporter
    return {
      id,
      index: index + 1,
      suppoter_name: suppoter_name,
      image: image,
      suppoter: suppoter,
    }
  })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Supporters</h3>
        </Row>
        <Row>
          {' '}
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
                  />
                  {/* <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Suppoter</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supporters &&
                        supporters.map((supporter, index) => {
                          const { id, suppoter_name, status, image } = supporter
                          return (
                            <tr key={index}>
                              <td>{suppoter_name}</td>
                              <td>
                                <div className="symbol symbol-50px">
                                  {image ? (
                                    <ImagePreview src={image} alt="image" />
                                  ) : (
                                    <small>No Image</small>
                                  )}
                                </div>
                              </td>
                              <td>{status}</td>
                              <td>
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
        title={!modalData ? 'Add Supporter' : 'Update Supporter'}
        show={show}
        onHide={handleClose}
      >
        <SupportersModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default Supporters
