'use client';

import Image from 'next/image';
import Link from 'next/link';

const FeaturedListings = ({ data, colstyle }: any) => {
  console.log('datadata', data);
  return (
    <>
      {data.map((listing: any) => (
        <div
          className={` ${colstyle ? 'col-sm-12' : 'col-sm-6 col-lg-6'}  `}
          key={listing.id}
        >
          <div
            className={
              colstyle
                ? 'listing-style1 listCustom listing-type'
                : 'listing-style1'
            }
          >
            <div className='list-thumb'>
              <Image
                width={382}
                height={248}
                style={{ height: '230px' }}
                className='w-100  cover'
                src={listing?.floors[0].imageSrc?.url}
                alt='listings'
              />
              <div className='sale-sticker-wrap'>
                {!listing.propertiesDetails.status.map(
                  (l: any) => l === 'For rent'
                ) && (
                  <div className='list-tag fz12'>
                    <span className='flaticon-electricity me-2' />
                    FEATURED
                  </div>
                )}
              </div>

              <div className='list-price'>
                {listing.propertiesDetails.price} / <span>mo</span>
              </div>
            </div>
            <div className='list-content'>
              <h6 className='list-title'>
                <Link href={`/property/${listing.id}`}>
                  {listing.propertiesDetails.title}
                </Link>
              </h6>
              <p className='list-text'>{listing.location.city}</p>
              <div className='list-meta d-flex align-items-center'>
                <a href='#'>
                  <span className='flaticon-bed' /> {listing.details.beds} bed
                </a>
                <a href='#'>
                  <span className='flaticon-shower' /> {listing.details.baths}{' '}
                  bath
                </a>
                <a href='#'>
                  <span className='flaticon-expand' />{' '}
                  {listing.details.homearea} sqft
                </a>
              </div>
              <hr className='mt-2 mb-2' />
              <div className='list-meta2 d-flex justify-content-between align-items-center'>
                <span className='for-what'>For Rent</span>
                <div className='icons d-flex align-items-center'>
                  <a href='#'>
                    <span className='flaticon-fullscreen' />
                  </a>
                  <a href='#'>
                    <span className='flaticon-new-tab' />
                  </a>
                  <a href='#'>
                    <span className='flaticon-like' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
