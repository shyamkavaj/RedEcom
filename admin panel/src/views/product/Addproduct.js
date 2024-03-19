import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  //   CFormCheck,
  CFormInput,
  //   CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useDispatch } from 'react-redux';

import { addProduct } from '../../RTK/Slice/ProductSlice'

const AddProduct = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    dispatch(addProduct(productdetail))
    console.log("product detail ", productdetail)
  }
  const initialvalues = {
    name: "",
    price: "",
    description: "",
    images: [],
    subcateId: "",
    categ: "",
  };
  const [productdetail, setProductdetail] = useState(initialvalues);
  const handleChange = (e) => {
    if (e.target.name === 'images') {
      // Convert file list to array and update images state
      setProductdetail({ ...productdetail, [e.target.name]: Array.from(e.target.files) });
    } else {
      // Update other form fields
      setProductdetail({ ...productdetail, [e.target.name]: e.target.value });
    }
  };
  return (
    <CForm className="row g-3 flex justify-center" validated={validated} onSubmit={handleSubmit}>
      <CRow style={{ 'marginTop': '10px' }}>
        <CCol md={4} lg={6} style={{ 'marginBottom': '6px' }} >
          <CFormInput
            type="text"
            id="validationDefault01"
            label="Product name"
            defaultValue="Mark"
            name='name'
            value={productdetail.name}
            onChange={handleChange}
            required
          />
        </CCol>
        <CCol md={6} style={{ 'marginBottom': '6px' }}>
          <CFormLabel htmlFor="validationDefaultUsername">Upload Photos</CFormLabel>
          <CFormInput
            type="file"
            id="validationTextarea"
            feedbackInvalid="Example invalid form file feedback"
            name='images'
            onChange={handleChange}
            aria-label="file example"
            required multiple
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={2} lg={4} style={{ 'marginBottom': '6px' }}>
          <CFormLabel htmlFor="validationDefaultUsername">Price</CFormLabel>
          <CInputGroup>
            <CInputGroupText id="inputGroupPrepend02">₹</CInputGroupText>
            <CFormInput
              type="number"
              id="validationDefaultUsername"
              defaultValue=""
              name='price'
              value={productdetail.price}
              onChange={handleChange}
              aria-describedby="inputGroupPrepend02"
              required
            />
          </CInputGroup>
        </CCol>
        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormSelect id="validationDefault04" label="Category" name='subcateId' value={productdetail.subcateId} onChange={handleChange}>
            <option disabled>Choose...</option>
            <option value={1}>Men</option>
            <option value={2}>Women</option>
            <option value={3}>boy</option>
            <option value={4}>girl</option>
            <option value={5}>child</option>
          </CFormSelect>
        </CCol>
        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormSelect id="validationDefault04" label="Sub-Category" name='categ' value={productdetail.categ} onChange={handleChange}>
            <option disabled>Choose...</option>
            <option value={1}>Shirt</option>
            <option value={2}>T-Shirt</option>
            <option value={3}>Jeans</option>
            <option value={4}>Shoes</option>
            <option value={5}>Bags</option>
            <option value={5}>Watches</option>
          </CFormSelect>
        </CCol>
        <CCol md={12} style={{ 'marginBottom': '6px' }}>
          {/* <CFormInput type="text" id="validationDefault03" label="Description" required /> */}
          <CFormTextarea type="text" rows={6} id="productvalidation" label="Description" name='description' value={productdetail.description} onChange={handleChange} required />
        </CCol>
      </CRow>

      <CCol xs={12} style={{ 'marginBottom': '6px' }}>
        <CButton color="primary" type="submit" onSubmit={handleSubmit}>
          Add Product
        </CButton>
      </CCol>
    </CForm>
  )
}

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add </strong> <small>Product</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/validation#browser-defaults">{AddProduct()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
