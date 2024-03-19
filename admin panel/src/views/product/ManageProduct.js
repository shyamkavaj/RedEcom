import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
import { DocsExample } from 'src/components'
import edit from '../../assets/images/lorenzo-moschi-XG391m6rH_8-unsplash.jpg'
// import { Pencil } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { BadgeX, Eye } from 'lucide-react';

const ManageProduct = () => {

    return (
        <CTable className='table table-hover' responsive>
            <CTableHead >
                <CTableRow>
                    <CTableHeaderCell scope="col" className=' col-1'>Index</CTableHeaderCell>
                    <CTableHeaderCell scope="col" >Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col" >Price</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className=' col-4'>Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className=' col-3'>Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col" >Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow ali>
                    <CTableHeaderCell scope="row" >1</CTableHeaderCell>
                    <CTableDataCell >Mobile Phone</CTableDataCell>
                    <CTableDataCell >20000</CTableDataCell>
                    <CTableDataCell >
                    This here is some placeholder text, intended to take up quite a bit of vertical space, to demonsCTableRowate how the vertical alignment works in the preceding cells.</CTableDataCell>
                    <CTableDataCell><img src={edit} className='img-thumbnail' height="100px" width="100px" /></CTableDataCell>
                    <CTableDataCell>
                        {/* <div > */}
                            <Eye color="#1f99e5" strokeWidth={1.5} />
                            <SquarePen color="#1fe5b3" strokeWidth={1.5} />
                            <BadgeX color="#e51f1f" strokeWidth={1.5} />
                        {/* </div> */}
                    </CTableDataCell>
                </CTableRow>
                {/* <CTableRow >
                    <CTableHeaderCell scope="row">Primary</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow >
                    <CTableHeaderCell scope="row">Secondary</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow style={{ "background": "red" }}>
                    <CTableHeaderCell scope="row">Success</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow >
                    <CTableHeaderCell scope="row">Danger</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow color="warning">
                    <CTableHeaderCell scope="row">Warning</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow color="info">
                    <CTableHeaderCell scope="row">Info</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow color="light">
                    <CTableHeaderCell scope="row">Light</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow>
                <CTableRow color="dark">
                    <CTableHeaderCell scope="row">Dark</CTableHeaderCell>
                    <CTableDataCell>Cell</CTableDataCell>
                    <CTableDataCell>Cell</CTableDataCell>
                </CTableRow> */}
            </CTableBody>
        </CTable>
        // <CCol xs={12}>
        //     <CCard className="mb-4">
        //         <CCardHeader>
        //             <strong>React Table</strong> <small>Vertical alignment</small>
        //         </CCardHeader>
        //         <CCardBody>
        //             <p className="text-medium-emphasis small">
        //                 Table cells of <code>&lt;CTableHead&gt;</code> are always vertical aligned to the
        //                 bottom. Table cells in <code>&lt;CTableBody&gt;</code> inherit their alignment from{' '}
        //                 <code>&lt;CTable&gt;</code> and are aligned to the the top by default. Use the align
        //                 property to re-align where needed.
        //             </p>
        //             <DocsExample href="components/table#vertical-alignment">
        //                 <CTable align="middle" responsive>
        //                     <CTableHead>
        //                         <CTableRow>
        //                             <CTableHeaderCell scope="col" className="w-25">
        //                                 Heading 1
        //                             </CTableHeaderCell>
        //                             <CTableHeaderCell scope="col" className="w-25">
        //                                 Heading 2
        //                             </CTableHeaderCell>
        //                             <CTableHeaderCell scope="col" className="w-25">
        //                                 Heading 3
        //                             </CTableHeaderCell>
        //                             <CTableHeaderCell scope="col" className="w-25">
        //                                 Heading 4
        //                             </CTableHeaderCell>
        //                         </CTableRow>
        //                     </CTableHead>
        //                     <CTableBody>
        //                         <CTableRow>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: middle;</code> from the table
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: middle;</code> from the table
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: middle;</code> from the table
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This here is some placeholder text, intended to take up quite a bit of
        //                                 vertical space, to demonsCTableRowate how the vertical alignment works in the
        //                                 preceding cells.
        //                             </CTableDataCell>
        //                         </CTableRow>
        //                         <CTableRow align="bottom">
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: bottom;</code> from the table row
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: bottom;</code> from the table row
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: bottom;</code> from the table row
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This here is some placeholder text, intended to take up quite a bit of
        //                                 vertical space, to demonsCTableRowate how the vertical alignment works in the
        //                                 preceding cells.
        //                             </CTableDataCell>
        //                         </CTableRow>
        //                         <CTableRow>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: middle;</code> from the table
        //                             </CTableDataCell>
        //                             <CTableDataCell>
        //                                 This cell inherits <code>vertical-align: middle;</code> from the table
        //                             </CTableDataCell>
        //                             <CTableDataCell align="top">This cell is aligned to the top.</CTableDataCell>
        //                             <CTableDataCell>
        //                                 This here is some placeholder text, intended to take up quite a bit of
        //                                 verti dsafsadfasdfignment works in the
        //                                 preceding cells.
        //                             </CTableDataCell>
        //                         </CTableRow>
        //                     </CTableBody>
        //                 </CTable>
        //             </DocsExample>
        //         </CCardBody>
        //     </CCard>
        // </CCol>
    )
}

const Validation = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Manage </strong> <small>Product</small>
                    </CCardHeader>
                    <CCardBody>
                        <DocsExample href="forms/validation#browser-defaults">{ManageProduct()}</DocsExample>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Validation

