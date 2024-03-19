import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import ShowError from 'src/errors/ShowError'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getAllSubCategory } from 'src/slices/subCategorySlice'
import { addSubCategoryChild, updateSubCategoryChild } from 'src/slices/subCategoryChildSlice'

const SubCategoryChildModal = ({ modalData, onHide }) => {
  const { subCategorys } = useSelector((state) => state.subCategorys)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSubCategory())
  }, [dispatch])

  const addData = (values) => {
    if (!modalData) {
      dispatch(addSubCategoryChild(values))
      onHide()
    } else {
      dispatch(updateSubCategoryChild(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      title: (modalData && modalData?.title) || '',
      description: (modalData && modalData?.description) || '',
      sub_category_id: (modalData && modalData?.sub_category_id) || undefined,
    },
    //validationSchema: subCategoryChildValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sub Category has been saved',
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
              <Col md={12}>
                <Form.Label>
                  <b>Category</b>{' '}
                </Form.Label>
                <Form.Select
                  name="sub_category_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sub_category_id ? formik.values.sub_category_id : 'DEFAULT'}
                  // isInvalid={formik.errors.sub_category_id ? true : false}
                  // isValid={formik.dirty && !formik.errors.sub_category_id ? true : false}
                >
                  <option value="DEFAULT">Select Category</option>
                  {subCategorys.map((subCategory) => {
                    const { id, title } = subCategory
                    return (
                      <option value={id} key={id}>
                        {title}
                      </option>
                    )
                  })}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b>Title</b>{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    // isInvalid={formik.errors.title ? true : false}
                    // isValid={formik.dirty && !formik.errors.title ? true : false}
                  />
                  <ShowError>{formik.errors.title}</ShowError>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Description</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    //isInvalid={formik.errors.description ? true : false}
                    //isValid={formik.dirty && !formik.errors.description ? true : false}
                  />
                  <ShowError>{formik.errors.description}</ShowError>
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

export default SubCategoryChildModal
