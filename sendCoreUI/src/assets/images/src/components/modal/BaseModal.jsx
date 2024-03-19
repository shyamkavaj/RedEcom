import React from 'react'
import { Modal } from 'react-bootstrap'

const BaseModal = ({ show, title, children, onHide, fullscreen }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        fullscreen={fullscreen ? true : false}
        centered
        size="lg"
        id="base-modal"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  )
}

export default BaseModal
