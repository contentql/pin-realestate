'use client'

import { useEffect, useState } from 'react'
import ListingSidebar from '../sidebar'
import FeaturedListings from './FeatuerdListings'
import TopFilterBar from './TopFilterBar'

import { trpc } from '@/trpc/client'
import PaginationTwo from '../PaginationTwo'

export default function PropertyFiltering() {
  const [filteredData, setFilteredData] = useState<any>([])

  const [currentSortingOption, setCurrentSortingOption] = useState('Newest')

  const [sortedFilteredData, setSortedFilteredData] = useState<any>([])
  const [pageNumber, setPageNumber] = useState(1)

  const [colstyle, setColstyle] = useState(false)
  const [pageItems, setPageItems] = useState<any>([])

  const [pageContentTrac, setPageContentTrac] = useState<any>([])

  const { data: propertiesListData, isLoading } =
    trpc.properties.getProperties.list.useQuery()

  console.log('Hello', propertiesListData)

  useEffect(() => {
    setPageItems(sortedFilteredData.slice((pageNumber - 1) * 8, pageNumber * 8))
    setPageContentTrac([
      (pageNumber - 1) * 8 + 1,
      pageNumber * 8,
      sortedFilteredData.length,
    ])
  }, [pageNumber, sortedFilteredData])

  const [listingStatus, setListingStatus] = useState('All')
  const [propertyTypes, setPropertyTypes] = useState<any>([])
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [bedrooms, setBedrooms] = useState(0)
  const [bathroms, setBathroms] = useState(0)
  const [location, setLocation] = useState('All Cities')
  const [squirefeet, setSquirefeet] = useState([])
  const [yearBuild, setyearBuild] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [searchQuery, setSearchQuery] = useState('')

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
  }

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
    if (!propertiesListData) return
    const refItems = propertiesListData?.filter((elm: any) => {
      if (listingStatus == 'All') {
        return true
      } else if (listingStatus == 'Rent') {
        return !elm.propertiesDetails.status.includes('For rent')
      } else if (listingStatus == 'Buy') {
        return elm.propertiesDetails.status.includes('For sale')
      }
    })

    let filteredArrays: any[] = []

    console.log('refItems', refItems) // working

    if (propertyTypes.length > 0) {
      const filtered = refItems.filter((elm: any) =>
        propertyTypes.includes(elm.propertiesDetails.propertyType.value.type),
      )
      filteredArrays = [...filteredArrays, filtered]
    }
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el: any) => el.details.beds >= bedrooms),
    ]
    filteredArrays = [
      ...filteredArrays,
      refItems.filter((el: any) => el.details.baths >= bathroms),
    ]
    filteredArrays = [
      ...filteredArrays,
      refItems.filter(
        (el: any) =>
          el.location.city
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.location.address
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.propertiesDetails.title
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase()) ||
          el.amenities
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
            categories.every((elem: any) => elm.amenities?.includes(elem)),
          ),
    ]

    if (location != 'All Cities') {
      filteredArrays = [
        ...filteredArrays,
        refItems.filter(el => el.location.city == location),
      ]
    }

    if (priceRange.length > 0) {
      const filtered = refItems.filter(
        (elm: any) =>
          Number(elm.propertiesDetails.price) >= priceRange[0] &&
          Number(elm.propertiesDetails.price) <= priceRange[1],
      )
      filteredArrays = [...filteredArrays, filtered]
    }

    if (squirefeet.length > 0 && squirefeet[1]) {
      const filtered = refItems.filter(
        (elm: any) =>
          elm.details.homearea >= Number(squirefeet[0]) &&
          elm.details.homearea <= Number(squirefeet[1]),
      )
      filteredArrays = [...filteredArrays, filtered]
    }
    if (yearBuild.length > 0) {
      const filtered = refItems.filter(
        (elm: any) =>
          elm.details.yearBuild >= Number(yearBuild[0]) &&
          elm.details.yearBuild <= Number(yearBuild[1]),
      )
      filteredArrays = [...filteredArrays, filtered]
    }

    const commonItems = refItems.filter(item =>
      filteredArrays.every(array => array.includes(item)),
    )

    console.log('commonItems', commonItems)

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
    propertiesListData,
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
    <section className='pt0 pb90 bgc-f7'>
      <div className='container'>
        <div className='row gx-xl-5'>
          <div className='col-lg-4 d-none d-lg-block'>
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
          {/* End .col-lg-4 */}

          {/* start mobile filter sidebar */}
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
          {/* End mobile filter sidebar */}

          <div className='col-lg-8'>
            <div className='row align-items-center mb20'>
              <TopFilterBar
                pageContentTrac={pageContentTrac}
                colstyle={colstyle}
                setColstyle={setColstyle}
                setCurrentSortingOption={setCurrentSortingOption}
              />
            </div>
            {/* End TopFilterBar */}

            <div className='row mt15'>
              <FeaturedListings colstyle={colstyle} data={pageItems} />
            </div>
            {/* End .row */}

            <div className='row'>
              <PaginationTwo
                pageCapacity={8}
                data={sortedFilteredData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </div>
            {/* End .row */}
          </div>
          {/* End .col-lg-8 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  )
}
