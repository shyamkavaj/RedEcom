import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import ImageFilePreview from 'src/components/ImageFilePreview'
import ImagePreview from 'src/components/ImagePreview'
import TextEditor from 'src/components/react-quil/TextEditor'
import ShowError from 'src/errors/ShowError'
import { addBlog, updateBlog } from 'src/slices/blogSlice'
import Swal from 'sweetalert2'

const BlogModel = ({ modalData, onHide }) => {
  const dispatch = useDispatch()
  const blogImg = useRef()

  const addData = async (values) => {
    let data = {
      ...values,
      slug: values.title.replace(/\s+/g, '-').toLowerCase(),
    }

    if (!modalData) {
      await dispatch(addBlog(data))
      onHide()
    } else {
      await dispatch(updateBlog(data))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      title: (modalData && modalData?.title) || '',
      description: (modalData && modalData?.description) || '',
      image: '',
      slug: (modalData && modalData?.slug) || '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Blog has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  return (
    <>
      <Row>
        <Col md={12}>
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    //isInvalid={formik.errors.title ? true : false}
                    // isValid={formik.dirty && !formik.errors.title ? true : false}
                  />
                  <ShowError>{formik.errors.title}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Blog Slug</Form.Label>
                  <Form.Control
                    type="text"
                    name="slug"
                    disabled={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title.replace(/\s+/g, '-').toLowerCase()}
                    //isInvalid={formik.errors.slug ? true : false}
                    // isValid={formik.dirty && !formik.errors.slug ? true : false}
                  />
                  <ShowError>{formik.errors.slug}</ShowError>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>
                    <b>Blog Description</b>
                  </Form.Label>
                  <TextEditor
                    value={formik.values.description}
                    onChange={(value) => formik.setFieldValue('description', value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Blog Image</Form.Label>
                <div>
                  <Button variant="success" onClick={() => blogImg.current.click()}>
                    Blog Image
                  </Button>
                </div>
                <Form.Control
                  hidden
                  ref={blogImg}
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                />{' '}
                {modalData && !formik.values.image ? (
                  <div className="mt-2">
                    {modalData.image ? (
                      <ImagePreview width={200} height={100} src={modalData.image} alt="LOGO" />
                    ) : null}
                  </div>
                ) : (
                  formik.values.image && (
                    <ImageFilePreview width={200} height={100} file={formik.values.image} />
                  )
                )}
              </Form.Group>
            </Row>
            <Row className="my-2">
              <Col md={12}>
                <Button
                  variant="success"
                  type="submit"
                  // disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
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

export default BlogModel
