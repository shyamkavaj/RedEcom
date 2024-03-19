import React from 'react'
import { Image } from 'react-bootstrap'
import { toLocalImageUrl } from 'src/helpers/AssetHelpers'

const ImagePreview = ({ src, width, height }) => {
  const imageStyle = {
    padding: '0.25rem',
    // backgroundColor: '#fff',
    // border: '1px solid #ddd',
    borderRadius: '0.25rem',
    maxWidth: '100%',
    width: `${width}px`,
    height: `${height}px`,
  }
  return (
    <>
      {/* <Form.Control type="file" onChange={handleChange} /> */}
      <Image src={toLocalImageUrl(src)} style={imageStyle} />
    </>
  )
}

export default ImagePreview
