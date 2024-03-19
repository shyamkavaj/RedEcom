import { AiOutlineEdit } from 'react-icons/ai'
import AchivementModel from './AchivementModel'
import React, { useEffect, useState } from 'react'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAchivementById, getAll } from 'src/slices/achivementSlice'
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap'

const Achivement = () => {
  const { achivements, achivement } = useSelector((state) => state.achivement)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAll())
    if (achivement) {
      setModalData(achivement)
    }
  }, [dispatch, achivement])

  const onShowModal = () => {
    setModalData(undefined)
    setShow(!show)
  }
  const handleClose = () => {
    setModalData(undefined)
    setShow(false)
  }
  const onEdit = async (id) => {
    await dispatch(getAchivementById(id))
    setShow(!show)
  }

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Achivements</h3>
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
                        <th>Achivement Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {achivements.map((achivement, index) => {
                        const { id, sub_title, achviment_number } = achivement
                        return (
                          <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{sub_title}</td>
                            <td>{achviment_number}</td>
                            <td>
                              <Button variant="outline-primary" onClick={() => onEdit(id)}>
                                <AiOutlineEdit />
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
        title={!modalData ? 'Add Achivement' : 'Update Achivement'}
        show={show}
        onHide={handleClose}
      >
        <AchivementModel modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default Achivement
