import Swal from 'sweetalert2'
import PlanModal from './PlanModal'
import { CgTrash } from 'react-icons/cg'
import { AiOutlineEdit } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { getAllPlans, getPlanById, removePlan } from 'src/slices/planSlice'

const Plan = () => {
  const dispatch = useDispatch()
  const { plans, plan } = useSelector((state) => state.plan)
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
    dispatch(getAllPlans())
    if (plan) {
      setModalData(plan)
    }
  }, [dispatch, plan])

  const onEdit = async (id) => {
    await dispatch(getPlanById(id))
    setShow(!show)
  }

  const confirmDelete = withReactContent(Swal)
  const onDelete = (id) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Plan?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `Plan has been deleted.`, 'success')
          dispatch(removePlan(id))
        }
      })
  }

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Plans</h3>
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
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Plan-Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan, index) => {
                        const { id, plan_type, title, price } = plan
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{title}</td>
                            <td>{price}</td>
                            <td>{plan_type}</td>
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
      </Container>
      <BaseModal title={!modalData ? 'Add Plan' : 'Update Plan'} show={show} onHide={handleClose}>
        <PlanModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default Plan
