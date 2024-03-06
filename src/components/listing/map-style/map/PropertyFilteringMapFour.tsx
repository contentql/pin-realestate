'use client'

import listings from '@/data/listings'
import { useEffect, useState } from 'react'
import PaginationTwo from '../../PaginationTwo'
import ListingSidebar from '../../sidebar'
import ListingMap1 from '../ListingMap1'
import FeaturedListings from './FeatuerdListings'
import TopFilterBar from './TopFilterBar'
export default function PropertyFilteringMapFour() {
  const [filteredData, setFilteredData] = useState<any>([])

  const [currentSortingOption, setCurrentSortingOption] = useState('Newest')

  const [sortedFilteredData, setSortedFilteredData] = useState<any>([])

  const [pageNumber, setPageNumber] = useState(1)
  const [colstyle, setColstyle] = useState(false)
  const [pageItems, setPageItems] = useState<any>([])
  const [pageContentTrac, setPageContentTrac] = useState<any>([])

  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * 4, pageNumber * 4))
    setPageContentTrac([
      (pageNumber - 1) * 4 + 1,
      pageNumber * 4,
      sortedFilteredData.length,
    ])
  }, [pageNumber, sortedFilteredData])

  const [listingStatus, setListingStatus] = useState('All')
  const [propertyTypes, setPropertyTypes] = useState<any>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [bedrooms, setBedrooms] = useState(0)
  const [bathroms, setBathroms] = useState(0)
  const [location, setLocation] = useState('All Cities')
  const [squirefeet, setSquirefeet] = useState<any>([])
  const [yearBuild, setyearBuild] = useState<any>([])
  const [categories, setCategories] = useState<any>([])

  const resetFilter = () => {
    setListingStatus('All')
    setPropertyTypes([])
    setPriceRange([0, 100000])
    setBedrooms(0)
    setBathroms(0)
    setLocation('All Cities')
    setSquirefeet([])
    setyearBuild([0, 2050])
    setCategories([])
    setCurrentSortingOption('Newest')
    document.querySelectorAll('.filterInput').forEach(function (element: any) {
      element.value = null
    })

    document.querySelectorAll('.filterSelect').forEach(function (element: any) {
      element.value = 'All Cities'
    })
  }
  const [searchQuery, setSearchQuery] = useState('')

  const handlelistingStatus = (elm: any) => {
    setListingStatus(pre => (pre == elm ? 'All' : elm))
  }

  const handlepropertyTypes = (elm: any) => {
    if (elm == 'All') {
      setPropertyTypes([])
    } else {
      setPropertyTypes((pre: any) =>
        pre.includes(elm)
          ? [...pre.filter((el: any) => el != elm)]
          : [...pre, elm],
      )
    }
  }
  const handlepriceRange = (elm: any) => {
    setPriceRange(elm)
  }
  const handlebedrooms = (elm: any) => {
    setBedrooms(elm)
  }
  const handlebathroms = (elm: any) => {
    setBathroms(elm)
  }
  const handlelocation = (elm: any) => {
    console.log(elm)
    setLocation(elm)
  }
  const handlesquirefeet = (elm: any) => {
    setSquirefeet(elm)
  }
  const handleyearBuild = (elm: any) => {
    setyearBuild(elm)
  }
  const handlecategories = (elm: any) => {
    if (elm == 'All') {
      setCategories([])
    } else {
      setCategories((pre: any) =>
        pre.includes(elm)
          ? [...pre.filter((el: any) => el != elm)]
          : [...pre, elm],
      )
    }
  }
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,

    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  }

  useEffect(() => {
    const refItems = listings.filter(elm => {
      if (listingStatus == 'All') {
        return true
      } else if (listingStatus == 'Buy') {
        return !elm.forRent
      } else if (listingStatus == 'Rent') {
        return elm.forRent
      }
    })

    let filteredArrays: any[] = []

    if (propertyTypes.length > 0) {
      const filtered = refItems.filter(elm =>
        propertyTypes.includes(elm.propertyType),
      )
      filteredArrays = [...filteredArrays, filtered]
    }
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el: any) => el.bed >= bedrooms),
    ]
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el: any) => el.bath >= bathroms),
    ]
    filteredArrays = [
      ...filteredArrays,
      refItems.filter(
        el =>
          el.city
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.location
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.title
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.features
            .join(' ')
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()),
      ),
    ]

    filteredArrays = [
      ...filteredArrays,
      !categories.length
        ? [...refItems]
        : refItems.filter(elm =>
            categories.every((elem: any) => elm.features.includes(elem)),
          ),
    ]

    if (location != 'All Cities') {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter(el => el.city == location),
      ]
    }

    if (priceRange.length > 0) {
      const filtered = refItems.filter(
        elm =>
          Number(elm.price.split('$')[1].split(',').join('')) >=
            priceRange[0] &&
          Number(elm.price.split('$')[1].split(',').join('')) <= priceRange[1],
      )
      filteredArrays = [...filteredArrays, filtered]
    }
    if (squirefeet.length > 0 && squirefeet[1]) {
      const filtered = refItems.filter(
        elm => elm.sqft >= squirefeet[0] && elm.sqft <= squirefeet[1],
      )
      filteredArrays = [...filteredArrays, filtered]
    }
    if (yearBuild.length > 0) {
      const filtered = refItems.filter(
        elm =>
          elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1],
      )
      filteredArrays = [...filteredArrays, filtered]
    }

    const commonItems = refItems.filter(item =>
      filteredArrays.every(array => array.includes(item)),
    )

    setFilteredData(commonItems)
  }, [
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    searchQuery,
  ])

  useEffect(() => {
    setPageNumber(1)
    if (currentSortingOption == 'Newest') {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilding - b.yearBuilding,
      )
      setSortedFilteredData(sorted)
    } else if (currentSortingOption.trim() == 'Price Low') {
      const sorted = [...filteredData].sort(
        (a, b) =>
          a.price.split('$')[1].split(',').join('') -
          b.price.split('$')[1].split(',').join(''),
      )
      setSortedFilteredData(sorted)
    } else if (currentSortingOption.trim() == 'Price High') {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.price.split('$')[1].split(',').join('') -
          a.price.split('$')[1].split(',').join(''),
      )
      setSortedFilteredData(sorted)
    } else {
      setSortedFilteredData(filteredData)
    }
  }, [filteredData, currentSortingOption])
  return (
    <>
      <div
        className='offcanvas offcanvas-start p-0'
        tabIndex={-1}
        id='listingSidebarFilter'
        aria-labelledby='listingSidebarFilterLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='listingSidebarFilterLabel'>
            Listing Filter
          </h5>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body p-0'>
          <ListingSidebar filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End  filter sidebar */}

      {/* Property Filtering */}
      <section className='p-0 bgc-f7'>
        <div className='container-fluid'>
          <div className='row' data-aos='fade-up' data-aos-duration='200'>
            <div className='col-xl-5'>
              <div className='half_map_area_content mt30'>
                <h4 className='mb-1'>New York Homes for Sale</h4>

                <div className='row align-items-center mb10'>
                  <TopFilterBar
                    pageContentTrac={pageContentTrac}
                    colstyle={colstyle}
                    setColstyle={setColstyle}
                    setCurrentSortingOption={setCurrentSortingOption}
                  />
                </div>
                <div className='row'>
                  <FeaturedListings colstyle={colstyle} data={pageItems} />
                </div>
                {/* End .row */}

                <div className='row text-center'>
                  <PaginationTwo
                    pageCapacity={4}
                    data={sortedFilteredData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </div>
                {/* End .row */}
              </div>
              {/* End .half_map_area_content */}
            </div>
            {/* End col-5 */}

            <div className='col-xl-7 overflow-hidden position-relative'>
              <div className='half_map_area'>
                <a
                  data-bs-toggle='offcanvas'
                  href='#listingSidebarFilter'
                  role='button'
                  aria-controls='listingSidebarFilter'
                  className='filter-btn-left mobile-filter-btn map-page bgc-dark text-white d-block'
                >
                  <span className='flaticon-settings'></span> Show Filter
                </a>
                <div className=' map-canvas half_style'>
                  <ListingMap1 />
                </div>
              </div>
            </div>
            {/* End col-7 */}
          </div>
          {/* End TopFilterBar */}
        </div>
        {/* End .container */}
      </section>
    </>
  )
}
