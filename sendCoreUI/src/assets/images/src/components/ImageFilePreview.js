import React, { useState } from 'react'
import { Image } from 'react-bootstrap'



const ImageFilePreview = ({ file, width, height }) => {
    const [preview, setPreview] = useState({})

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
        setPreview(reader.result)
    }

    const bannerImageStyle = {
        padding: '0.25rem',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '0.25rem',
        maxWidth: '100%',
        width: `${width}px`,
        height: `${height}px`,
    }

    return (
        <div className='mt-2'>
            <Image src={preview} alt='Preview' style={bannerImageStyle} />
        </div>
    )
}

export default ImageFilePreview
