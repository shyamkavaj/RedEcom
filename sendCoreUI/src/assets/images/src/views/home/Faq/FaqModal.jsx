import React from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import ShowError from 'src/errors/ShowError'

import { addFaq, updateFaq } from 'src/slices/faqSlice'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'

const FaqModal = ({ modalData, onHide }) => {
  const { subCategorys } = useSelector((state) => state.subCategorys)

  const dispatch = useDispatch()

  const addData = async (values) => {
    if (!modalData) {
      await dispatch(addFaq(values))
      onHide()
    } else {
      await dispatch(updateFaq(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      question: (modalData && modalData?.question) || '',
      answer: (modalData && modalData?.answer) || '',
      sub_category_id: (modalData && modalData?.sub_category_id) || undefined,
    },
    // validationSchema: faqValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'FAQ has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <>
      <Row>
        <Col md={12}>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Sub Category</Form.Label>
                  <Form.Select
                    name="sub_category_id"
                    onChange={formik.handleChange}
                    value={formik.values.sub_category_id}
                    aria-label="Default select example"
                    // isInvalid={formik.errors.sub_category_id ? true : false}
                    //isValid={formik.dirty && !formik.errors.sub_category_id ? true : false}
                  >
                    <option>Category</option>
                    {subCategorys.map((subCategory) => {
                      const { id, title } = subCategory
                      return (
                        <option value={id} key={id}>
                          {title}
                        </option>
                      )
                    })}
                  </Form.Select>
                  <ShowError>{formik.errors.sub_category_id}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Questions</Form.Label>
                  <Form.Control
                    id="question"
                    type="text"
                    name="question"
                    onChange={formik.handleChange}
                    value={formik.values.question}
                    //isInvalid={formik.errors.question ? true : false}
                    // isValid={formik.dirty && !formik.errors.question ? true : false}
                  />
                  <ShowError>{formik.errors.question}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Answer</Form.Label>
                  <Form.Control
                    id="answer"
                    as="textarea"
                    type="text"
                    name="answer"
                    onChange={formik.handleChange}
                    value={formik.values.answer}
                    //isInvalid={formik.errors.answer ? true : false}
                    //isValid={formik.dirty && !formik.errors.answer ? true : false}
                  />
                  <ShowError>{formik.errors.answer}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Col md={12}>
                <Button
                  variant="success"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                >
                  {!modalData ? 'Submit' : 'Update'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default FaqModal
