import React, { useMemo, useEffect } from 'react';
import { COLUMNS } from './columns';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getAllProduct, getProductByEmail } from 'src/RTK/slice/productSlice';

const ManageProducts = () => {
    const user = jwtDecode(localStorage.getItem('tokenAuth')).email;
    const dispatch = useDispatch();
    const role = localStorage.getItem('role');

    const { products } = useSelector((state) => state.product);

    const columns = useMemo(() => COLUMNS, []);

    const data = useMemo(() => {
        // Filter products based on user
        return role == 'admin' ? products : products.filter((pro) => pro.uploadby === user);
    }, [products, user]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 } // Initial page index and size
        },
        useGlobalFilter,
        usePagination
    );

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Manage</strong> <small>Product</small>
                        </CCardHeader>
                        <CCardBody>
                            <div>
                                <CFormLabel htmlFor="validationDefault01">Search Product</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    required
                                    name="name"
                                    value={globalFilter || ''}
                                    onChange={e => setGlobalFilter(e.target.value)}
                                />
                            </div>
                            <CTable className='table table-hover mt-3' responsive {...getTableProps()}>
                                <CTableHead>
                                    {headerGroups.map((headerGroup) => (
                                        <CTableRow {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <CTableHeaderCell scope='col' {...column.getHeaderProps()}>{column.render('Header')}</CTableHeaderCell>
                                            ))}
                                        </CTableRow>
                                    ))}
                                </CTableHead>
                                <CTableBody {...getTableBodyProps()}>
                                    {page.map((row, i) => {
                                        prepareRow(row);
                                        return (
                                            <CTableRow {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <CTableDataCell {...cell.getCellProps()}>{cell.render('Cell')}</CTableDataCell>
                                                    );
                                                })}
                                            </CTableRow>
                                        );
                                    })}
                                </CTableBody>
                            </CTable>
                            <CButton className='mr-2' style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
                                Previous
                            </CButton>
                            <CButton className='mr-2' style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} onClick={() => nextPage()} disabled={!canNextPage}>
                                Next
                            </CButton>
                            <span> Page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
                            <CFormSelect value={pageSize} size="lg" className="mb-3" aria-label="Large select example" onChange={e => { setPageSize(Number(e.target.value)) }}>
                                {[5, 10, 15].map(pageSize => (<option key={pageSize} value={pageSize}>Show {pageSize}</option>))}
                            </CFormSelect>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default ManageProducts;
