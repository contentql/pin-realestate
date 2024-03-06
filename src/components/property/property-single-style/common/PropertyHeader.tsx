'use client';

import { Property } from '@/payload-types';

const PropertyHeader = ({ data }: { data: Property }) => {
  const propertyType =
    data?.propertiesDetails.status?.length == 0
      ? data?.propertiesDetails?.status
      : data?.propertiesDetails?.status &&
        data?.propertiesDetails?.status.join(' and ');

  return (
    <>
      <div className='col-lg-8'>
        <div className='single-property-content mb30-md'>
          <h2 className='sp-lg-title'>{data?.propertiesDetails?.title}</h2>
          <div className='pd-meta mb15 d-md-flex align-items-center'>
            <p className='text fz15 mb-0 bdrr1 pr5 bdrrn-sm'>
              {data?.location?.location?.address}
            </p>
            <a
              className='ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm'
              href='#'
            >
              <i className='fas fa-circle fz10 pe-2' />
              {propertyType}
            </a>
            <div className='ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm'>
              <i className='far fa-clock pe-2' />
              {Number(new Date().getFullYear()) -
                Number(data?.details?.details?.yearBuild)}{' '}
              years ago
            </div>
            <a className='ff-heading ml10 ml0-sm fz15' href='#'>
              <i className='flaticon-fullscreen pe-2 align-text-top' />
              8721
            </a>
          </div>
          <div className='property-meta d-flex align-items-center'>
            <a className='text fz15' href='#'>
              <i className='flaticon-bed pe-2 align-text-top' />
              {data?.details?.details?.beds} bed
            </a>
            <a className='text ml20 fz15' href='#'>
              <i className='flaticon-shower pe-2 align-text-top' />
              {data?.details?.details?.baths} bath
            </a>
            <a className='text ml20 fz15' href='#'>
              <i className='flaticon-expand pe-2 align-text-top' />
              {data?.details?.details?.homearea} sqft
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className='col-lg-4'>
        <div className='single-property-content'>
          <div className='property-action text-lg-end'>
            <div className='d-flex mb20 mb10-md align-items-center justify-content-lg-end'>
              <a className='icon mr10' href='#'>
                <span className='flaticon-like' />
              </a>
              <a className='icon mr10' href='#'>
                <span className='flaticon-new-tab' />
              </a>
              <a className='icon mr10' href='#'>
                <span className='flaticon-share-1' />
              </a>
              <a className='icon' href='#'>
                <span className='flaticon-printer' />
              </a>
            </div>
            <h3 className='price mb-0'>{data?.propertiesDetails?.price}</h3>
            <p className='text space fz15'>
              $
              {(
                Number(data?.propertiesDetails?.price) /
                data?.details?.details?.homearea
              ).toFixed(2)}
              /sq ft
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  )
}

export default PropertyHeader
