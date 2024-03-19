import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import ImagePreview from 'src/components/ImagePreview'
import { Col, Form, Row, Button } from 'react-bootstrap'
import ImageFilePreview from 'src/components/ImageFilePreview'
import { addSupporter, updateSupporter } from 'src/slices/supportersSlice'

const SupportersModal = ({ modalData, onHide }) => {
  const dispatch = useDispatch()
  const supporterImg = useRef()

  const addData = async (values) => {
    if (!modalData) {
      await dispatch(addSupporter(values))
      onHide()
    } else {
      await dispatch(updateSupporter(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      suppoter_name: (modalData && modalData?.suppoter_name) || '',
      suppoter: (modalData && modalData?.suppoter) || '',
      image: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Suppoter has been saved',
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
                  <Form.Label>Supporter Name</Form.Label>
                  <Form.Control
                    id="suppoter_name"
                    type="text"
                    name="suppoter_name"
                    onChange={formik.handleChange}
                    value={formik.values.suppoter_name}
                    //isInvalid={formik.errors.suppoter_name ? true : false}
                    // isValid={formik.dirty && !formik.errors.suppoter_name ? true : false}
                  />
                  <ShowError>{formik.errors.suppoter_name}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Supporter</Form.Label>
                  <Form.Select
                    id="suppoter"
                    name="suppoter"
                    onChange={formik.handleChange}
                    value={formik.values.suppoter}
                    aria-label="Default select example"
                    //isInvalid={formik.errors.suppoter ? true : false}
                    //isValid={formik.dirty && !formik.errors.suppoter ? true : false}
                  >
                    <option>Select Suppoter</option>
                    <option value="Investors">Investors</option>
                    <option value="Partners">Partners</option>
                    <option value="Advisors">Advisors</option>
                  </Form.Select>
                  <ShowError>{formik.errors.suppoter}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Supporter Image</Form.Label>
                <div>
                  <Button variant="success" onClick={() => supporterImg.current.click()}>
                    Supporter Image
                  </Button>
                </div>
                <Form.Control
                  hidden
                  ref={supporterImg}
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

export default SupportersModal
