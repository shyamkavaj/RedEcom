import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from 'src/components/ImagePreview'
import ImageFilePreview from 'src/components/ImageFilePreview'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { getPartnerById, updatePartner } from 'src/slices/becomePartnerSlice'

const BecomePartnerPage = () => {
  const bannerImage = useRef()
  const image1 = useRef()
  const image2 = useRef()
  const image3 = useRef()

  const dispatch = useDispatch()
  const { partner } = useSelector((state) => state.becomePartner)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: partner && partner.id,
      banner_image: '',
      banner_title: partner.banner_title,
      ourPartner_title: partner.ourPartner_title,
      image1: '',
      image2: '',
      image3: '',
      image1_subtitle: partner.image1_subtitle,
      image2_subtitle: partner.image2_subtitle,
      image3_subtitle: partner.image3_subtitle,
      page_title: partner.page_title,
      page_description: partner.page_description,
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updatePartner(values))
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Become Partner Page has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPartnerById(1))
  }, [dispatch])

  return (
    <>
      <h3 className="maintitle">Become Partner Page</h3>
      <Col>
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Card className="p-2 mb-5">
            <Card.Body>
              <Row className="my-3">
                <Form.Group as={Col}>
                  <Form.Label>Banner Image</Form.Label>
                  <div>
                    <Button variant="success" onClick={() => bannerImage.current.click()}>
                      Upload Image
                    </Button>
                  </div>
                  <Form.Control
                    hidden
                    ref={bannerImage}
                    name="banner_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => formik.setFieldValue('banner_image', e.currentTarget.files[0])}
                  />{' '}
                  {partner && !formik.values.banner_image ? (
                    <div className="mt-2">
                      {partner.banner_image ? (
                        <ImagePreview
                          width={200}
                          height={100}
                          src={partner.banner_image}
                          alt="LOGO"
                        />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.banner_image && (
                      <ImageFilePreview
                        width={200}
                        height={100}
                        file={formik.values.banner_image}
                      />
                    )
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Banner Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="banner_title"
                    name="banner_title"
                    value={formik.values.banner_title}
                    onChange={formik.handleChange}
                    //isInvalid={formik.errors.banner_title ? true : false}
                    //isValid={formik.dirty && !formik.errors.banner_title ? true : false}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>OurPartner Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="ourPartner_title"
                    name="ourPartner_title"
                    value={formik.values.ourPartner_title}
                    onChange={formik.handleChange}
                    //isInvalid={formik.errors.ourPartner_title ? true : false}
                    //isValid={formik.dirty && !formik.errors.ourPartner_title ? true : false}
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
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Image 1</Form.Label>
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
                    {partner && !formik.values.image1 ? (
                      <div className="mt-2">
                        {partner.image1 ? (
                          <ImagePreview width={200} height={100} src={partner.image1} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image1 && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image1} />
                      )
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image 1 Title</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Enter Title"
                      id="image1_subtitle"
                      name="image1_subtitle"
                      value={formik.values.image1_subtitle}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.image1_subtitle ? true : false}
                      //isValid={formik.dirty && !formik.errors.image1_subtitle ? true : false}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label> Image 2</Form.Label>
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
                    {partner && !formik.values.image2 ? (
                      <div className="mt-2">
                        {partner.image2 ? (
                          <ImagePreview width={200} height={100} src={partner.image2} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image2 && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image2} />
                      )
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image 2 Title</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Enter Title"
                      id="image2_subtitle"
                      name="image2_subtitle"
                      value={formik.values.image2_subtitle}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.image2_subtitle ? true : false}
                      //isValid={formik.dirty && !formik.errors.image2_subtitle ? true : false}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label> Image 3</Form.Label>
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
                    {partner && !formik.values.image3 ? (
                      <div className="mt-2">
                        {partner.image3 ? (
                          <ImagePreview width={200} height={100} src={partner.image3} alt="LOGO" />
                        ) : null}
                      </div>
                    ) : (
                      formik.values.image3 && (
                        <ImageFilePreview width={200} height={100} file={formik.values.image3} />
                      )
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image 3 Title</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Enter Title"
                      id="image3_subtitle"
                      name="image3_subtitle"
                      value={formik.values.image3_subtitle}
                      onChange={formik.handleChange}
                      //isInvalid={formik.errors.image3_subtitle ? true : false}
                      //isValid={formik.dirty && !formik.errors.image3_subtitle ? true : false}
                    />
                  </Form.Group>
                </Col>
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
    </>
  )
}

export default BecomePartnerPage
