'use client'

import React, { useEffect, useState } from 'react'
import TopFilter from './TopFilter'
import AllAgents from './agents/AllAgents';
import {agentsData} from '@/data/agents';
import PaginationTwo from '../listing/PaginationTwo';
export default function FilteringAgent() {

    const [filteredData, setFilteredData] = useState<any>([]);
    const [currentSortingOption, setCurrentSortingOption] = useState<any>('Newest')
    const [sortedFilteredData, setSortedFilteredData] = useState<any>([]);
        const [pageNumber, setPageNumber] = useState<any>(1)
    const [pageItems, setPageItems] = useState<any>([])
    const [pageContentTrac, setPageContentTrac] = useState<any>([])
    const [searchQuery, setSearchQuery] = useState<any>('')
    useEffect(() => {
      setPageItems(sortedFilteredData
        .slice((pageNumber - 1) * 15, pageNumber * 15))
        setPageContentTrac([((pageNumber - 1) * 15) + 1 ,pageNumber * 15,sortedFilteredData.length])
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
    const handlepropertyTypes =(elm: any)=>{

      if (elm == 'All') {
        setPropertyTypes([])
        
      } else {
        setPropertyTypes((pre: any)=>pre.includes(elm) ? [...pre.filter((el : any)=>el!=elm)] : [...pre,elm])
      }
    }
  
    const handlelocation =(elm: any)=>{
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
      
        const refItems = agentsData.filter((elm) => {
         return  elm
          });
      
          let filteredArrays : any = [];
      
          if (propertyTypes.length > 0) {
            const filtered = refItems.filter((elm) =>
            propertyTypes.includes(elm.category)
            );
            filteredArrays = [...filteredArrays, filtered];
          }
          filteredArrays = [...filteredArrays,refItems.filter((el=>el.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) )) ];
         
          if (location != 'All Cities') {
            filteredArrays = [...filteredArrays,refItems.filter((el=>el.city == location)) ];
          }

          const commonItems = refItems.filter((item) =>
            filteredArrays.every((array: any) => array.includes(item))
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
            className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <AllAgents data={pageItems}/>
          </div>
          {/* End .row */}

          <div className="row justify-content-center mt20">
            <PaginationTwo pageNumber={pageNumber} setPageNumber={setPageNumber} data={sortedFilteredData} pageCapacity={15}/>
          </div>
        </div>
      </section>
  )
}
