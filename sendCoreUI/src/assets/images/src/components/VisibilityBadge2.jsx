import React from 'react'
import { Badge } from 'react-bootstrap'

const VisibilityBadge2 = ({ visibility }) => {
    return (
        <>
            {visibility ? (
                <Badge pill bg="success">
                    Active
                </Badge>
            ) : (
                <Badge pill bg="danger">
                    Inactive
                </Badge>
            )}
        </>
    )
}

export default VisibilityBadge2
