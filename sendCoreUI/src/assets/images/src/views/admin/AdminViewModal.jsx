import React from 'react'
import { Col, Row } from 'react-bootstrap'

const AdminViewModal = ({ modalData }) => {
    return (
        <>
            <Row>
                <Col md={4}>
                    <p>Name: {modalData && modalData.name}</p>
                </Col>
                <Col md={4}>
                    <p>Email: {modalData && modalData.email}</p>
                </Col>
                <Col md={4}>
                    <p>Mobile Number: {modalData && modalData.mobile_number}</p>
                </Col>
            </Row>
        </>
    )
}
export default AdminViewModal