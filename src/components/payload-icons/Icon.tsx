'use client'
import * as React from 'react'
import Image from 'next/image'
function Icon() {
  
  return (
    <div className='logo'>
      <Image
        src='/images/apple-touch-icon-60x60.png'
        width={28}
        height={28}
        alt='Realestate Design Logo'
      />
    </div>
  )
}
export default Icon
