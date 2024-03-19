import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ImageFilePreview from 'src/components/ImageFilePreview'
import ImagePreview from 'src/components/ImagePreview'
import ShowError from 'src/errors/ShowError'
import { createUser, updateUser } from 'src/slices/manageUsersSlice'
import { getAllCityByState, getAllState } from 'src/slices/subAdminSlice'

const ManageUserModel = ({ modalData, onHide }) => {
  const Aadharcard = useRef()
  const Pancard = useRef()
  const ProfilePicture = useRef()

  const { users, error } = useSelector((state) => state.manageUsers)
  const { states, citys } = useSelector((state) => state.subAdmin)

  const partners = users.filter((user) => user.role === 'Partner')

  const dispatch = useDispatch()

  const onStateChange = (id) => {
    dispatch(getAllCityByState(id))
  }

  useEffect(() => {
    dispatch(getAllState())
  }, [])

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validateMobileNumber = Yup.object({
    // mobile_number: Yup.string()
    //   .required('Mobile number is Required')
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .min(10, 'Add 10 digit mobile number')
    //   .max(10, 'Add 10 digit mobile number'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Please enter your email address')
      .max(70),
  })

  const addData = async (values) => {
    if (!modalData) {
      await dispatch(createUser(values))
      if (!error) {
        onHide()
      }
    } else {
      await dispatch(updateUser(values))
      onHide()
    }
  }

  const formik = useFormik({
    initialValues: {
      id: (modalData && modalData?.id) || undefined,
      name: (modalData && modalData?.name) || '',
      email: (modalData && modalData?.email) || '',
      mobile_number: (modalData && modalData?.mobile_number) || '',
      state: (modalData && modalData?.state) || '',
      city: (modalData && modalData?.city) || '',
      address1: (modalData && modalData?.address1) || '',
      partner_id: (modalData && modalData?.partner_id) || undefined,
      partner_name: (modalData && modalData?.partner_name) || '',
      aadhaar_picture: '',
      pancard_picture: '',
      profile_picture: '',
      role: 'Customer',
    },
    validationSchema: validateMobileNumber,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addData(values)
      resetForm({})
      setSubmitting(false)
    },
  })

  const statePartners = partners?.filter((p) => {
    if (modalData?.state) {
      return p?.state === modalData?.state?.toUpperCase()
    } else {
      return p
    }
  })

  return (
    <>
      <Row>
        <Col md={12}>
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Name"
                    //isInvalid={formik.errors.name ? true : false}
                    // isValid={formik.dirty && !formik.errors.name ? true : false}
                    disabled={modalData ? true : false}
                  />
                  <ShowError>{formik.errors.name}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Email Address"
                    //isInvalid={formik.errors.email ? true : false}
                    //isValid={formik.dirty && !formik.errors.email ? true : false}
                    disabled={modalData ? true : false}
                  />
                  <ShowError>{formik.errors.email}</ShowError>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label> Mobile Number</Form.Label>
                  <Form.Control
                    id="mobile_number"
                    type="text"
                    name="mobile_number"
                    onChange={formik.handleChange}
                    value={formik.values.mobile_number}
                    placeholder="Mobile Number"
                    //isInvalid={formik.errors.mobile_number ? true : false}
                    //isValid={formik.dirty && !formik.errors.mobile_number ? true : false}
                    disabled={modalData ? true : false}
                  />
                  {formik.touched.mobile_number && formik.errors.mobile_number && (
                    <ShowError>{formik.errors.mobile_number}</ShowError>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  {modalData ? (
                    <Form.Control
                      id="state"
                      type="text"
                      name="state"
                      onChange={formik.handleChange}
                      value={formik.values.state}
                      placeholder="State"
                      //isInvalid={formik.errors.state ? true : false}
                      //isValid={formik.dirty && !formik.errors.state ? true : false}
                      disabled={modalData ? true : false}
                    />
                  ) : (
                    <Form.Select
                      id="state"
                      name="state"
                      className="form-control"
                      onChange={(e) => {
                        formik.handleChange(e)
                        onStateChange(e.currentTarget.value)
                      }}
                      value={formik.values.state}
                    >
                      <option disabled>Select State</option>
                      {states.map((s) => {
                        return (
                          <option value={s.id} key={s.id}>
                            {s.name}
                          </option>
                        )
                      })}
                    </Form.Select>
                  )}
                  <ShowError>{formik.errors.state}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> City</Form.Label>
                  {modalData ? (
                    <Form.Control
                      id="city"
                      type="text"
                      name="city"
                      onChange={formik.handleChange}
                      value={formik.values.city}
                      placeholder="City"
                      //isInvalid={formik.errors.city ? true : false}
                      //isValid={formik.dirty && !formik.errors.city ? true : false}
                      disabled={modalData ? true : false}
                    />
                  ) : (
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
                          )
                        })}
                    </Form.Select>
                  )}

                  <ShowError>{formik.errors.city}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Address</Form.Label>
                  <Form.Control
                    id="address1"
                    type="text"
                    name="address1"
                    onChange={formik.handleChange}
                    value={formik.values.address1}
                    placeholder="Address 1"
                    //isInvalid={formik.errors.address1 ? true : false}
                    //isValid={formik.dirty && !formik.errors.address1 ? true : false}
                    disabled={modalData ? true : false}
                  />
                  <ShowError>{formik.errors.address1}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Aadhar Card</Form.Label>
                  {/* <div>
                     <Button variant='success' onClick={() => Aadharcard.current.click()}
                         Upload Image
                    </Button> 
                     </div> */}
                  {modalData && !formik.values.aadhaar_picture ? (
                    <div className="mt-2">
                      {modalData.aadhaar_picture ? (
                        <ImagePreview
                          width={200}
                          height={100}
                          src={modalData.aadhaar_picture}
                          alt="aadhaar_picture"
                        />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.aadhaar_picture && (
                      <ImageFilePreview
                        width={200}
                        height={100}
                        file={formik.values.aadhaar_picture}
                      />
                    )
                  )}
                  <Form.Control
                    hidden
                    ref={Aadharcard}
                    name="aadhaar_picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      formik.setFieldValue('aadhaar_picture', e.currentTarget.files[0])
                    }
                    disabled
                  />
                  <ShowError>{formik.errors.aadhaar_picture}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>PanCard</Form.Label>
                  {/* <div>
                                    <Button variant='success' onClick={() => Pancard.current.click()}>
                                        Upload Image
                                    </Button>
                                </div> */}
                  {modalData && !formik.values.pancard_picture ? (
                    <div className="mt-2">
                      {modalData.pancard_picture ? (
                        <ImagePreview
                          width={200}
                          height={100}
                          src={modalData.pancard_picture}
                          alt="pancard_picture"
                        />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.pancard_picture && (
                      <ImageFilePreview
                        width={200}
                        height={100}
                        file={formik.values.pancard_picture}
                      />
                    )
                  )}
                  <Form.Control
                    hidden
                    ref={Pancard}
                    name="pancard_picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      formik.setFieldValue('pancard_picture', e.currentTarget.files[0])
                    }
                    disabled
                  />
                  <ShowError>{formik.errors.pancard_picture}</ShowError>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  {/* <div>
                                    <Button variant='success' onClick={() => Aadharcard.current.click()}>
                                        Upload Image
                                    </Button>
                                </div> */}
                  {modalData && !formik.values.profile_picture ? (
                    <div className="mt-2">
                      {modalData.profile_picture ? (
                        <ImagePreview
                          width={200}
                          height={100}
                          src={modalData.profile_picture}
                          alt="profile_picture"
                        />
                      ) : null}
                    </div>
                  ) : (
                    formik.values.profile_picture && (
                      <ImageFilePreview
                        width={200}
                        height={100}
                        file={formik.values.profile_picture}
                      />
                    )
                  )}
                  <Form.Control
                    hidden
                    ref={ProfilePicture}
                    name="profile_picture"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      formik.setFieldValue('profile_picture', e.currentTarget.files[0])
                    }
                    disabled
                  />
                  <ShowError>{formik.errors.aadhaar_picture}</ShowError>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label> Partner</Form.Label>
                  <Form.Select
                    id="partner_id"
                    type="text"
                    name="partner_id"
                    onChange={formik.handleChange}
                    value={formik.values.partner_id}
                  >
                    <option>Select Partner</option>
                    {statePartners &&
                      statePartners.map((partner, index) => {
                        const { id, name } = partner
                        return (
                          <option value={id} key={index}>
                            {name}
                          </option>
                        )
                      })}
                  </Form.Select>
                  <ShowError>{formik.errors.partner_id}</ShowError>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Col md={12}>
                <Button
                  variant="success"
                  type="submit"
                  // disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
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

export default ManageUserModel
