'use client'
import { Media } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

const FeaturedListings = () => {
  const { data: propertiesListData, isLoading } =
    trpc.properties.getPropertiesForMyPropertiesPage.list.useQuery()

  //console.log('Loading properties', propertiesListData)
  return (
    <>
      <Swiper
        className='overflow-visible'
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: '.featured-next__active',
          prevEl: '.featured-prev__active',
        }}
        pagination={{
          el: '.featured-pagination__active',
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {propertiesListData?.slice(0, 5).map(listing => (
          <SwiperSlide key={listing.id}>
            <div className='item'>
              <div className='listing-style1'>
                <div className='list-thumb'>
                  <Image
                    width={382}
                    height={248}
                    className='w-100 h-100 cover'
                    src={
                      (listing?.media?.allMedia?.at(0)?.asset as Media)
                        ?.url as string
                    }
                    alt='listings'
                  />
                  <div className='sale-sticker-wrap'>
                    {listing?.status?.length - 1 && (
                      <div className='list-tag rounded-0 fz12'>
                        <span className='flaticon-electricity' />
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className='list-price'>
                    {listing?.price} / <span>mo</span>
                  </div>
                </div>
                <div className='list-content'>
                  <h6 className='list-title'>
                    <Link href={`/properties/${listing.id}`}>
                      {listing?.title}
                    </Link>
                  </h6>
                  <p className='list-text'>{listing?.location}</p>
                  <div className='list-meta d-flex align-items-center'>
                    <span className='flaticon-bed' />{' '}
                    {listing?.details?.bedrooms} bed
                    <span className='flaticon-shower' />{' '}
                    {listing?.details?.bathrooms} bath
                    <span className='flaticon-expand' />{' '}
                    {listing?.details?.homearea} sqft
                  </div>
                  <hr className='mt-2 mb-2' />
                  <div className='list-meta2 d-flex justify-content-between align-items-center'>
                    <span className='for-what'>For Rent</span>
                    <div className='icons d-flex align-items-center'>
                      <div className='mr10'>
                        <span className='flaticon-fullscreen' />
                      </div>
                      <div className='mr10'>
                        <span className='flaticon-new-tab' />
                      </div>
                      <div className='mr10'>
                        <span className='flaticon-like' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default FeaturedListings
