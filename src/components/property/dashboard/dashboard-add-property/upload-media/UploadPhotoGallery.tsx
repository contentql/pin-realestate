'use client'
import uploadMedia from '@/utilis/uploadMedia'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const UploadPhotoGallery = ({ register, setAssets }: any) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const fileInputRef = useRef(null)

  const handleUpload = async (files: any) => {
    const newImages = [...uploadedImages]

    for (const file of files) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        newImages.push(e.target.result)
        setUploadedImages(newImages)
      }
      reader.readAsDataURL(file)
    }

    try {
      const doc = await uploadMedia(files)
      setAssets((prev: any) => [...prev, { asset: doc?.id }])
    } catch (error) {
      console.log(error)
    }
  }

  const handleDrop = (event: any) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    handleUpload(files)
  }

  const handleDragOver = (event: any) => {
    event.preventDefault()
  }

  // const handleButtonClick = () => {
  //   // Programmatically trigger the hidden file input
  //   fileInputRef.current.click();
  // };

  const handleDelete = (index: any) => {
    const newImages = [...uploadedImages]
    newImages.splice(index, 1)
    setUploadedImages(newImages)
  }

  return (
    <>
      <div
        className='upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2'
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <div className='icon mb30'>
          <span className='flaticon-upload' />
        </div>
        <h4 className='title fz17 mb10'>Upload/Drag photos of your property</h4>
        <p className='text mb25'>
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
        <label className='ud-btn btn-white'>
          Browse Files
          <input
            ref={fileInputRef}
            id='fileInput'
            type='file'
            multiple
            className='ud-btn btn-white'
            onChange={e => handleUpload(e.target.files)}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Display uploaded images */}
      <div className='row profile-box position-relative d-md-flex align-items-end mb50'>
        {uploadedImages.map((imageData, index) => (
          <div className='col-2' key={index}>
            <div className='profile-img mb20 position-relative'>
              <Image
                width={212}
                height={194}
                className='w-100 bdrs12 cover'
                src={imageData}
                alt={`Uploaded Image ${index + 1}`}
              />
              <button
                style={{ border: 'none' }}
                className='tag-del'
                title='Delete Image'
                onClick={() => handleDelete(index)}
                type='button'
                data-tooltip-id={`delete-${index}`}>
                <span className='fas fa-trash-can' />
              </button>

              <ReactTooltip
                id={`delete-${index}`}
                place='right'
                content='Delete Image'
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UploadPhotoGallery
