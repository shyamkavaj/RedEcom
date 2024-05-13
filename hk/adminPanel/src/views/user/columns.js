import { CButton, CCol, CForm, CFormInput, CFormSelect, CModal, CModalBody, CModalHeader, CModalTitle, CRow, CTableHeaderCell, CToast, CToastBody, CToastClose, CToastHeader, CToaster } from "@coreui/react"
import { useFormik } from "formik"
import { BadgeX, SquarePen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, updateRole } from "src/RTK/slice/userSlice"

// import Swal from 'sweetalert2'
const role = localStorage.getItem('role')
var COLUMNS = [
    {
        Header: "Index",
        accessor: "index",
        Cell: row => {
            return (
                <CTableHeaderCell>{parseInt(row.row.id) + 1}</CTableHeaderCell>
            )
        }
    },
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Username",
        accessor: "email",
    },
    {
        Header: "Phone",
        accessor: "phone",
    },
    {
        Header: "Role",
        accessor: "role",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: row => {
            const [visible, setVisible] = useState(false)
            const [edit, setEdit] = useState(false);
            const dispatch = useDispatch()
            const role = localStorage.getItem('role')
            const handleDelete = (id) => {
                dispatch(deleteUser(id))
            }
            const { values, errors, touched, handleBlur,
                handleSubmit,
                handleChange,
                setFieldValue
            } = useFormik({
                initialValues: row.row.original,
                enableReinitialize: true,
                onSubmit: async (values, { setSubmitting, resetForm }) => {
                    console.log("vlaue ", values)
                    await dispatch(updateRole(values))
                    setSubmitting(false);
                    resetForm();
                    setVisible(!visible)

                },
            })
            return (
                <>
                    <div className=" flex">
                        <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} onClick={() => {
                            setVisible(!visible)
                            setEdit(!edit)
                        }} />
                        <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                        <CModal
                            size="xl"
                            visible={visible}
                            onClose={() => {
                                setVisible(false)
                                setEdit(false)
                            }}
                            aria-labelledby="FullscreenExample1"
                        >
                            <CModalHeader>
                                <CModalTitle id="FullscreenExample1">
                                    User Details
                                </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm className="row g-3 flex justify-center"
                                    onSubmit={handleSubmit}
                                // encType='multipart/form-data'
                                >
                                    <CRow
                                        style={{ 'marginTop': '10px' }}>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Customer Name"
                                                name='name'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                // required
                                                disabled
                                            />

                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Username"
                                                name='email'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                // required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Phone No."
                                                name='phone'
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                                value={values.phone}
                                                required
                                                disabled
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                type="text"
                                                id="validationDefault01"
                                                label="Login Through"
                                                name='loginVia'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.loginVia ? "Google Login" : "Regular"}
                                                // required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol md={4} style={{ 'marginBottom': '6px' }} >
                                            <CFormInput
                                                // type="text"
                                                id="validationDefault01"
                                                label="Login Status"
                                                name='status'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status ? "login" : "logged-out"}
                                                // required
                                                disabled
                                            />
                                        </CCol>
                                        <CCol style={{ 'marginBottom': '6px' }}>
                                            <CFormSelect id="validationDefault04" label="Role" name='role'
                                                // defaultChecked
                                                value={values.role}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                required
                                                disabled={!edit}
                                            >
                                                <option disabled selected>Choose Role...</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Sub-Admin">Sub-Admin</option>
                                                <option value="Customer">Customer</option>
                                            </CFormSelect>
                                        </CCol>

                                    </CRow>


                                    {edit ?
                                        <CRow>
                                            <CCol xs={12} className=" mt-[6px]" >
                                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit" onSubmit={handleSubmit} className=" mt-[6px]">
                                                    Update Role
                                                </CButton>
                                            </CCol>
                                        </CRow> : <></>
                                    }

                                </CForm>
                            </CModalBody>
                        </CModal>
                    </div>
                </>
            )
        }

    }
]
// if (role !== 'admin') {
//     COLUMNS = COLUMNS.filter(item => item.accessor !== 'action')
// }

export default COLUMNS