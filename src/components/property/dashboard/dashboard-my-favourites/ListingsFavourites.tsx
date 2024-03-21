'use client'
import { Media, Property } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ListingsFavourites = () => {
  const { status } = useAuth()

  const {
    data: totalData,
    isLoading,
    refetch: propertiesRefetch,
  } = trpc.wishlist.getWishlistProperty.useQuery()

  const wishlistData = totalData?.docs
  const totalDocs = totalData?.totalDocs
  const wishlistId = wishlistData?.at(0)?.id

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
        toast.success('Deleted succcessfully')

        propertiesRefetch()
      },
    })

  const handleDeleteListing = (id: any) => {
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
      {wishlistData?.at(0)?.wishlistProperties?.length === 0 ? (
        <h3>No items available</h3>
      ) : (
        wishlistData?.at(0)?.wishlistProperties?.map((listing, index) => (
          <div
            className='col-md-6 col-lg-4 col-xl-3'
            key={(listing?.value as Property)?.id}>
            <div className='listing-style1 style2'>
              <div className='list-thumb'>
                <Image
                  width={382}
                  height={248}
                  className='w-100 h-100 cover'
                  src={
                    (
                      (listing.value as Property)?._assets?.allMedia?.at(0)
                        ?.asset as Media
                    )?.url as string
                  }
                  alt='listings'
                />

                <button
                  className='tag-del'
                  title='Delete Item'
                  onClick={() =>
                    handleDeleteListing((listing?.value as Property)?.id)
                  }
                  style={{ border: 'none' }}
                  data-tooltip-id={`delete-${(listing?.value as Property)?.id}`}>
                  <span className='fas fa-trash-can'></span>
                </button>

                <ReactTooltip
                  id={`delete-${(listing?.value as Property)?.id}`}
                  place='left'
                  content='Delete'
                />

                <div className='list-price'>
                  {(listing?.value as Property)._propertyDetails?.price} /{' '}
                  <span>mo</span>
                </div>
              </div>
              <div className='list-content'>
                <h6 className='list-title'>
                  <Link
                    href={`/properties/${(listing?.value as Property)?.id}`}>
                    {(listing?.value as Property)?._propertyDetails?.title}
                  </Link>
                </h6>
                <p className='list-text'>
                  {(listing?.value as Property)?._location?.address}
                </p>
                <div className='list-meta d-flex align-items-center'>
                  <a href='#'>
                    <span className='flaticon-bed' />{' '}
                    {(listing?.value as Property)?._details?.bedrooms} bed
                  </a>
                  <a href='#'>
                    <span className='flaticon-shower' />{' '}
                    {(listing?.value as Property)?._details?.bathrooms} bath
                  </a>
                  <a href='#'>
                    <span className='flaticon-expand' />{' '}
                    {(listing?.value as Property)?._details?.homearea} sqft
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export default ListingsFavourites
