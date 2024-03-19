import React, { useEffect, useState } from 'react'
import { Card, Container, Row, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DataTableUI from 'src/components/Table/DataTableUI'
import { deleteBlog, getAllBlog, getAllBlogs, getBlogById } from 'src/slices/blogSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import BlogModel from './BlogModel'
import BaseModal from 'src/components/modal/BaseModal'

const Blogs = () => {
  const { blogs, blog } = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

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
    dispatch(getAllBlogs())
    if (blog) {
      setModalData(blog)
    }
  }, [dispatch, blog])

  const onEdit = async (id) => {
    await dispatch(getBlogById(id))

    setShow(!show)
  }

  const confirmDelete = withReactContent(Swal)

  const onDelete = ({ id }) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Blog?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `Blog has been deleted.`, 'success')
          dispatch(deleteBlog(id))
        }
      })
  }

  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Title', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'image', title: 'Image', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end' },
      colGroup: { style: { minWidth: 100 } },
      width: 200,
    },
  ]

  const tableData = blogs?.map((blog, index) => {
    const { id, title, image } = blog
    return {
      index: index + 1,
      id,
      title,
      image,
    }
  })

  return (
    <>
      <Container>
        <Row>
          <h3 className="maintitle">Blogs</h3>
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
        title={!modalData ? 'Add Blog' : 'Update Blog'}
        show={show}
        onHide={handleClose}
        fullscreen={true}
      >
        <BlogModel modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </>
  )
}

export default Blogs
