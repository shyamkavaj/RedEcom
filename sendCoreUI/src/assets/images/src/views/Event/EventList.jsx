import React, { useEffect, useState } from 'react'
import EventModal from './EventModal'
import BaseModal from 'src/components/modal/BaseModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent, getAllEvent, getEventById } from 'src/slices/eventSlice'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import DataTableUI from 'src/components/Table/DataTableUI'
import { DataType } from 'ka-table'
import moment from 'moment'

const confirmDelete = withReactContent(Swal)

const EventList = () => {
  const dispatch = useDispatch()
  const { events, event } = useSelector((state) => state.events)

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

  const onEdit = async (id) => {
    await dispatch(getEventById(id))
    setShow(!show)
  }
  const onDelete = (data) => {
    confirmDelete
      .fire({
        title: `Are you sure you want to delete Event?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmDelete.fire('Deleted!', `Event has been deleted.`, 'success')
          dispatch(deleteEvent(data.id))
        }
      })
  }
  const tableHeaders = [
    { key: 'index', title: 'Sr No', colGroup: { style: { minWidth: 80 } }, width: 80 },
    { key: 'title', title: 'Evant Name', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'start', title: 'Start Date', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'end', title: 'End Date', colGroup: { style: { minWidth: 100 } }, width: 200 },
    { key: 'created', title: 'Created At', colGroup: { style: { minWidth: 100 } }, width: 200 },
    {
      key: ':actions',
      title: 'Actions',
      style: { textAlign: 'end', position: 'sticky', right: 0, zIndex: 10, background: '#f1f5f7' },
      colGroup: { style: { minWidth: 100 } },
      width: 130,
    },
  ]
  const tableData = events.map((event, index) => {
    const { id, title, start_date, end_date, createdAt } = event
    return {
      id,
      index: index + 1,
      title: title,
      start: moment(start_date).format('DD-MM-YYYY'),
      end: moment(end_date).format('DD-MM-YYYY'),
      created: moment(createdAt).format('DD-MM-YYYY'),
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllEvent())
    if (event) {
      setModalData(event)
    }
  }, [dispatch, event])

  return (
    <React.Fragment>
      <Container>
        <Row>
          <h3 className="maintitle">Event List</h3>
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
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BaseModal title={!modalData ? 'Add Event' : 'Update Event'} show={show} onHide={handleClose}>
        <EventModal modalData={modalData} onHide={handleClose} />
      </BaseModal>
    </React.Fragment>
  )
}

export default EventList
