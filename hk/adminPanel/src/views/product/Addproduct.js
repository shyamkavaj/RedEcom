import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode'

import { addProduct } from '../../RTK/slice/productSlice'
// import { getAllCate } from 'src/RTK/slice/cateSlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { subcate } = useSelector(state => state.subcate);
  const { categories } = useSelector(state => state.category);

  const [subcategory, setSubcategory] = useState([]);
  const inputFile = useRef(null);
  const { error } = useSelector(state => state.product)
  // console.log("error ",error)
  const handleSelect = (event) => {
    // console.log("id is ", event.target.value)

    const sub = subcate.filter((item) => item.category_id === parseInt(event.target.value));
    // console.log("sub ", sub)
    setSubcategory(sub)
  }
  const [TokenData,setTokendata] = useState(jwtDecode(localStorage.getItem('tokenAuth')))
  // console.log("Token data is ",TokenData)
  const initialvalues = {
    name: "",
    price: "",
    description: "",
    image: [],
    subcateId: "",
    categ: "",
    place: "",
    uploadby: TokenData.email
  };


  const productSchema = Yup.object({
    name: Yup.string().min(3, 'enter proper product name').required('Enter product name'),
    price: Yup.number().min(1, 'value must greater than 0').required('Enter product price'),
    description: Yup.string().min(3, 'enter proper product description').required('Enter product description'),
    subcateId: Yup.string().required('select sub-category'),
    categ: Yup.string().required('select category'),
    image: Yup.mixed().required('select product image'),
    // place:
  })

  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: initialvalues,
    validationSchema: productSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(addProduct(values));
      setSubmitting(false);
      inputFile.current.value = "";
      resetForm();
    },

  })

  return (
    <CForm className="row g-3 flex justify-center" onSubmit={handleSubmit} encType='multipart/form-data' >
      <CRow style={{ 'marginTop': '10px' }}>
        <CCol md={6} style={{ 'marginBottom': '6px' }} >
          <CFormInput
            type="text"
            id="validationDefault01"
            label="Product name..."
            name='name'
            placeholder='Enter Product Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            required
          />
          {errors.name && touched.name ? (
            <p className="form-error text-danger">{errors.name}</p>
          ) : null}
        </CCol>
        <CCol md={6} style={{ 'marginBottom': '6px' }}>
          <CFormLabel htmlFor="validationDefaultUsername">Upload Photos</CFormLabel>
          <CFormInput
            type="file"
            id="validationTextarea"
            name='image'
            // value={values.image}
            onChange={(event) => {
              setFieldValue("image", event.currentTarget.files)
            }
            }
            ref={inputFile}
            // onBlur={handleBlur}
            aria-label="file example"
            required multiple
          />
        </CCol>
        {errors.image && touched.image ? (
          <p className="form-error text-danger">{errors.image}</p>
        ) : null}
      </CRow>
      <CRow>
        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormLabel htmlFor="validationDefaultUsername">Price</CFormLabel>
          <CInputGroup hasValidation>
            <CInputGroupText id="inputGroupPrepend02">₹</CInputGroupText>
            <CFormInput
              type="number"
              id="validationDefaultUsername"
              name='price'
              onChange={handleChange}
              value={values.price}
              onBlur={handleBlur}
              placeholder='Enter Price'
              aria-describedby="inputGroupPrepend02"
              // required
              min="1" // Set minimum value to 0
            />
          </CInputGroup>
          {errors.price && touched.price ? (
            <p className="form-error text-danger">{errors.price}</p>
          ) : null}
        </CCol>

        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormSelect id="validationDefault04" label="Category" name='categ' value={values.categ} onBlur={handleBlur}
            onChange={(event) => {
              handleSelect(event)
              handleChange(event)
            }} required>
            <option disabled selected value="">Choose Category...</option>
            {
              categories?.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))
            }
          </CFormSelect>
          {errors.categ && touched.categ ? (
            <p className="form-error text-danger">{errors.categ}</p>
          ) : null}
        </CCol>
        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormSelect id="validationDefault04" label="Sub-Category" name='subcateId' value={values.subcateId} onBlur={handleBlur} onChange={handleChange} required>
            <option selected disabled value="">Choose Sub Category...</option>
            {
              subcategory?.map((item) => (
                <option key={item.id} value={item.id}>{item.subcategory_name}</option>
              ))
            }

          </CFormSelect>
          {errors.subcateId && touched.subcateId ? (
            <p className="form-error text-danger">{errors.subcateId}</p>
          ) : null}
        </CCol>
        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormSelect id="validationDefault04" label="Place" name='place' value={values.place} defaultValue={"Regular"} onBlur={handleBlur} onChange={handleChange} required>
            <option selected disabled value="">Select Place...</option>
            <option value={"Regular"}>Regular</option>
            <option value={"Hot deal"}>Hot deal</option>
            <option value={"Main carousel"}>Main Carousel</option>
            <option value={"Week deal"}>Week deal</option>

          </CFormSelect>
        </CCol>
        <CCol md={4} style={{ 'marginBottom': '6px' }}>
          <CFormLabel htmlFor="validationDefaultUsername">Upload By</CFormLabel>
          <CInputGroup hasValidation>
            {/* <CInputGroupText id="inputGroupPrepend02">₹</CInputGroupText> */}
            <CFormInput
              type="text"
              id="validationDefaultUsername"
              // name='price'
              onChange={handleChange}
              value={TokenData.email}
              disabled
              onBlur={handleBlur}
              // placeholder='Enter Price'
              aria-describedby="inputGroupPrepend02"
              // required
               // Set minimum value to 0
            />
          </CInputGroup>
          {errors.uploadby && touched.uploadby ? (
            <p className="form-error text-danger">{errors.price}</p>
          ) : null}
        </CCol>
        <CCol md={12} style={{ 'marginBottom': '6px' }}>
          {/* <CFormInput type="text" id="validationDefault03" label="Description" required /> */}
          <CFormTextarea type="text" rows={6} id="productvalidation" label="Description" placeholder='Enter Product Description...' name='description' value={values.description} onBlur={handleBlur} onChange={handleChange} required />
          <CFormFeedback invalid>{errors.description && touched.description}</CFormFeedback>
        </CCol>
        <CCol xs={12} style={{ 'marginBottom': '6px' }}>
          <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" onSubmit={handleSubmit}>
            Add Product
          </CButton>
        </CCol>
      </CRow>

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