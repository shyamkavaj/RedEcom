import { useFormik } from 'formik'
import * as Yup from 'yup'
import ShowError from 'src/errors/ShowError'
import React, { useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createSubAdmin, fetchOccupation, getAllCityByState, getAllState } from 'src/slices/subAdminSlice'
import { fetchProviderService } from 'src/slices/providerServiceSlice'

const SubAdminModal = ({ modalData, onHide }) => {
    const { states, citys, occupations } = useSelector(state => state.subAdmin);
    const { providerServices } = useSelector((state) => state.providerService)
    const dispatch = useDispatch()
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validateMobileNumber = Yup.object({
        mobile_number: Yup.string()
            .required('Mobile number is Required')
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, 'Add 10 digit mobile number')
            .max(10, 'Add 10 digit mobile number'),
    })

    useEffect(() => {
        dispatch(getAllState())
        dispatch(fetchOccupation())
        dispatch(fetchProviderService())
    }, [dispatch])
    const onStateChange = id => {
        dispatch(getAllCityByState(id));
    };
    const formik = useFormik({
        initialValues: {
            id: (modalData && modalData?.id) || undefined,
            service_id: (modalData && modalData?.service_id) || undefined,
            name: (modalData && modalData?.name) || "",
            mobile_number: (modalData && modalData?.mobile_number) || "",
            email: (modalData && modalData?.email) || "",
            password: (modalData && modalData?.password) || "",
            state: (modalData && modalData?.state) || "",
            city: (modalData && modalData?.city) || "",
            occupation_id: (modalData && modalData?.occupation_id) || "",
        },
        validationSchema: validateMobileNumber,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            if (!modalData) {
                dispatch(createSubAdmin(values))
                onHide()
            } else {
                // dispatch((values))
                onHide()
            }
            resetForm({})
            setSubmitting(false)
        }
    })
    return (
        <>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label> Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder='Enter Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    <ShowError>{formik.errors.name}</ShowError>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobile_number"
                                        placeholder='Enter Mobile Number'
                                        onChange={formik.handleChange}
                                        value={formik.values.mobile_number}
                                    />
                                    {formik.touched.mobile_number && formik.errors.mobile_number && (
                                        <ShowError>{formik.errors.mobile_number}</ShowError>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label> Service</Form.Label>
                                    <Form.Select
                                        id="service_id"
                                        name="service_id"
                                        onChange={formik.handleChange}
                                        value={formik.values.service_id}
                                    >
                                        <option>Select Service</option>
                                        {providerServices.map((providerService) => {
                                            const { id, title } = providerService
                                            return (
                                                <option value={id} key={id}>
                                                    {title}{' '}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                    <ShowError>{formik.errors.service_id}</ShowError>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    id="state"
                                    name="state"
                                    className="form-control"
                                    onChange={e => {
                                        formik.handleChange(e);
                                        onStateChange(e.currentTarget.value);
                                    }}
                                    value={formik.values.state}
                                >
                                    <option disabled>Select State</option>
                                    {states.map(s => {
                                        return (
                                            <option value={s.id} key={s.id}>
                                                {s.name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                                <ShowError>{formik.errors.state}</ShowError>
                            </Col>
                            <Col md={4}>
                                <Form.Label>City</Form.Label>
                                <Form.Select
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    disabled={formik.values.state ? false : true}
                                >
                                    <option disabled>Select City</option>
                                    {citys &&
                                        citys.map((c, index) => {
                                            return (
                                                <option value={c.id} key={index}>
                                                    {c.city}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                                <ShowError>{formik.errors.city}</ShowError>
                            </Col>
                            <Col md={4}>
                                <Form.Label>Occupation</Form.Label>
                                <Form.Select
                                    id="occupation_id"
                                    name="occupation_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.occupation_id}
                                    aria-label="Default select example"
                                >
                                    <option disabled>Select occupation</option>
                                    {occupations.map((occupation, index) => {
                                        const { id, name } = occupation
                                        return (
                                            <option value={id} key={index}>{name}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder='Enter Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    <ShowError>{formik.errors.email}</ShowError>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder='Enter password'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    <ShowError>{formik.errors.password}</ShowError>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col md={12}>
                                <Button variant='success' type='submit'
                                //disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
                                >
                                    {!modalData ? "Submit" : "Update"}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default SubAdminModal