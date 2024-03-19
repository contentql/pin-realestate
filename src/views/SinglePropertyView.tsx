'use client'
import DefaultHeader from '@/components/common/DefaultHeader'
import Footer from '@/components/common/default-footer'
import MobileMenu from '@/components/common/mobile-menu'
import FloorPlans from '@/components/property/property-single-style/common/FloorPlans'
import MortgageCalculator from '@/components/property/property-single-style/common/MortgageCalculator'
import NearbySimilarProperty from '@/components/property/property-single-style/common/NearbySimilarProperty'
import OverView from '@/components/property/property-single-style/common/OverView'
import PropertyAddress from '@/components/property/property-single-style/common/PropertyAddress'
import PropertyDetails from '@/components/property/property-single-style/common/PropertyDetails'
import PropertyFeaturesAminites from '@/components/property/property-single-style/common/PropertyFeaturesAminites'
import PropertyHeader from '@/components/property/property-single-style/common/PropertyHeader'
import PropertyVideo from '@/components/property/property-single-style/common/PropertyVideo'
import ProperytyDescriptions from '@/components/property/property-single-style/common/ProperytyDescriptions'
import ReviewBoxForm from '@/components/property/property-single-style/common/ReviewBoxForm'
import InfoWithForm from '@/components/property/property-single-style/common/more-info'
import AllReviews from '@/components/property/property-single-style/common/reviews'
import ContactWithAgent from '@/components/property/property-single-style/sidebar/ContactWithAgent'
import ScheduleTour from '@/components/property/property-single-style/sidebar/ScheduleTour'
import PropertyGallery from '@/components/property/property-single-style/single-v6/PropertyGallery'
import { Media, Property } from '@/payload-types'
import { trpc } from '@/trpc/client'

// export const metadata = {
//   title: 'Property',
// };



const PropertyById = ({ params }: { params: any }) => {
  const { data: propertiesListData, isLoading } =
    trpc.properties.byPropertyId.useQuery({ id: params.id })

  const propertyType =
    propertiesListData?._propertyDetails.saleType?.length == 0
      ? propertiesListData?._propertyDetails?.saleType[0]
      : propertiesListData?._propertyDetails?.saleType &&
        propertiesListData?._propertyDetails?.saleType.join(' and ')

  const media = propertiesListData?._assets?.allMedia
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single  */}
      <section className='pt60 pb90 bgc-f7'>
        <div className='container'>
          <div className='row'>
            <PropertyHeader data={propertiesListData!} />
          </div>
          {/* End .row */}

          <div className='row wrap'>
            <div className='col-lg-8'>
              <PropertyGallery images={media} />
              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Overview</h4>
                <div className='row'>
                  <OverView
                    data={propertiesListData?._details!}
                    propertyType={propertyType!}
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Property Description</h4>
                <ProperytyDescriptions
                  data={propertiesListData?._propertyDetails?.description}
                />
                {/* End property description */}

                <h4 className='title fz17 mb30 mt50'>Property Details</h4>
                <div className='row'>
                  <PropertyDetails data={propertiesListData as Property} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30 mt30'>Address</h4>
                <div className='row'>
                  <PropertyAddress
                    address={
                      propertiesListData?._location as Property['_location']
                    }
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Features &amp; Amenities</h4>
                <div className='row'>
                  <PropertyFeaturesAminites
                    featuresAmenitiesData={
                      propertiesListData?._amenities?.amenities
                    }
                  />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Energy Class</h4>
                <div className='row'>
                  <EnergyClass />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Floor Plans</h4>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='accordion-style1 style2'>
                      <FloorPlans
                        floorPlanData={
                          propertiesListData?._floors
                            ?.floors as Property['_floors']['floors']
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 '>
                <h4 className='title fz17 mb30'>Video</h4>
                <div className='row'>
                  <PropertyVideo />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>360° Virtual Tour</h4>
                <div className='row'>
                  <VirtualTour360 />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>What&apos;s Nearby?</h4>
                <div className='row'>
                  <PropertyNearby data={propertiesListData} />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Walkscore</h4>
                <div className='row'>
                  <div className='col-md-12'>
                    <h4 className='fw400 mb20'>
                      10425 Tabor St Los Angeles CA 90034 USA
                    </h4>
                    <WalkScore />
                  </div>
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Mortgage Calculator</h4>
                <div className='row'>
                  <MortgageCalculator />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <div className='row'>
                  <PropertyViews />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Home Value</h4>
                <div className='row'>
                  <HomeValueChart />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Get More Information</h4>
                <InfoWithForm
                  owner={propertiesListData?._owner as Property['_owner']}
                />
              </div>
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <div className='row'>
                  {/* <AllComments /> */}
                  <AllReviews />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                <h4 className='title fz17 mb30'>Leave A Review</h4>
                <div className='row'>
                  <ReviewBoxForm />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className='col-lg-4'>
              <div className='column'>
                <div className='default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative'>
                  <h4 className='form-title mb5'>Schedule a tour</h4>
                  <p className='text'>Choose your preferred day</p>
                  <ScheduleTour />
                </div>
                {/* End .Schedule a tour */}

                <div className='agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30'>
                  <div className='widget-wrapper mb-0'>
                    <h6 className='title fz17 mb30'>Get More Information</h6>
                    <ContactWithAgent
                      owner={propertiesListData?._owner as Property['_owner']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className='row mt30 align-items-center justify-content-between'>
            <div className='col-auto'>
              <div className='main-title'>
                <h2 className='title'>Discover Our Featured Listings</h2>
                <p className='paragraph'>
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
            {/* End header */}

            <div className='col-auto mb30'>
              <div className='row align-items-center justify-content-center'>
                <div className='col-auto'>
                  <button className='featured-prev__active swiper_button'>
                    <i className='far fa-arrow-left-long' />
                  </button>
                </div>
                {/* End prev */}

                <div className='col-auto'>
                  <div className='pagination swiper--pagination featured-pagination__active' />
                </div>
                {/* End pagination */}

                <div className='col-auto'>
                  <button className='featured-next__active swiper_button'>
                    <i className='far fa-arrow-right-long' />
                  </button>
                </div>
                {/* End Next */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className='row'>
            <div className='col-lg-12'>
              <div className='property-city-slider'>
                <NearbySimilarProperty />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single   */}

      {/* Start Our Footer */}
      <section className='footer-style1 pt60 pb-0'>
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  )
}

export default PropertyById
