import React from 'react'
import { useFormik } from 'formik';
import { Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const PartnerViewModal = ({ modalData }) => {

    const { providerServices } = useSelector((state) => state.providerService)
    const formik = useFormik({
        initialValues: {
            id: (modalData && modalData.id) || undefined,
            name: (modalData && modalData.name) || '',
            email: (modalData && modalData.email) || '',
            mobile_number: (modalData && modalData.mobile_number) || '',
            service_id: (modalData && modalData.service_id) || undefined,
        }
    })
    return (
        <>
            <Row>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            id="name"
                            type='text'
                            name='name'
                            value={formik.values.name}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            disabled
                            id="email"
                            type='text'
                            name='email'
                            value={formik.values.email}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                            id="mobile_number"
                            type='text'
                            name='mobile_number'
                            value={formik.values.mobile_number}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label> Service</Form.Label>
                        <Form.Select
                            disabled
                            id="service_id"
                            type="text"
                            name="service_id"
                            onChange={formik.handleChange}
                            value={formik.values.service_id}
                        >
                            {providerServices && providerServices.map((providerService) => {
                                const { title, id } = providerService
                                return <option value={id}>{title}</option>
                            })}

                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

export default PartnerViewModal