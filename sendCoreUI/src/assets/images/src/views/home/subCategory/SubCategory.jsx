import Swal from 'sweetalert2'
import SubCategoryModal from './SubCategoryModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import withReactContent from 'sweetalert2-react-content'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import {
  deleteSubCategory,
  getAllSubCategory,
  getSubCategoryById,
} from 'src/slices/subCategorySlice'
import DataTableUI from 'src/components/Table/DataTableUI'
import moment from 'moment'

const confirmDelete = withReactContent(Swal)

const SubCategory = () => {
  const dispatch = useDispatch()
  const { subCategorys, subCategory } = useSelector((state) => state.subCategorys)

  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState()

  const onShowModal = () => {
    setModalData(undefined)
    setShow(!show)
  }
  const handleClose = () => {
    setModalData(undefined)
    setShow(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllSubCategory())
    if (subCategory) {
      setModalData(subCategory)
    }
  }, [dispatch, subCategory])

  const onEdit = async (id) => {
    await dispatch(getSubCategoryById(id))
    setShow(!show)
  }
  const onDelete = (data) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Category?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteSubCategory(data.id))
          confirmDelete.fire('Deleted!', `Category has been deleted.`, 'success')
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'c_title', title: 'Service Title', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'title', title: 'Title', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'description',
      title: 'Description',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    // { key: 'status', title: 'Status' },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 120,
    },
  ]
  const tableData =
    subCategorys &&
    subCategorys?.map((subCategory, index) => {
      return {
        index: index + 1,
        id: subCategory.id,
        c_title: subCategory.c_title,
        title: subCategory.title,
        description: subCategory.description,
        // status: status,
        created: moment(subCategory.createdAt).format('DD-MM-YYYY'),
      }
    })
  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Category</h3>
        </Row>
        <Row>
          <Card className="p-2 mb-5">
            <Card.Header className="">
              <Button variant="success" onClick={onShowModal}>
                Add New
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <DataTableUI
                    tableHeaders={tableHeaders}
                    tableData={tableData}
                    deleteRecord={onDelete}
                    updateRecord={onEdit}
                    // handleVisibility={onUpdate}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Category' : 'Update Category'}
        show={show}
        onHide={handleClose}
        fullscreen={true}
      >
        <SubCategoryModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default SubCategory
