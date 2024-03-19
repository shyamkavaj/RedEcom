import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { getUserBoardPage, updateUserBoardPage } from 'src/slices/userBoardPageSlice'
import { useDispatch, useSelector } from 'react-redux'
import ImageFilePreview from 'src/components/ImageFilePreview'
import ImagePreview from 'src/components/ImagePreview'
import Swal from 'sweetalert2'

const UserBoardPage = () => {
  const image = useRef()
  const image1 = useRef()
  const image2 = useRef()
  const image3 = useRef()

  const dispatch = useDispatch()
  const { userBoard } = useSelector((state) => state.userBoard)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: (userBoard && userBoard.id) || undefined,
      image: '',
      image1: '',
      image2: '',
      image3: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log('VALUES', values)
      dispatch(updateUserBoardPage(values))
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User Dashboard Page has been saved',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getUserBoardPage(1))
  }, [dispatch])

  return (
    <>
      <h3 className="maintitle">User Board Page</h3>
      <Col>
        <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Card className="p-2 mb-5">
            <Card.Body>
              <Row className="my-3">
                <Form.Group as={Col}>
                  <Form.Label>Top Image 1</Form.Label>
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
                  {userBoard && !formik.values.image ? (
                    <div className="mt-2">
                      {userBoard.image ? (
                        <ImagePreview width={200} height={100} src={userBoard.image} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image} />
                    )
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Top Image 2</Form.Label>
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
                  {userBoard && !formik.values.image1 ? (
                    <div className="mt-2">
                      {userBoard.image1 ? (
                        <ImagePreview width={200} height={100} src={userBoard.image1} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image1 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image1} />
                    )
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Top Image 3</Form.Label>
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
                  {userBoard && !formik.values.image2 ? (
                    <div className="mt-2">
                      {userBoard.image2 ? (
                        <ImagePreview width={200} height={100} src={userBoard.image2} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image2 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image2} />
                    )
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Top Image 4</Form.Label>
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
                  {userBoard && !formik.values.image3 ? (
                    <div className="mt-2">
                      {userBoard.image3 ? (
                        <ImagePreview width={200} height={100} src={userBoard.image3} alt="LOGO" />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.image3 && (
                      <ImageFilePreview width={200} height={100} file={formik.values.image3} />
                    )
                  )}
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
    </>
  )
}

export default UserBoardPage
