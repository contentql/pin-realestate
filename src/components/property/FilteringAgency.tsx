'use client'

import React, { useEffect, useState } from 'react'
import TopFilter from './TopFilter'
import PaginationTwo from '../listing/PaginationTwo';
import {agencyData} from '@/data/agency';
import AllAgents from './agency/AllAgency';

export default function FilteringAgency() {
    const [filteredData, setFilteredData] = useState<any>([]);

    const [currentSortingOption, setCurrentSortingOption] = useState<any>('Newest')

    const [sortedFilteredData, setSortedFilteredData] = useState<any>([]);

    const [pageNumber, setPageNumber] = useState<any>(1)

    const [pageItems, setPageItems] = useState<any>([])

    const [pageContentTrac, setPageContentTrac] = useState<any>([])

     const [searchQuery, setSearchQuery] = useState<any>('')

    useEffect(() => {
      setPageItems(sortedFilteredData
        .slice((pageNumber - 1) * 14, pageNumber * 14))
        setPageContentTrac([((pageNumber - 1) * 14) + 1 ,pageNumber * 14,sortedFilteredData.length])
    }, [pageNumber,sortedFilteredData])
    const [propertyTypes, setPropertyTypes] = useState<any>([])
    const [location, setLocation] = useState<any>('All Cities')
    const resetFilter = ()=>{

      setPropertyTypes([])
      setLocation('All Cities')
      setCurrentSortingOption('Newest')
     document.querySelectorAll(".filterInput").forEach(function(element : any) {
      element.value = null;
  });

    }
    const handlepropertyTypes =(elm : any)=>{

      if (elm == 'All') {
        setPropertyTypes([])
        
      } else {
        setPropertyTypes((pre :  any) =>pre.includes(elm) ? [...pre.filter((el : any)=>el!=elm)] : [...pre,elm])
      }
    }
  
    const handlelocation =(elm : any)=>{
      console.log(elm)
      setLocation(elm)
    }


    
   const filterFunctions={
    handlepropertyTypes,
    
    handlelocation,
    setSearchQuery,
    
    propertyTypes,
    resetFilter,
    location,
    setPropertyTypes,
  }



    useEffect(() => {
      
        const refItems = agencyData.filter((elm : any) => {
         return  elm
          });
      
          let filteredArrays : any = [];
      
          if (propertyTypes.length > 0) {
            const filtered = refItems.filter((elm : any) =>
            propertyTypes.includes(elm.category)
            );
            filteredArrays = [...filteredArrays, filtered];
          }
          filteredArrays = [...filteredArrays,refItems.filter(((el: any)=>el.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) )) ];
         

          if (location != 'All Cities') {
            filteredArrays = [...filteredArrays,refItems.filter(((el: any) =>el.city == location)) ];
          }

          const commonItems = refItems.filter((item :any) =>
            filteredArrays.every((array : any) => array.includes(item))
          );
          setFilteredData(commonItems);
    }, [
       
        propertyTypes,
        location,
        searchQuery
    ])

    useEffect(() => {
      setPageNumber(1)
      setSortedFilteredData(filteredData)
    }, [filteredData,currentSortingOption,])
    
    
  return (
    <section className="our-agents pt-0">
        <div className="container">
          <div className="row align-items-center mb20">
            <TopFilter  filterFunctions={filterFunctions} />
          </div>
          {/* End .row */}

          <div
            className="row"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <AllAgents data={pageItems}/>
          </div>
          {/* End .row */}

          <div className="row justify-content-center mt20">
            <PaginationTwo pageNumber={pageNumber} setPageNumber={setPageNumber} data={sortedFilteredData} pageCapacity={14}/>
          </div>
        </div>
      </section>
  )
}
