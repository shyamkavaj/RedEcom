import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import ShowError from 'src/errors/ShowError'
import ImagePreview from 'src/components/ImagePreview'
import { Button, Col, Form, Row } from 'react-bootstrap'
import ImageFilePreview from 'src/components/ImageFilePreview'
import { addLegalService, updateLegalService } from "../../../slices/legalServiceSlice"
import Swal from 'sweetalert2'

const LegalServiceModal = ({ modalData, onHide }) => {
    const imageRef = useRef()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            id: (modalData && modalData.id) || undefined,
            title: (modalData && modalData.title) || "",
            image: ""
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            if (!modalData) {
                dispatch(addLegalService(values))
                onHide()
            } else {
                dispatch(updateLegalService(values))
                onHide()
            }
            resetForm({})
            setSubmitting(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Legal Service has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })

    return (<>
        <Row>
            <Col md={12}>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label> Image</Form.Label>
                                <div>
                                    <Button variant='success' onClick={() => imageRef.current.click()}>
                                        Upload Image
                                    </Button>
                                </div>
                                {modalData && !formik.values.image ? (
                                    <div className='mt-2'>
                                        {modalData.image ? (
                                            <ImagePreview width={200} height={100} src={modalData.image} alt='image' />
                                        ) : null}
                                    </div>
                                ) : (
                                    formik.values.image && (
                                        <ImageFilePreview width={200} height={100} file={formik.values.image} />
                                    )
                                )}
                                <Form.Control
                                    hidden
                                    ref={imageRef}
                                    name='image'
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) =>
                                        formik.setFieldValue('image', e.currentTarget.files[0])
                                    }

                                />
                                <ShowError>{formik.errors.image}</ShowError>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    id="title"
                                    type="text"
                                    name="title"
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                //isInvalid={formik.errors.title ? true : false}
                                //isValid={formik.dirty && !formik.errors.title ? true : false}
                                />
                                <ShowError>{formik.errors.title}</ShowError>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col md={12}>
                            <Button variant='success' type='submit'
                                disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                            >
                                {!modalData ? "Submit" : "Update"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </>)
}

export default LegalServiceModal