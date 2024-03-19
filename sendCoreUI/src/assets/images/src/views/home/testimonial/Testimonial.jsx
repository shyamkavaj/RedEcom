import Swal from 'sweetalert2'
import { CgTrash } from 'react-icons/cg'
import { AiOutlineEdit } from 'react-icons/ai'
import TestimonialModal from './TestimonialModal'
import React, { useEffect, useState } from 'react'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from 'src/components/ImagePreview'
import withReactContent from 'sweetalert2-react-content'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import {
  deleteTestimonial,
  fetchTestimonial,
  getTestimonialById,
} from 'src/slices/testimonialSlice'

const Testimonial = () => {
  const { testimonials, testimonial } = useSelector((state) => state.testimonials)
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
    dispatch(fetchTestimonial())
    if (testimonial) {
      setModalData(testimonial)
    }
  }, [dispatch, testimonial])

  const onEdit = async (id) => {
    await dispatch(getTestimonialById(id))
    setShow(!show)
  }
  const confirmDelete = withReactContent(Swal)
  const onDelete = (id) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Testimonial?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `Testimonial has been deleted.`, 'success')
          dispatch(deleteTestimonial(id))
        }
      })
  }
  return (
    <>
      <Container>
        <h3 className="maintitle">Testimonial</h3>
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
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((testimonial, index) => {
                        const { id, name, description, image, designation } = testimonial
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{designation}</td>
                            <td>
                              <div className="symbol symbol-50px">
                                {image ? (
                                  <ImagePreview src={image} alt="image" />
                                ) : (
                                  <small>No Image</small>
                                )}
                              </div>
                            </td>
                            <td>{description}</td>
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
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <BaseModal
          title={!modalData ? 'Add Testimonial' : 'Update Testimonial'}
          show={show}
          onHide={handleClose}
        >
          <TestimonialModal modalData={modalData} onHide={handleClose} />
        </BaseModal>
      </Container>
    </>
  )
}

export default Testimonial
