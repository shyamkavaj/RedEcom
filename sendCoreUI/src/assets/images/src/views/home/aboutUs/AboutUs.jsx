import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from 'src/components/ImagePreview'
import ImageFilePreview from 'src/components/ImageFilePreview'
import TextEditor from 'src/components/react-quil/TextEditor'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { getAboutusById, updateAboutUs } from 'src/slices/aboutusSlice'

const AboutUs = () => {
  const image1 = useRef()
  const image2 = useRef()
  const image3 = useRef()

  const dispatch = useDispatch()

  const { about } = useSelector((state) => state.about)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: about && about.id,
      title: about.title,
      description: about.description,
      shot_description: about.shot_description,
      image1: '',
      image2: '',
      image3: '',
      page_title: about.page_title,
      page_description: about.page_description,
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updateAboutUs(values))
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'About Us Page has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAboutusById(1))
  }, [dispatch])

  return (
    <>
      <h3 className="maintitle">About Us</h3>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Card className="p-2 mb-5">
              <Card.Body>
                <Row className="my-3">
                  <Form.Group as={Col}>
                    <Form.Label>Banner Image</Form.Label>
                    <div>
                      <Button variant="success" onClick={() => image1.current.click()}>
                        Upload Image
                      </Button>
                    </div>
                    <Form.Control
                      hidden
                      ref={image1}
                      name="image1"
                      type="file"
                      accept="image/*"
                      onChange={(e) => formik.setFieldValue('image1', e.currentTarget.files[0])}
                    />{' '}
                    {about && !formik.values.image1 ? (
                      <div className="mt-2">
                        {about.image1 ? (
                          <ImagePreview width={200} height={100} src={about.image1} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image1 && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image1} />
                      )
                    )}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Banner Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.title ? true : false}
                      //isValid={formik.dirty && !formik.errors.title ? true : false}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>

            <Card className="p-2 mb-5">
              <Card.Body>
                <Row>
                  <h5>For SEO</h5>
                  <Form.Group as={Col}>
                    <Form.Label>Page Title/ OG Title</Form.Label>
                    <Form.Control
                      type="text"
                      id="page_title"
                      name="page_title"
                      placeholder="Enter Page Title"
                      onChange={formik.handleChange}
                      value={formik.values.page_title}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
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
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>

            <Card className="p-2 mb-5">
              <Card.Body>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Founder Image</Form.Label>
                    <div>
                      <Button variant="success" onClick={() => image2.current.click()}>
                        Upload Image
                      </Button>
                    </div>
                    <Form.Control
                      hidden
                      ref={image2}
                      name="image2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => formik.setFieldValue('image2', e.currentTarget.files[0])}
                    />{' '}
                    {about && !formik.values.image2 ? (
                      <div className="mt-2">
                        {about.image2 ? (
                          <ImagePreview width={200} height={100} src={about.image2} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image2 && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image2} />
                      )
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Founder Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Enter Description"
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.description ? true : false}
                      //isValid={formik.dirty && !formik.errors.description ? true : false}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="p-2 mb-5">
              <Card.Body>
                <Row className="my-5">
                  <Form.Group as={Col}>
                    <Form.Label>Image</Form.Label>
                    <div>
                      <Button variant="success" onClick={() => image3.current.click()}>
                        Upload Image
                      </Button>
                    </div>
                    <Form.Control
                      hidden
                      ref={image3}
                      name="image3"
                      type="file"
                      accept="image/*"
                      onChange={(e) => formik.setFieldValue('image3', e.currentTarget.files[0])}
                    />{' '}
                    {about && !formik.values.image3 ? (
                      <div className="mt-2">
                        {about.image3 ? (
                          <ImagePreview width={200} height={100} src={about.image3} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image3 && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image3} />
                      )
                    )}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Short Description</Form.Label>
                    <TextEditor
                      value={formik.values.shot_description}
                      onChange={(value) => formik.setFieldValue('shot_description', value)}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="success"
                      type="submit"
                      className="mx-2 my-2 px-5 float-end btn-block"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default AboutUs
