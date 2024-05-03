import React from 'react'
import { Image } from 'react-bootstrap'

const ImaComponent = ({path}) => {
    console.log("image props ",path)
    return (
        <div>
            <Image
                className='img-fluid'
                src={path}
                alt='single image'
                loading='lazy'
            />
        </div>
    )
}

export default ImaComponent
