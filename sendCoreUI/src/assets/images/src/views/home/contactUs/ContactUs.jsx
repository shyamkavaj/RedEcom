import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from 'src/components/ImagePreview'
import TextEditor from 'src/components/react-quil/TextEditor'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import ImageFilePreview from 'src/components/ImageFilePreview'
import { getContactById, updateContactUs } from 'src/slices/contactusSlice'
import Swal from 'sweetalert2'

const ContactUs = () => {
  const image = useRef()

  const { contact } = useSelector((state) => state.contact)
  const dispatch = useDispatch()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: contact && contact.id,
      title: contact.title,
      description: contact.description,
      email_title: contact.email_title,
      email: contact.email,
      email_title1: contact.email_title1,
      email1: contact.email1,
      email_title2: contact.email_title2,
      email2: contact.email2,
      email_title3: contact.email_title3,
      email3: contact.email3,
      email_title4: contact.email_title4,
      email4: contact.email4,
      email_title5: contact.email_title5,
      email5: contact.email5,
      location1: contact.location1,
      location2: contact.location2,
      location3: contact.location3,
      image: '',
      page_title: contact.page_title,
      page_description: contact.page_description,
    },
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(updateContactUs(values))
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contact Us Page has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getContactById(1))
  }, [dispatch])

  return (
    <>
      <h3 className="maintitle">Contact Us</h3>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Card className="p-2 mb-5">
              <Card.Body>
                <Row className="my-5">
                  <Form.Group as={Col}>
                    <Form.Label>Banner Image</Form.Label>
                    <div>
                      <Button variant="success" onClick={() => image.current.click()}>
                        Upload Image
                      </Button>
                    </div>
                    <Form.Control
                      hidden
                      ref={image}
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
                    />{' '}
                    {contact && !formik.values.image ? (
                      <div className="mt-2">
                        {contact.image ? (
                          <ImagePreview width={200} height={100} src={contact.image} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image} />
                      )
                    )}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label> Title</Form.Label>
                    <Form.Control
                      type="text"
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.title ? true : false}
                      //isValid={formik.dirty && !formik.errors.title ? true : false}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label> Description</Form.Label>
                    <TextEditor
                      value={formik.values.description}
                      onChange={(value) => formik.setFieldValue('description', value)}
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
                <Row className="my-3">
                  <Form.Group as={Col}>
                    <Form.Label>Help Title 1 </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      id="email_title"
                      name="email_title"
                      value={formik.values.email_title}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.email_title ? true : false}
                      //isValid={formik.dirty && !formik.errors.email_title ? true : false}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Help Title 2 </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      id="email_title2"
                      name="email_title2"
                      value={formik.values.email_title2}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.email_title2 ? true : false}
                      //isValid={formik.dirty && !formik.errors.email_title2 ? true : false}
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col}>
                    <Form.Label>Help Title 3 </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title 3"
                      id="email_title3"
                      name="email_title3"
                      value={formik.values.email_title3}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.email_title3 ? true : false}
                      //isValid={formik.dirty && !formik.errors.email_title3 ? true : false}
                    />
                  </Form.Group>
                </Row>

                <Row className="my-3">
                  <Form.Group as={Col}>
                    <Form.Label>Help Email 1 </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.email ? true : false}
                      //isValid={formik.dirty && !formik.errors.email ? true : false}
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col}>
                    <Form.Label>Help Email 2 </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="email2"
                      name="email2"
                      value={formik.values.email2}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.email2 ? true : false}
                      //isValid={formik.dirty && !formik.errors.email2 ? true : false}
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col}>
                    <Form.Label>Help Email 3 </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="email3"
                      name="email3"
                      value={formik.values.email3}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.email3 ? true : false}
                      //isValid={formik.dirty && !formik.errors.email3 ? true : false}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>

            <Card className="p-2 mb-5">
              <Card.Body>
                <Row className="my-3">
                  <Form.Group as={Col}>
                    <Form.Label>Address 1 </Form.Label>
                    <TextEditor
                      value={formik.values.location1}
                      onChange={(value) => formik.setFieldValue('location1', value)}
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col}>
                    <Form.Label>Address 2 </Form.Label>
                    <TextEditor
                      value={formik.values.location2}
                      onChange={(value) => formik.setFieldValue('location2', value)}
                    />
                  </Form.Group>{' '}
                  <Form.Group as={Col}>
                    <Form.Label>Address 3 </Form.Label>
                    <TextEditor
                      value={formik.values.location3}
                      onChange={(value) => formik.setFieldValue('location3', value)}
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

export default ContactUs
