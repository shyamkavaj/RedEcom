import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import ShowError from 'src/errors/ShowError'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getAllCategory } from 'src/slices/categorySlice'
import TextEditor from 'src/components/react-quil/TextEditor'
import { getAllSubCategory } from 'src/slices/subCategorySlice'
import { getAllSubCategoryChild } from 'src/slices/subCategoryChildSlice'
import { createProviderService, updateProviderService } from 'src/slices/providerServiceSlice'

const ProviderServiceModal = ({ modalData, onHide }) => {
  const { categorys } = useSelector((state) => state.categorys)
  const { subCategorys } = useSelector((state) => state.subCategorys)
  const { subCategorysChild } = useSelector((state) => state.subCategoryChild)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategory())
    dispatch(getAllSubCategory())
    dispatch(getAllSubCategoryChild())
  }, [dispatch])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      category_id: (modalData && modalData?.category_id) || undefined,
      sub_category_id: (modalData && modalData?.sub_category_id) || undefined,
      sub_sub_category_id: (modalData && modalData?.sub_sub_category_id) || undefined,
      title: (modalData && modalData?.title) || '',
      description: (modalData && modalData?.description) || '',
      duration: (modalData && modalData?.duration) || '',
      penalty: (modalData && modalData?.penalty) || '',
      benefits: (modalData && modalData?.benefits) || '',
      documents: (modalData && modalData?.documents) || '',
      deliverables: (modalData && modalData?.deliverables) || '',
      price: (modalData && modalData?.price) || '',
      status: (modalData && modalData?.status) || false,
      top_service: modalData?.top_service ? true : false,
      market_price: (modalData && modalData?.market_price) || '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!modalData) {
        dispatch(createProviderService(values))
        onHide()
      } else {
        dispatch(updateProviderService(values))
        onHide()
      }

      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Provider Service has been saved',
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
                <Form.Group>
                  <Form.Label>
                    <b>Title </b>{' '}
                  </Form.Label>
                  <Form.Control
                    id="title"
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    //isInvalid{formik.errors.title ? true : false}
                    //isValid{formik.dirty && !formik.errors.title ? true : false}
                  />
                  <ShowError>{formik.errors.title}</ShowError>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Description</b>{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    //isInvalid{formik.errors.description ? true : false}
                    //isValid{formik.dirty && !formik.errors.description ? true : false}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b>Service </b>{' '}
                  </Form.Label>
                  <Form.Select
                    name="category_id"
                    onChange={formik.handleChange}
                    value={formik.values.category_id}

                    //isInvalid{formik.errors.category_id ? true : false}
                    //isValid{formik.dirty && !formik.errors.category_id ? true : false}
                  >
                    <option value="">Select Service</option>
                    {categorys.map((category) => {
                      const { id, title } = category
                      return (
                        <option value={id} key={id}>
                          {title}{' '}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b>Category </b>{' '}
                  </Form.Label>
                  <Form.Select
                    name="sub_category_id"
                    onChange={formik.handleChange}
                    value={formik.values.sub_category_id}

                    //isInvalid{formik.errors.sub_category_id ? true : false}
                    //isValid{formik.dirty && !formik.errors.sub_category_id ? true : false}
                  >
                    <option value="">Select Category</option>
                    {subCategorys.map((subCategory) => {
                      const { id, title } = subCategory
                      return (
                        <option value={id} key={id}>
                          {title}{' '}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Label>
                  <b>Sub Category </b>{' '}
                </Form.Label>
                <Form.Group>
                  <Form.Select
                    name="sub_sub_category_id"
                    onChange={formik.handleChange}
                    value={formik.values.sub_sub_category_id}

                    //isInvalid{formik.errors.sub_sub_category_id ? true : false}
                    //isValid{formik.dirty && !formik.errors.sub_sub_category_id ? true : false}
                  >
                    <option value="">Select Sub-Category</option>
                    {subCategorysChild.map((subCategoryChild) => {
                      const { id, title } = subCategoryChild
                      return (
                        <option value={id} key={id}>
                          {title}{' '}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Duration</b>{' '}
                  </Form.Label>
                  <TextEditor
                    value={formik.values.duration}
                    onChange={(value) => formik.setFieldValue('duration', value)}
                  />
                  <ShowError>{formik.errors.duration}</ShowError>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Benifits</b>{' '}
                  </Form.Label>
                  <TextEditor
                    value={formik.values.benefits}
                    onChange={(value) => formik.setFieldValue('benefits', value)}
                  />
                  <ShowError>{formik.errors.benefits}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Documents</b>{' '}
                  </Form.Label>
                  <TextEditor
                    value={formik.values.documents}
                    onChange={(value) => formik.setFieldValue('documents', value)}
                  />
                  <ShowError>{formik.errors.documents}</ShowError>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Deliverables</b>{' '}
                  </Form.Label>
                  <TextEditor
                    value={formik.values.deliverables}
                    onChange={(value) => formik.setFieldValue('deliverables', value)}
                  />
                  <ShowError>{formik.errors.deliverables}</ShowError>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b> Penalty</b>{' '}
                  </Form.Label>
                  <Form.Select
                    name="penalty"
                    value={formik.values.penalty ? formik.values.penalty : 'DEFAULT'}
                    onChange={formik.handleChange}
                    //isInvalid{formik.errors.penalty ? true : false}
                    //isValid{formik.dirty && !formik.errors.penalty ? true : false}
                  >
                    <option value="DEFAULT" disabled>
                      Penalty
                    </option>
                    <option value={'yes'}> Yes</option>
                    <option value={'no'}> No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <b>Price </b>{' '}
                  </Form.Label>
                  <Form.Control
                    id="price"
                    type="number"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    //isInvalid{formik.errors.price ? true : false}
                    //isValid{formik.dirty && !formik.errors.price ? true : false}
                  />
                  <ShowError>{formik.errors.price}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <b>Market Price </b>{' '}
                  </Form.Label>
                  <Form.Control
                    id="market_price"
                    type="number"
                    name="market_price"
                    onChange={formik.handleChange}
                    value={formik.values.market_price}
                    //isInvalid{formik.errors.market_price ? true : false}
                    //isValid{formik.dirty && !formik.errors.market_price ? true : false}
                  />
                  <ShowError>{formik.errors.market_price}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
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

export default ProviderServiceModal
