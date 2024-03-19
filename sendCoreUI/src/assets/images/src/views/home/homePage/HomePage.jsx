import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImagePreview from 'src/components/ImagePreview'
import ImageFilePreview from 'src/components/ImageFilePreview'
import { getAllHome, updatehome } from 'src/slices/homeSlice'
import TextEditor from 'src/components/react-quil/TextEditor'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const HomePage = () => {
  const header_logo = useRef()
  const banner_image = useRef()
  const footer_logo = useRef()
  const image1 = useRef()
  const image2 = useRef()
  const image3 = useRef()
  const image4 = useRef()

  const dispatch = useDispatch()

  const { setting } = useSelector((state) => state.home)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: setting.id,
      header_logo: '',
      banner_image: '',
      banner_title: setting.banner_title,
      banner_sub_title: setting.banner_sub_title,
      l_title: setting.l_title,
      l_service_sub_title: setting.l_service_sub_title,
      o_title: setting.o_title,
      o_sub_title: setting.o_sub_title,
      r_title: setting.r_title,
      r_sub_title: setting.r_sub_title,
      achivement_title: setting.achivement_title,
      achivement_description: setting.achivement_description,
      facebook_url: setting.facebook_url,
      twitter_url: setting.twitter_url,
      instagram_url: setting.instagram_url,
      linkedin_url: setting.linkedin_url,
      helpline_no: setting.helpline_no,
      helpline_text: setting.helpline_text,
      footer_logo: '',
      page_title: setting.page_title,
      page_description: setting.page_description,
      google_form_link: setting.google_form_link,
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image1_subtitle: setting.image1_subtitle,
      image2_subtitle: setting.image2_subtitle,
      image3_subtitle: setting.image3_subtitle,
      image4_subtitle: setting.image4_subtitle,
      image1_description: setting.image1_description,
      image2_description: setting.image2_description,
      image3_description: setting.image3_description,
      image4_description: setting.image4_description,
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updatehome(values))
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Home Page has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllHome())
  }, [dispatch])

  return (
    <>
      <h3 className="maintitle">Home Page</h3>
      <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Card className="p-2 mb-5">
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Website Logo</Form.Label>
                  <div>
                    <Button variant="success" onClick={() => header_logo.current.click()}>
                      Upload Web Logo
                    </Button>
                  </div>
                  <Form.Control
                    hidden
                    ref={header_logo}
                    name="header_logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => formik.setFieldValue('header_logo', e.currentTarget.files[0])}
                  />{' '}
                  {setting && !formik.values.header_logo ? (
                    <div className="mt-2">
                      {setting.header_logo ? (
                        <ImagePreview
                          width={200}
                          height={100}
                          src={setting.header_logo}
                          alt="LOGO"
                        />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.header_logo && (
                      <ImageFilePreview width={200} height={100} file={formik.values.header_logo} />
                    )
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Banner Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="banner_title"
                    name="banner_title"
                    value={formik.values.banner_title}
                    onChange={formik.handleChange}
                    //isInvalid={formik.errors.banner_title ? true : false}
                    //isValid={formik.dirty && !formik.errors.banner_title ? true : false}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Banner BG Image</Form.Label>
                  <div>
                    <Button variant="success" onClick={() => banner_image.current.click()}>
                      Upload Banner Image
                    </Button>
                  </div>
                  <Form.Control
                    hidden
                    ref={banner_image}
                    name="banner_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => formik.setFieldValue('banner_image', e.currentTarget.files[0])}
                  />
                  {setting && !formik.values.banner_image ? (
                    <div className="mt-2">
                      {setting.banner_image ? (
                        <ImagePreview
                          width={200}
                          height={100}
                          src={setting.banner_image}
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
                <Form.Group>
                  <Form.Label>Banner Sub Title</Form.Label>
                  <Form.Control
                    type="text"
                    id="banner_sub_title"
                    name="banner_sub_title"
                    placeholder="Enter Banner Sub Title"
                    onChange={formik.handleChange}
                    value={formik.values.banner_sub_title}
                    //isInvalid={formik.errors.banner_sub_title ? true : false}
                    // isValid={formik.dirty && !formik.errors.banner_sub_title ? true : false}
                  />
                </Form.Group>
              </Col>
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
                <Form.Label>Legal Service Title</Form.Label>
                <Form.Control
                  type="text"
                  id="l_title"
                  name="l_title"
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  value={formik.values.l_title}
                  //isInvalid={formik.errors.l_title ? true : false}
                  //isValid={formik.dirty && !formik.errors.l_title ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Legal Service Description</Form.Label>
                <TextEditor
                  value={formik.values.l_service_sub_title}
                  onChange={(value) => formik.setFieldValue('l_service_sub_title', value)}
                />
              </Form.Group>
            </Row>
            <Row className="my-3">
              <Form.Group as={Col}>
                <Form.Label>Our Service Title</Form.Label>
                <Form.Control
                  type="text"
                  id="o_title"
                  name="o_title"
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  value={formik.values.o_title}
                  // isInvalid={formik.errors.o_title ? true : false}
                  //isValid={formik.dirty && !formik.errors.o_title ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Our Service Description</Form.Label>
                <Form.Control
                  type="text"
                  id="o_sub_title"
                  name="o_sub_title"
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  value={formik.values.o_sub_title}
                  // isInvalid={formik.errors.o_sub_title ? true : false}
                  //isValid={formik.dirty && !formik.errors.o_sub_title ? true : false}
                />
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>
        <Card className="p-2 mb-5">
          <Card.Body>
            <Row>
              <h5>Reason Why Us Section</h5>
              <Form.Group as={Col}>
                <Form.Label>Reason Title</Form.Label>
                <Form.Control
                  type="text"
                  id="r_title"
                  name="r_title"
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  value={formik.values.r_title}
                  //isInvalid={formik.errors.r_title ? true : false}
                  //isValid={formik.dirty && !formik.errors.r_title ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Reason Description</Form.Label>
                <Form.Control
                  type="text"
                  id="r_sub_title"
                  name="r_sub_title"
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  value={formik.values.r_sub_title}
                  //isInvalid={formik.errors.r_sub_title ? true : false}
                  //isValid={formik.dirty && !formik.errors.r_sub_title ? true : false}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col md={3}>
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
                  {setting && !formik.values.image1 ? (
                    <div className="mt-2">
                      {setting.image1 ? (
                        <ImagePreview width={200} height={100} src={setting.image1} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image1 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image1} />
                    )
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="image1_subtitle"
                    name="image1_subtitle"
                    value={formik.values.image1_subtitle}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Short Description 1</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter Description"
                    id="image1_description"
                    name="image1_description"
                    value={formik.values.image1_description}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Image 2</Form.Label>
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
                  {setting && !formik.values.image2 ? (
                    <div className="mt-2">
                      {setting.image2 ? (
                        <ImagePreview width={200} height={100} src={setting.image2} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image2 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image2} />
                    )
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="image2_subtitle"
                    name="image2_subtitle"
                    value={formik.values.image2_subtitle}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Short Description 2</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter Description"
                    id="image2_description"
                    name="image2_description"
                    value={formik.values.image2_description}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Image 3</Form.Label>
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
                  {setting && !formik.values.image3 ? (
                    <div className="mt-2">
                      {setting.image3 ? (
                        <ImagePreview width={200} height={100} src={setting.image3} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image3 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image3} />
                    )
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title 3</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="image3_subtitle"
                    name="image3_subtitle"
                    value={formik.values.image3_subtitle}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Short Description 3</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter Description"
                    id="image3_description"
                    name="image3_description"
                    value={formik.values.image3_description}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Image 4</Form.Label>
                  <div>
                    <Button variant="success" onClick={() => image4.current.click()}>
                      Upload Image
                    </Button>
                  </div>
                  <Form.Control
                    hidden
                    ref={image4}
                    name="image4"
                    type="file"
                    accept="image/*"
                    onChange={(e) => formik.setFieldValue('image4', e.currentTarget.files[0])}
                  />{' '}
                  {setting && !formik.values.image4 ? (
                    <div className="mt-2">
                      {setting.image4 ? (
                        <ImagePreview width={200} height={100} src={setting.image4} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image4 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image4} />
                    )
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title 4</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    id="image4_subtitle"
                    name="image4_subtitle"
                    value={formik.values.image4_subtitle}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Short Description 4</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    placeholder="Enter Description"
                    id="image4_description"
                    name="image4_description"
                    value={formik.values.image4_description}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="p-2 mb-5">
          <Card.Body>
            <Row className="my-3">
              <Form.Group as={Col}>
                <Form.Label>Achivement Title</Form.Label>
                <Form.Control
                  type="text"
                  id="achivement_title"
                  name="achivement_title"
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  value={formik.values.achivement_title}
                  // isInvalid={formik.errors.achivement_title ? true : false}
                  // isValid={formik.dirty && !formik.errors.achivement_title ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Achivement Description</Form.Label>
                <TextEditor
                  value={formik.values.achivement_description}
                  onChange={(value) => formik.setFieldValue('achivement_description', value)}
                />
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>
        <Card className="p-2 mb-5">
          <Card.Body>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Facebook URL</Form.Label>
                <Form.Control
                  type="text"
                  id="facebook_url"
                  name="facebook_url"
                  placeholder="Enter Facebook URL"
                  value={formik.values.facebook_url}
                  onChange={formik.handleChange}
                  // isInvalid={formik.errors. facebook_url? true : false}
                  // isValid={formik.dirty && !formik.errors.facebook_url ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Twitter URL</Form.Label>
                <Form.Control
                  type="text"
                  id="twitter_url"
                  name="twitter_url"
                  placeholder="Enter Twitter URL"
                  value={formik.values.twitter_url}
                  onChange={formik.handleChange}
                  //isInvalid={formik.errors.twitter_url ? true : false}
                  //isValid={formik.dirty && !formik.errors.twitter_url ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Instagram URL</Form.Label>
                <Form.Control
                  type="text"
                  id="instagram_url"
                  name="instagram_url"
                  placeholder="Enter Instagram URL"
                  value={formik.values.instagram_url}
                  onChange={formik.handleChange}
                  // isInvalid={formik.errors.instagram_url ? true : false}
                  // isValid={formik.dirty && !formik.errors.instagram_url ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>LinkdIn URL</Form.Label>
                <Form.Control
                  type="text"
                  id="linkedin_url"
                  name="linkedin_url"
                  placeholder="Enter LinkdIn URL"
                  value={formik.values.linkedin_url}
                  onChange={formik.handleChange}
                  //isInvalid={formik.errors.linkedin_url ? true : false}
                  //isValid={formik.dirty && !formik.errors.linkedin_url ? true : false}
                />
              </Form.Group>
            </Row>
            <Row className="my-3">
              <Form.Group as={Col}>
                <Form.Label>Helpline Text</Form.Label>
                <Form.Control
                  type="text"
                  id="helpline_text"
                  name="helpline_text"
                  placeholder="Enter Mobile number"
                  value={formik.values.helpline_text}
                  onChange={formik.handleChange}
                  // isInvalid={formik.errors.helpline_text ? true : false}
                  // isValid={formik.dirty && !formik.errors.helpline_text ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Helpline Number</Form.Label>
                <Form.Control
                  type="text"
                  id="helpline_no"
                  name="helpline_no"
                  placeholder="Enter Mobile number"
                  value={formik.values.helpline_no}
                  onChange={formik.handleChange}
                  //isInvalid={formik.errors.helpline_no ? true : false}
                  //isValid={formik.dirty && !formik.errors.helpline_no ? true : false}
                />
              </Form.Group>
              <Form.Group as={Col} className="outline-light">
                <Form.Label>Footer Logo</Form.Label>
                <div>
                  <Button variant="success" onClick={() => footer_logo.current.click()}>
                    Upload Footer Logo
                  </Button>
                </div>
                <Form.Control
                  hidden
                  ref={footer_logo}
                  name="footer_logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => formik.setFieldValue('footer_logo', e.currentTarget.files[0])}
                />
                {setting && !formik.values.footer_logo ? (
                  <div className="mt-2">
                    {setting.footer_logo ? (
                      <ImagePreview
                        width={200}
                        height={100}
                        src={setting.footer_logo}
                        alt="Footer Logo"
                      />
                    ) : null}
                  </div>
                ) : (
                  formik.values.footer_logo && (
                    <ImageFilePreview width={200} height={100} file={formik.values.footer_logo} />
                  )
                )}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Google Feedback Form URL</Form.Label>
                <Form.Control
                  type="text"
                  id="google_form_link"
                  name="google_form_link"
                  placeholder="Enter Google Feedback Form URL"
                  value={formik.values.google_form_link}
                  onChange={formik.handleChange}
                  //isInvalid={formik.errors.google_form_link ? true : false}
                  //isValid={formik.dirty && !formik.errors.google_form_link ? true : false}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    className="mx-2 my-2 px-5 float-end btn-block"
                    variant="success"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </>
  )
}
export default HomePage
