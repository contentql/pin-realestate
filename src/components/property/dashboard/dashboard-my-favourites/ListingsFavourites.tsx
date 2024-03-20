'use client'
import { Media, Property } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ListingsFavourites = () => {
  const {
    data: wishlistData,
    isLoading,
    refetch: propertiesRefetch,
  } = trpc.wishlist.getWishlistProperty.useQuery()

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
    deleteProperty({ id: id })
  }

  return (
    <>
      {wishlistData?.length === 0 ? (
        <h3>No items available</h3>
      ) : (
        wishlistData?.map((listing, index) => (
          <div className='col-md-6 col-lg-4 col-xl-3' key={listing?.id}>
            <div className='listing-style1 style2'>
              <div className='list-thumb'>
                <Image
                  width={382}
                  height={248}
                  className='w-100 h-100 cover'
                  src={
                    (
                      (
                        listing?.wishlistProperties?.value as Property
                      )?._assets?.allMedia?.at(0)?.asset as Media
                    )?.url as string
                  }
                  alt='listings'
                />

                <button
                  className='tag-del'
                  title='Delete Item'
                  onClick={() =>
                    handleDeleteListing(
                      (listing?.wishlistProperties?.value as Property)?.id,
                    )
                  }
                  style={{ border: 'none' }}
                  data-tooltip-id={`delete-${(listing?.wishlistProperties?.value as Property)?.id}`}>
                  <span className='fas fa-trash-can'></span>
                </button>

                <ReactTooltip
                  id={`delete-${(listing?.wishlistProperties?.value as Property)?.id}`}
                  place='left'
                  content='Delete'
                />

                <div className='list-price'>
                  {
                    (listing?.wishlistProperties?.value as Property)
                      ._propertyDetails?.price
                  }{' '}
                  / <span>mo</span>
                </div>
              </div>
              <div className='list-content'>
                <h6 className='list-title'>
                  <Link
                    href={`/properties/${(listing?.wishlistProperties?.value as Property)?.id}`}>
                    {
                      (listing?.wishlistProperties?.value as Property)
                        ?._propertyDetails?.title
                    }
                  </Link>
                </h6>
                <p className='list-text'>
                  {
                    (listing?.wishlistProperties?.value as Property)?._location
                      ?.address
                  }
                </p>
                <div className='list-meta d-flex align-items-center'>
                  <a href='#'>
                    <span className='flaticon-bed' />{' '}
                    {
                      (listing?.wishlistProperties?.value as Property)?._details
                        ?.bedrooms
                    }{' '}
                    bed
                  </a>
                  <a href='#'>
                    <span className='flaticon-shower' />{' '}
                    {
                      (listing?.wishlistProperties?.value as Property)?._details
                        ?.bathrooms
                    }{' '}
                    bath
                  </a>
                  <a href='#'>
                    <span className='flaticon-expand' />{' '}
                    {
                      (listing?.wishlistProperties?.value as Property)?._details
                        ?.homearea
                    }{' '}
                    sqft
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
