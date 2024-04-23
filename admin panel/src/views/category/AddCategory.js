import React, { useMemo } from 'react'
import { COLUMNS } from './columns'
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { useSelector } from 'react-redux'
import { DocsExample } from 'src/components'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCate } from 'src/RTK/slice/cateSlice';

const ManageProducts = () => {
  const { categories } = useSelector((state) => state.category)
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => categories, [categories])
  const { getTableProps, getTableBodyProps, headerGroups, page, state, setGlobalFilter, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, setPageSize } = useTable({
    columns,
    data,
  }, useGlobalFilter, usePagination)
  const { globalFilter, pageIndex, pageSize } = state
  const dispatch = useDispatch()
  const initialValues = {
    name: "",
  };

  const categorySchema = Yup.object({
    name: Yup.string().min(2, 'enter proper category name').max(50).required('Please enter your Category name'),
  });
  // const { globalFilter } = state

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: categorySchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      // console.log("hii")
      // console.log('Form submitted with values:', values);
      dispatch(addCate(values));
      resetForm();
      setSubmitting(false)
    },
  });
  return (
    <>
      <CForm className="row g-3 mb-3" onSubmit={handleSubmit} >
        <CCol md={4}>
          <CFormLabel htmlFor="validationDefault01">Category Name</CFormLabel>
          <CFormInput
            type="text"
            id="validationDefault01"
            required
            name='name'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter Category Name...'
          />

          {errors.name && touched.name ? (
            <p className="form-error text-danger">{errors.name}</p>
          ) : null}
        </CCol>
        <CCol xs={12}>
          <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" > 
            Add Category
          </CButton>
        </CCol>
      </CForm>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Manage </strong> <small>Category</small>
            </CCardHeader>
            <CCardBody >
              <DocsExample href="forms/validation#browser-defaults">
                <CFormLabel htmlFor="validationDefault01">Search Category</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationDefault01"
                  required
                  name="name"
                  value={globalFilter || ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                />
                <CTable className='table table-hover mt-3' responsive {...getTableProps()}>
                  <CTableHead >
                    {
                      headerGroups.map((headerGroup) => (
                        <CTableRow {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <CTableHeaderCell scope='col' {...column.getHeaderProps()} > {column.render('Header')}</CTableHeaderCell>
                          ))}
                        </CTableRow>
                      ))
                    }
                  </CTableHead>
                  <CTableBody {...getTableBodyProps()}>
                    {
                      page.map((row) => {
                        prepareRow(row)
                        return (
                          <CTableRow {...row.getRowProps()}>
                            {
                              row.cells.map((cell) => {
                                return (
                                  <CTableDataCell {...cell.getCellProps()}> {cell.render('Cell')}</CTableDataCell>
                                )
                              })
                            }
                          </CTableRow>
                        )
                      })
                    }
                  </CTableBody>
                </CTable>
                <CButton className=' mr-2' style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
                  Previous
                </CButton>
                <CButton className=' mr-2' style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </CButton>
                <span> page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
                <CFormSelect value={pageSize} size="lg" className="mb-3" aria-label="Large select example" onChange={e => {
                  setPageSize(Number(e.target.value))
                }}>
                  {[5, 10, 15].map(pageSize => (
                    <option key={pageSize} value={pageSize}>show{pageSize}</option>
                  ))}
                </CFormSelect>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )

}
export default ManageProducts
