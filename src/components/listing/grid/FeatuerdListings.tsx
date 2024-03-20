'use client'

import { Property } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'

const FeaturedListings = ({ data, colstyle }: any) => {
  const { mutate: wishlistAddProperty, isPending } =
    trpc.wishlist.wishlistAddProperty.useMutation({
      onError: err => {
        console.log('error', err)
        if (err?.message === 'Invalid login') {
          toast.error('Account does not exist')

          return
        }
        // if (err?.message === 'UNAUTHORIZED') {
        //   // in toast
        //   toast.error('E-mail or Password incorrect')

        //   return
        // }

        console.error('Something went wrong. Please try again.')
      },
      onSuccess: () => {
        propertiesRefetch()
        console.log('Success')
      },
    })

  const {
    data: wishlistData,
    isLoading,
    refetch: propertiesRefetch,
  } = trpc.wishlist.getWishlistProperty.useQuery()

  const temp = wishlistData?.map(
    ele => (ele.wishlistProperties?.value as Property)?.id,
  )
  console.log('wishlist', temp)

  const handleClick = async (listing: any) => {
    const item = {
      id: listing.id,
    }

    await wishlistAddProperty(item)
  }

  const { mutate: deleteProperty } =
    trpc.wishlist.deleteWishlistPropertyId.useMutation({
      onError: err => {
        if (err?.message === 'Invalid login') {
          toast.error('Account does not exist')
          return
        }
        console.error('Something went wrong. Please try again.')
      },
      onSuccess: () => {
        propertiesRefetch()
        toast.success('Deleted succcessfully')

        propertiesRefetch()
      },
    })

  const deleteWishlistProperty = (id: any) => {
    deleteProperty({ id: id })
  }

  return (
    <>
      {data.map((listing: any) => (
        <div
          className={` ${colstyle ? 'col-sm-12' : 'col-sm-6 col-lg-6'}  `}
          key={listing.id}>
          <div
            className={
              colstyle
                ? 'listing-style1 listCustom listing-type'
                : 'listing-style1'
            }>
            <div className='list-thumb'>
              <Image
                width={382}
                height={248}
                style={{ height: '230px' }}
                className='w-100  cover'
                src={listing?.media?.url}
                alt='listings'
              />
              <div className='sale-sticker-wrap'>
                {!listing._propertyDetails.saleType.map(
                  (l: any) => l === 'rent',
                ) && (
                  <div className='list-tag fz12'>
                    <span className='flaticon-electricity me-2' />
                    FEATUREd
                  </div>
                )}
              </div>

              <div className='list-price'>
                {listing._propertyDetails.price} / <span>mo</span>
              </div>
            </div>
            <div className='list-content'>
              <h6 className='list-title'>
                <Link href={`/properties/${listing.id}`}>
                  {listing._propertyDetails.title}
                </Link>
              </h6>
              <p className='list-text'>{listing.location.city}</p>
              <div className='list-meta d-flex align-items-center'>
                <a href='#'>
                  <span className='flaticon-bed' /> {listing.details.bedrooms}{' '}
                  bed
                </a>
                <a href='#'>
                  <span className='flaticon-shower' />{' '}
                  {listing.details.bathrooms} bath
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
                  {!temp?.includes(listing?.id) ? (
                    <div
                      onClick={() => handleClick(listing)}
                      style={{
                        pointerEvents: isPending ? 'none' : 'all',
                        cursor: isPending ? 'not-allowed' : 'pointer',
                      }}
                      aria-disabled={isPending}>
                      <span className='flaticon-like' />
                    </div>
                  ) : (
                    <div
                      aria-disabled={isPending}
                      onClick={() => deleteWishlistProperty(listing.id)}>
                      <span
                        style={{
                          pointerEvents: isPending ? 'none' : 'all',
                          cursor: isPending ? 'not-allowed' : 'pointer',
                          fontSize: '18px',
                          color: 'red',
                        }}>
                        &#10084;
                      </span>{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default FeaturedListings
