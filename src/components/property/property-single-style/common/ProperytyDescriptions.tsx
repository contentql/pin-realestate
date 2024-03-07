import React from 'react'

const ProperytyDescriptions = ({
  data,
}: {
  data: string | null | undefined
}) => {
  return (
    <>
      <p className='text mb10'>{data}</p>
    </>
  )
}

export default ProperytyDescriptions
