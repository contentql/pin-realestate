'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ProfileBox = ({ register, setUploadedImage, uploadedImage }: any) => {
  const [previewImage, setPreviewImage] = useState<any>()
  const handleUpload = (event: any) => {
    const file = event.target.files[0]
    //console.log(`Uploading:`, event.target.files)
    setUploadedImage(event.target.files)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setPreviewImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='profile-box position-relative d-md-flex align-items-end mb50'>
      <div className='profile-img new position-relative overflow-hidden bdrs12 mb20-sm'>
        <Image
          width={240}
          height={220}
          className='w-100 cover h-100'
          src={previewImage || '/images/listings/profile-1.jpg'}
          alt='profile avatar'
        />

        <button
          className='tag-del'
          type='button'
          style={{ border: 'none' }}
          data-tooltip-id='profile_del'
          onClick={() => setPreviewImage(null)}
        >
          <span className='fas fa-trash-can' />
        </button>

        <ReactTooltip id='profile_del' place='right' content='Delete Image' />
      </div>
      {/* End .profile-img */}

      <div className='profile-content ml30 ml0-sm'>
        <label className='upload-label pointer'>
          <input
            type='file'
            accept='image/jpeg,image/png'
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
          <div className='ud-btn btn-white2 mb30'>
            Upload Profile Files
            <i className='fal fa-arrow-right-long' />
          </div>
        </label>
        <p className='text'>
          Photos must be JPEG or PNG format and at least 2048x768
        </p>
      </div>
    </div>
  )
}

export default ProfileBox
