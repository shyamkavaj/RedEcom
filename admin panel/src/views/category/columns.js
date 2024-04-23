import { CButton, CCol, CForm, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTableHeaderCell } from "@coreui/react"
import { BadgeX, SquarePen } from "lucide-react"
import { useState } from "react"
import { useFormik } from 'formik'
import { deleteCate } from '../../RTK/slice/cateSlice'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { editCate } from "../../RTK/slice/cateSlice"

export const COLUMNS = [
    {
        Header: "Index",
        accessor: "index", // accessor is the "key" in the data
        Cell: row => {
            return (
                <CTableHeaderCell>{parseInt(row.row.id) + 1}</CTableHeaderCell>
            )
        },
    },
    {
        Header: "Category ",
        accessor: "name",
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: row => {
            const [visible, setVisible] = useState(false)
            // const [edit, setEdit] = useState(false)
            const cateSchema = Yup.object({
                name: Yup.string().required("Category name is required"),
            })
            const dispatch = useDispatch()
            const handleDelete = (id) => {
                // console.log("cate id ", id)
                dispatch(deleteCate(id))
            }
            // const handleEdit = (id) => {
            //     console.log('id is ', id)
            // }
            const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
                initialValues: {
                    name: row.row.original.name,
                },
                validationSchema: cateSchema,
                onSubmit: (values) => {
                    // console.log(values)
                    const data = {
                        id: row.row.original.id,
                        name: values.name
                    }
                    dispatch(editCate(data))
                    setVisible(false)
                    // setEdit(false)
                }
            })
            // console.log("row ",row.row.original)
            return (
                <>
                    <div className=" flex">

                        <SquarePen color="#1fe5b3" strokeWidth={1.5} size={36} onClick={() => {
                            setVisible(!visible)
                            // setEdit(!edit)
                        }} />
                        <BadgeX color="#e51f1f" strokeWidth={1.5} size={36} onClick={() => { handleDelete(row.row.original.id) }} />
                    </div>
                    <CModal
                        visible={visible}
                        size="md"
                        onClose={() => setVisible(false)}
                        aria-labelledby="FullscreenExample1"
                    >
                        <CForm onSubmit={handleSubmit}>
                            <CModalHeader>
                                <CModalTitle id="FullscreenExample1">
                                    Update Category
                                </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow>
                                    <CCol>
                                        <CFormInput
                                            type="text"
                                            id="validationDefault01"
                                            label="Category"
                                            name='name'
                                            placeholder='Enter Category Name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            // value={row.row.original.name}
                                            value={values.name}
                                            required
                                        // disabled={!edit}
                                        />
                                        {errors.name && touched.name ? (
                                            <p className="form-error text-danger">{errors.name}</p>
                                        ) : null}
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton style={{ 'background': 'linear-gradient(90deg, #ffba00 0%, #ff6c00 100%)', 'border': 'none' }} type="submit">Save changes</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>
                </>

            )
        }
    }
]