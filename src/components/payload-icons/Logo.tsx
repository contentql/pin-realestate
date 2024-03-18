import Image from 'next/image'
import * as React from 'react'
function Logo() {
  return (
    <div className='logo'>
      <Image
        src='/images/apple-touch-icon-72x72.png'
        width={100}
        height={20}
        alt='Realestate Design Logo'
      />
    </div>
  )
}
export default Logo
