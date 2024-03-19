import React from 'react'
import { Badge } from 'react-bootstrap'

const VisibilityBadge = ({ visibility }) => {
  return (
    <>
      {visibility === true ? (
        <Badge pill bg="success">
          Yes
        </Badge>
      ) : (
        <Badge pill bg="danger">
          No
        </Badge>
      )}
    </>
  )
}

export default VisibilityBadge
