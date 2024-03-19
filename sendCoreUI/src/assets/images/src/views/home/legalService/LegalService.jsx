import Swal from 'sweetalert2'
import { CgTrash } from 'react-icons/cg'
import { AiOutlineEdit } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import LegalServiceModal from './LegalServiceModal'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from 'src/components/ImagePreview'
import withReactContent from 'sweetalert2-react-content'
import { Container, Row, Button, Col, Table, Card } from 'react-bootstrap'
import {
  deleteLegalService,
  fetchLegalService,
  getByIdLegalService,
} from 'src/slices/legalServiceSlice'

const LegalService = () => {
  const { legalServices, legalService } = useSelector((state) => state.legalService)
  const dispatch = useDispatch()
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
    dispatch(fetchLegalService())
    if (legalService) {
      setModalData(legalService)
    }
  }, [dispatch, legalService])

  const onEdit = async (id) => {
    await dispatch(getByIdLegalService(id))
    setShow(!show)
  }

  const confirmDelete = withReactContent(Swal)
  const onDelete = (id) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Legal Service?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `Legal Service has been deleted.`, 'success')
          dispatch(deleteLegalService(id))
        }
      })
  }

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Legal Services</h3>
        </Row>
        <Row>
          <Card className="p-2 mb-5">
            <Card.Header className="">
              <Button variant="success" onClick={onShowModal}>
                {' '}
                Add New
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {legalServices.map((legalService, index) => {
                        const { id, image, title } = legalService
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="symbol symbol-50px">
                                {image ? (
                                  <ImagePreview src={image} alt="image" />
                                ) : (
                                  <small>No Image</small>
                                )}
                              </div>
                            </td>
                            <td>{title}</td>
                            <td>
                              {' '}
                              <Button variant="outline-primary" onClick={() => onEdit(id)}>
                                {' '}
                                <AiOutlineEdit />{' '}
                              </Button>{' '}
                              <Button variant="outline-danger" onClick={() => onDelete(id)}>
                                {' '}
                                <CgTrash />{' '}
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Legal Service' : 'Update Legal Service'}
        show={show}
        onHide={handleClose}
      >
        <LegalServiceModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default LegalService
