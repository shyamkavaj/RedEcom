import { FieldArray, FormikProvider, useFormik } from 'formik'
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import ShowError from 'src/errors/ShowError'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getAllCategory } from 'src/slices/categorySlice'
import TextEditor from 'src/components/react-quil/TextEditor'
import { addSubCategory, updateSubCategory } from 'src/slices/subCategorySlice'
import Swal from 'sweetalert2'
import ImageFilePreview from 'src/components/ImageFilePreview'
import ImagePreview from 'src/components/ImagePreview'

const SubCategoryModal = ({ modalData, onHide }) => {
  const [inputList, setInputList] = useState([{ heading: '', description: '' }])

  const { categorys } = useSelector((state) => state.categorys)

  const dispatch = useDispatch()

  const subCategoryImage = useRef()

  const addData = (values) => {
    const data = {
      ...values,
      path: values.path.replace(/\s+/g, '-').toLowerCase(),
    }
    if (!modalData) {
      dispatch(addSubCategory(data))
      dispatch(getAllCategory())
      onHide()
    } else {
      dispatch(updateSubCategory(data))
      dispatch(getAllCategory())
      onHide()
    }
  }

  useEffect(() => {
    dispatch(getAllCategory())
  }, [dispatch])

  useEffect(() => {
    if (modalData?.extra_head_des) {
      setInputList(modalData?.extra_head_des)
    }
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      title: (modalData && modalData?.title) || '',
      description: (modalData && modalData?.description) || '',
      category_id: (modalData && modalData?.category_id) || undefined,
      banefit: (modalData && modalData?.banefit) || '',
      basic_requirement: (modalData && modalData?.basic_requirement) || '',
      capital_structure: (modalData && modalData?.capital_structure) || '',
      company_registration: (modalData && modalData?.company_registration) || '',
      cropbiz_assistance: (modalData && modalData?.cropbiz_assistance) || '',
      documents: (modalData && modalData?.documents) || '',
      importance: (modalData && modalData?.importance) || '',
      moa_aoa: (modalData && modalData?.moa_aoa) || '',
      overview: (modalData && modalData?.overview) || '',
      path: (modalData && modalData?.path) || '',
      procedure: (modalData && modalData?.procedure) || '',
      heading1: (modalData && modalData?.heading1) || '',
      heading2: (modalData && modalData?.heading2) || '',
      heading3: (modalData && modalData?.heading3) || '',
      heading4: (modalData && modalData?.heading4) || '',
      heading5: (modalData && modalData?.heading5) || '',
      subCategoryImage: '',
      // market_price: (modalData && modalData?.market_price) || undefined,
      // ensurekar_price: (modalData && modalData?.ensurekar_price) || undefined,
      page_title: (modalData && modalData?.page_title) || '',
      page_description: (modalData && modalData?.page_description) || '',
      headDes: inputList,
    },
    // validationSchema: subCategoryValidationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <>
      <Row>
        <Col md={12}>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Title</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      //isInvalid={formik.errors.title ? true : false}
                      //isValid={formik.dirty && !formik.errors.title ? true : false}
                    />
                    <ShowError>{formik.errors.title}</ShowError>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Path for Page</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="path"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.path}
                      //isInvalid={formik.errors.path ? true : false}
                      //isValid={formik.dirty && !formik.errors.path ? true : false}
                    />
                    <ShowError>{formik.errors.title}</ShowError>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <h6>For SEO</h6>
                <Col md={12}>
                  <Form.Label>Page Title/ OG Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="page_title"
                    name="page_title"
                    placeholder="Enter Page Title"
                    onChange={formik.handleChange}
                    value={formik.values.page_title}
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Page Description / OG Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    id="page_description"
                    name="page_description"
                    placeholder="Enter Page Description"
                    onChange={formik.handleChange}
                    value={formik.values.page_description}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Label>
                    <b>Service</b>
                  </Form.Label>
                  <Form.Select
                    name="category_id"
                    onChange={formik.handleChange}
                    value={formik.values.category_id ? formik.values.category_id : 'DEFAULT'}
                    onBlur={formik.handleBlur}
                    //isInvalid={formik.errors.category_id ? true : false}
                    //isValid={formik.dirty && !formik.errors.category_id ? true : false}
                  >
                    <option value="DEFAULT">Select Service</option>
                    {categorys.map((category) => {
                      const { id, title } = category
                      return (
                        <option value={id} key={id}>
                          {title}{' '}
                        </option>
                      )
                    })}
                  </Form.Select>
                  <ShowError>{formik.errors.category_id}</ShowError>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Description</b>{' '}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      // isInvalid={formik.errors.description ? true : false}
                      //isValid={formik.dirty && !formik.errors.description ? true : false}
                    />
                    <ShowError>{formik.errors.description}</ShowError>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row> */}
              {/* <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      <b>Market Price</b>{' '}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="market_price"
                      onChange={formik.handleChange}
                      value={formik.values.market_price}
                      // isInvalid={formik.errors.market_price ? true : false}
                      //isValid={formik.dirty && !formik.errors.market_price ? true : false}
                    />
                    <ShowError>{formik.errors.market_price}</ShowError>
                  </Form.Group>
                </Col> */}
              {/* <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Ensurekar Price</b>{' '}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="ensurekar_price"
                      onChange={formik.handleChange}
                      value={formik.values.ensurekar_price}
                      // isInvalid={formik.errors.ensurekar_price ? true : false}
                      //isValid={formik.dirty && !formik.errors.ensurekar_price ? true : false}
                    />
                    <ShowError>{formik.errors.ensurekar_price}</ShowError>
                  </Form.Group>
                </Col> */}
              {/* </Row> */}

              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Banner heading1</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="heading1"
                      onChange={formik.handleChange}
                      value={formik.values.heading1}
                      //isInvalid={formik.errors.heading1 ? true : false}
                      //isValid={formik.dirty && !formik.errors.heading1 ? true : false}
                    />
                    <ShowError>{formik.errors.heading1}</ShowError>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Banner heading2</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="heading2"
                      onChange={formik.handleChange}
                      value={formik.values.heading2}
                      //isInvalid={formik.errors.heading2 ? true : false}
                      //isValid={formik.dirty && !formik.errors.heading2 ? true : false}
                    />
                    <ShowError>{formik.errors.heading2}</ShowError>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Banner heading3</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="heading3"
                      onChange={formik.handleChange}
                      value={formik.values.heading3}
                      // isInvalid={formik.errors.heading3 ? true : false}
                      // isValid={formik.dirty && !formik.errors.heading3 ? true : false}
                    />
                    <ShowError>{formik.errors.heading3}</ShowError>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Banner heading4</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="heading4"
                      onChange={formik.handleChange}
                      value={formik.values.heading4}
                      // isInvalid={formik.errors.heading4 ? true : false}
                      // isValid={formik.dirty && !formik.errors.heading4 ? true : false}
                    />
                    <ShowError>{formik.errors.heading4}</ShowError>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Banner heading5</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="heading5"
                      onChange={formik.handleChange}
                      value={formik.values.heading5}
                      //isInvalid={formik.errors.heading5 ? true : false}
                      //isValid={formik.dirty && !formik.errors.heading5 ? true : false}
                    />
                    <ShowError>{formik.errors.heading5}</ShowError>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Overview</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.overview}
                      onChange={(value) => formik.setFieldValue('overview', value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Benefits</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.banefit}
                      onChange={(value) => formik.setFieldValue('banefit', value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Basic Requirement</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.basic_requirement}
                      onChange={(value) => formik.setFieldValue('basic_requirement', value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Comapany Registration</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.company_registration}
                      onChange={(value) => formik.setFieldValue('company_registration', value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Documents</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.documents}
                      onChange={(value) => formik.setFieldValue('documents', value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Procedure</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.procedure}
                      onChange={(value) => formik.setFieldValue('procedure', value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>MOA/AOA</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.moa_aoa}
                      onChange={(value) => formik.setFieldValue('moa_aoa', value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Importance of Choosing</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.importance}
                      onChange={(value) => formik.setFieldValue('importance', value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>Capital Structure</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.capital_structure}
                      onChange={(value) => formik.setFieldValue('capital_structure', value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>
                      <b>CropBiz Assistance</b>
                    </Form.Label>
                    <TextEditor
                      value={formik.values.cropbiz_assistance}
                      onChange={(value) => formik.setFieldValue('cropbiz_assistance', value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      <b>Sub Category Image</b>
                    </Form.Label>
                    <div>
                      <Button variant="success" onClick={() => subCategoryImage.current.click()}>
                        Upload Image
                      </Button>
                    </div>
                    <Form.Control
                      hidden
                      ref={subCategoryImage}
                      name="subCategoryImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        formik.setFieldValue('subCategoryImage', e.currentTarget.files[0])
                      }
                    />{' '}
                    {modalData && !formik.values.subCategoryImage ? (
                      <div className="mt-2">
                        {modalData.subCategoryImage ? (
                          <ImagePreview
                            width={200}
                            height={100}
                            src={modalData.subCategoryImage}
                            alt="LOGO"
                          />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.subCategoryImage && (
                        <ImageFilePreview
                          width={200}
                          height={100}
                          file={formik.values.subCategoryImage}
                        />
                      )
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <FieldArray name="headDes">
                  {(arrayHelpers) => (
                    <>
                      {formik.values.headDes?.map((input, index) => {
                        return (
                          <React.Fragment key={index}>
                            <Col md={12}>
                              <Form.Group>
                                <Form.Label>
                                  <b>New Heading {index + 1}</b>
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name={`headDes.${index}.heading`}
                                  value={formik.values.headDes[index].heading}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group>
                                <Form.Label>
                                  <b>New Description {index + 1}</b>
                                </Form.Label>
                                <TextEditor
                                  value={formik.values.headDes[index].description}
                                  onChange={(value) =>
                                    formik.setFieldValue(`headDes.${index}.description`, value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <div className="btn-box">
                              {formik.values.headDes.length !== 1 && (
                                <Button
                                  variant="success"
                                  className="m-3"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Remove
                                </Button>
                              )}
                              {formik.values.headDes.length - 1 === index && (
                                <Button
                                  variant="success"
                                  className="m-3"
                                  onClick={() =>
                                    arrayHelpers.push({ heading: '', description: '' })
                                  }
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </React.Fragment>
                        )
                      })}
                    </>
                  )}
                </FieldArray>
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
          </FormikProvider>
        </Col>
      </Row>
    </>
  )
}

export default SubCategoryModal
