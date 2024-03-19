import Swal from 'sweetalert2'
import CategoryModal from './CategoryModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BaseModal from 'src/components/modal/BaseModal'
import withReactContent from 'sweetalert2-react-content'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import {
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryStatus,
} from 'src/slices/categorySlice'
import DataTableUI from 'src/components/Table/DataTableUI'
import moment from 'moment'

const confirmDelete = withReactContent(Swal)
const confirmEdit = withReactContent(Swal)

const Category = () => {
  const dispatch = useDispatch()
  const { categorys, category } = useSelector((state) => state.categorys)

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
    dispatch(getAllCategory())
    if (category) {
      setModalData(category)
    }
  }, [dispatch, category])

  const onEdit = async (id) => {
    await dispatch(getCategoryById(id))
    setShow(!show)
  }

  const onUpdate = (data) => {
    confirmEdit
      .fire({
        title: `Are you sure you want to update Status?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          confirmEdit.fire('Updated!', `Status has been updated.`, 'success')
          const obj = {
            ...data,
            status: !data.status,
          }
          await dispatch(updateCategoryStatus(obj))
        }
      })
  }
  const onDelete = (data) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Service?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(53, 151, 132)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategory(data.id))
          confirmDelete.fire('Deleted!', `Service has been deleted.`, 'success')
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Title', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: 'description',
      title: 'Description',
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
    { key: 'status', title: 'Status', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 150,
    },
  ]

  const tableData =
    categorys &&
    categorys.map((category, index) => {
      const { id, title, description, status, createdAt } = category
      return {
        index: index + 1,
        id,
        title: title,
        description: description,
        status: status,
        created: moment(createdAt).format('DD-MM-YYYY'),
      }
    })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Service</h3>
        </Row>
        <Row>
          <Col>
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
                      handleVisibility={onUpdate}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BaseModal
        title={!modalData ? 'Add Service' : 'Update Service'}
        show={show}
        onHide={handleClose}
      >
        <CategoryModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default Category
