import Swal from 'sweetalert2'
import FaqModal from './FaqModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import withReactContent from 'sweetalert2-react-content'
import { deleteFaq, getAllFaq, getFaqById } from 'src/slices/faqSlice'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import DataTableUI from 'src/components/Table/DataTableUI'

const Faq = () => {
  const { faqs, faq } = useSelector((state) => state.faqs)
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
    dispatch(getAllFaq())
    if (faq) {
      setModalData(faq)
    }
  }, [dispatch, faq])

  const onEdit = async (id) => {
    await dispatch(getFaqById(id))
    setShow(!show)
  }

  const confirmDelete = withReactContent(Swal)
  const onDelete = ({ id }) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete FAQ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `FAQ has been deleted.`, 'success')
          dispatch(deleteFaq(id))
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'question', title: 'Question', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'answer', title: 'Answer', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end' },
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData = faqs.map((faq, index) => {
    const { id, question, answer } = faq
    return {
      index: index + 1,
      id,
      question,
      answer,
    }
  })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">FAQs</h3>
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
                    // handleVisibility={handleVisibility}
                  />
                  {/* <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Questions</th>
                        <th>Answers</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqs.map((faq, index) => {
                        const { id, question, answer } = faq
                        return (
                          <tr key={index}>
                            <td>{question}</td>
                            <td>{answer}</td>
                            <td>
                              <Button variant="outline-primary" onClick={() => onEdit(id)}>
                                <AiOutlineEdit />
                              </Button>
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
      <BaseModal title={!modalData ? 'Add FAQs' : 'Update FAQs'} show={show} onHide={handleClose}>
        <FaqModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}
export default Faq
