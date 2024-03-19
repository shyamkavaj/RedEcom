import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import SubCategoryChildModal from './SubCategoryChildModal'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import {
  deleteSubCategoryChild,
  getAllSubCategoryChild,
  getSubCategoryChildById,
} from 'src/slices/subCategoryChildSlice'
import DataTableUI from 'src/components/Table/DataTableUI'
import moment from 'moment'

const confirmDelete = withReactContent(Swal)

const SubCategoryChild = () => {
  const dispatch = useDispatch()
  const { subCategorysChild, subCategoryChild } = useSelector((state) => state.subCategoryChild)

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
    dispatch(getAllSubCategoryChild())
    if (subCategoryChild) {
      setModalData(subCategoryChild)
    }
  }, [dispatch, subCategoryChild])

  const onEdit = async (id) => {
    await dispatch(getSubCategoryChildById(id))
    setShow(!show)
  }
  const onDelete = (data) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Sub Category?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteSubCategoryChild(data.id))
          confirmDelete.fire('Deleted!', `Sub Category has been deleted.`, 'success')
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    {
      key: 'sc_title',
      title: 'Category Title',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'title', title: 'Title', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'description',
      title: 'Description',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
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
    subCategorysChild &&
    subCategorysChild.map((subCategoryChild, index) => {
      const { id, sc_title, title, description, createdAt } = subCategoryChild
      return {
        index: index + 1,
        id,
        sc_title: sc_title,
        title: title,
        description: description,
        // status: status,
        created: moment(createdAt).format('DD-MM-YYYY'),
      }
    })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Sub Category</h3>
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
                    // handleVisibility={handleVisibility}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Sub Category' : 'Update Sub Category'}
        show={show}
        onHide={handleClose}
      >
        <SubCategoryChildModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default SubCategoryChild
