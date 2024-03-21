'use client'

import { Property } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const FeaturedListings = ({ data, colstyle }: any) => {
  const { status } = useAuth()

  const handleCopy = (id: string) => {
    navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/${id}`)
      .then(() => {
        toast.info('copied to clipboard')
      })
  }

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

  const { mutate: wishlistUpdateProperty } =
    trpc.wishlist.wishlistUpdateProperty.useMutation({
      onError: err => {
        console.log('error', err)
        if (err?.message === 'Invalid login') {
          toast.error('Account does not exist')
          return
        }
        console.error('Something went wrong. Please try again.')
      },
      onSuccess: () => {
        propertiesRefetch()
        console.log('Success')
      },
    })

  const {
    data: totalData,
    isLoading,
    refetch: propertiesRefetch,
  } = trpc.wishlist.getWishlistProperty.useQuery()

  const wishlistData = totalData?.docs
  const totalDocs = totalData?.totalDocs
  const wishlistId = wishlistData?.at(0)?.id

  const temp = wishlistData
    ?.at(0)
    ?.wishlistProperties?.map(ele => (ele.value as Property).id)
  console.log('wishlist123', wishlistId)

  const handleClick = async (listing: any) => {
    totalDocs === 0
      ? wishlistAddProperty({ id: listing.id })
      : wishlistUpdateProperty({ id: listing.id, wishlistId: wishlistId })
  }

  const { mutate: deleteProperty } =
    trpc.wishlist.deleteWishlistPropertyId.useMutation({
      onError: err => {
        console.error('Something went wrong. Please try again.')
      },
      onSuccess: () => {
        propertiesRefetch()
        toast.success('Deleted succcessfully')
      },
    })

  const deleteWishlistProperty = (id: string) => {
    const temp = wishlistData
      ?.at(0)
      ?.wishlistProperties?.filter(ele => id !== (ele?.value as Property)?.id)
      ?.map(ele => {
        return { relationTo: 'properties', value: (ele?.value as Property)?.id }
      })
    console.log('Temp property', temp)
    deleteProperty({
      id: id,
      wishlistId: wishlistData?.at(0)?.id,
      updatedData: temp,
    })
  }

  return (
    <>
      {data.map((listing: any, index: number) => (
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
                <a href='#' style={{ pointerEvents: 'none' }}>
                  <span className='flaticon-bed' /> {listing.details.bedrooms}{' '}
                  bed
                </a>
                <a href='#' style={{ pointerEvents: 'none' }}>
                  <span className='flaticon-shower' />{' '}
                  {listing.details.bathrooms} bath
                </a>
                <a href='#' style={{ pointerEvents: 'none' }}>
                  <span className='flaticon-expand' />{' '}
                  {listing.details.homearea} sqft
                </a>
              </div>
              <hr className='mt-2 mb-2' />
              <div className='list-meta2 d-flex justify-content-between align-items-center'>
                <span className='for-what'>For Rent</span>
                <div className='icons d-flex align-items-center'>
                  <div
                    onClick={() => handleCopy(listing?.id)}
                    data-tooltip-id={`clipboard-${index}`}
                    style={{ cursor: 'pointer' }}>
                    <span className='flaticon-clipboard' />
                  </div>
                  <ReactTooltip
                    id={`clipboard-${index}`}
                    place='top'
                    content='Copy clipboard'
                  />
                  <a
                    target='_blank'
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/properties/${listing?.id}`}
                    style={{ cursor: 'pointer' }}
                    data-tooltip-id={`new-tab-${index}`}>
                    <span className='flaticon-new-tab' />
                  </a>
                  <ReactTooltip
                    id={`new-tab-${index}`}
                    place='top-end'
                    content='Open in new tab'
                  />
                  <ReactTooltip
                    id={`wishlist-${index}`}
                    place='top-end'
                    content='add to my favourites'
                  />

                  {!temp?.includes(listing?.id) ? (
                    <div
                      data-tooltip-id={`wishlist-${index}`}
                      onClick={() => handleClick(listing)}
                      style={{
                        pointerEvents: isPending ? 'none' : 'all',
                        cursor: isPending ? 'not-allowed' : 'pointer',
                      }}
                      aria-disabled={isPending}>
                      <span className='flaticon-like' />
                    </div>
                  ) : (
                    <>
                      <ReactTooltip
                        id={`delete-wishlist-${index}`}
                        place='top-end'
                        content='remove from my favourites'
                      />
                      <div
                        data-tooltip-id={`delete-wishlist-${index}`}
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
                    </>
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
