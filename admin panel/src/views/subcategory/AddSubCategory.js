import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
} from '@coreui/react';
import { DocsExample } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { BadgeX, Eye, SquarePen } from 'lucide-react';
import { addSubcate, deleteSubCate, getAllSubCat } from 'src/RTK/slice/subcateSlice';
import { getAllCate } from 'src/RTK/slice/cateSlice';


const Validation = () => {
    const { categories } = useSelector(state => state.category)
    const { subcate } = useSelector(state => state.subcate)
    // console.log("all subcategory ", subcate)


    const initialValues = {
        category_id: '',
        subcategory_name: '',
    }
    const subcategorySchema = Yup.object({
        category_id: Yup.string(),
        subcategory_name: Yup.string().min(2).max(50).required('Plaese enter your SubCategory name')
    });
    const dispatch = useDispatch();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: subcategorySchema,
        onSubmit: async (values, { resetForm }) => {
            // console.log('Form submitted with values:', values);
            await dispatch(addSubcate(values))
            // await dispatch(getAllCate())
            dispatch(getAllSubCat())
            resetForm();
        },
    });

    const handleDelete = (id) => {
        console.log("id", id)
        dispatch(deleteSubCate(id))
        // dispatch(getAllSubCat())
        // dispatch(getCate(id))
        // dispatch(getAllCate())
    }

    return (

        <>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
                <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Category</CFormLabel>
                    <CFormSelect type="text" id="validationDefault04" required
                        name='category_id'
                        value={values.category_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option disabled selected value="">Choose Category...</option>
                        {
                            categories?.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </CFormSelect>
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="validationDefault01">Sub-Category</CFormLabel>
                    <CFormInput type="text" id="validationDefault01" required
                        name='subcategory_name'
                        value={values.subcategory_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.subcategory_name && touched.subcategory_name ? (
                        <p className='form-error text-danger'>{errors.subcategory_name}</p>
                    ) : null}
                </CCol>
                <CCol xs={12}>
                    <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" className=' mb-3'
                        onClick={handleSubmit}>
                        Add Sub Category
                    </CButton>
                </CCol>
            </CForm>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage</strong> <small>Sub Category</small>
                        </CCardHeader>
                        <CCardBody>
                            <DocsExample href="views\category">
                                <CTable className='table table-hover' responsive>
                                    <CTableHead >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">Index</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Sub-Category</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody style={{ overflow: 'auto', height: '100%' }}>
                                        {
                                            subcate?.map((item, index) => {
                                                {/* dispatch(getCate(item.category_id))
                                                const {category} = useSelector(state => state.subcate) */}
                                                console.log("item ",item?.category)
                                                return (
                                                    <CTableRow key={index}>
                                                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                        <CTableDataCell>{item?.category?.name}</CTableDataCell>
                                                        <CTableDataCell>{item.subcategory_name}</CTableDataCell>
                                                        <CTableDataCell>
                                                            <div style={{ display: 'flex', flexWrap: 'nowrap' }} >
                                                                <Eye color="#1f99e5" strokeWidth={1.5} size={24} className='sm:mr-3' />
                                                                <SquarePen color="#1fe5b3" strokeWidth={1.5} size={24} className='sm:mr-3' />
                                                                <BadgeX color="#e51f1f" strokeWidth={1.5} size={24} onClick={() => {
                                                                    handleDelete(item?.id)
                                                                }
                                                                } />
                                                            </div>
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                )

                                            })
                                        }
                                        {/* <CTableDataCell>Shirt</CTableDataCell> */}

                                        {/* {
                                            categories?.map((category, index) => {
                                                return (
                                                    <CTableRow key={index}>
                                                        <CTableHeaderCell scope="row" >{index + 1}</CTableHeaderCell>
                                                        <CTableDataCell >{category?.name}</CTableDataCell>

                                                        <CTableDataCell >
                                                            <div style={{ display: 'flex', flexWrap: 'nowrap' }} >
                                                                <Eye color="#1f99e5" strokeWidth={1.5} size={24} className='sm:mr-3' />
                                                                <SquarePen color="#1fe5b3" strokeWidth={1.5} size={24} className='sm:mr-3' />
                                                                <BadgeX color="#e51f1f" strokeWidth={1.5} size={24} className='sm:mr-3' onClick={() => {
                                                                    handleDelete(category?.id)
                                                                }} />
                                                                <Button>OK</Button>
                                                            </div>
                                                        </CTableDataCell>
                                                    </CTableRow>
                                                )
                                            })
                                        } */}
                                    </CTableBody>
                                </CTable>
                            </DocsExample>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default Validation;
