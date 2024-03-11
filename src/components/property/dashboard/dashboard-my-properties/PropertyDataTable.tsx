'use client'
import { trpc } from '@/trpc/client'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { ZodError } from 'zod'

// const propertyData = [
//   {
//     id: 1,
//     title: 'Equestrian Family Home',
//     imageSrc: '/images/listings/list-1.jpg',
//     location: 'California City, CA, USA',
//     price: '$14,000/mo',
//     datePublished: 'December 31, 2022',
//     status: 'Pending',
//   },
// ]

const getStatusStyle = (status: any) => {
  switch (status) {
    case 'Pending':
      return 'pending-style style1'
    case 'Published':
      return 'pending-style style2'
    case 'Processing':
      return 'pending-style style3'
    default:
      return status
  }
}

const PropertyDataTable = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteUser } = trpc.properties.deletePropertyId.useMutation({
    onError: err => {
      if (err?.message === 'Invalid login') {
        toast.error('Account does not exist')

        return
      }
      // if (err?.message === 'UNAUTHORIZED') {
      //   // in toast
      //   toast.error('E-mail or Password incorrect')

      //   return
      // }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message)

        return
      }

      console.error('Something went wrong. Please try again.')
    },
    onSuccess: () => {
      toast.success('Deleted succcessfully')

      propertiesRefetch()
    },
  })

  const handleDeleteProperty = (id: any) => {
    deleteUser({ id })
  }

  const {
    data: propertyData,
    isLoading,
    refetch: propertiesRefetch,
  } = trpc.properties.getPropertiesForMyPropertiesPage.list.useQuery()

  return (
    <table className='table-style3 table at-savesearch'>
      <thead className='t-head'>
        <tr>
          <th scope='col'>Listing title</th>
          <th scope='col'>Date Published</th>
          <th scope='col'>Status</th>
          <th scope='col'>View</th>
          <th scope='col'>Action</th>
        </tr>
      </thead>
      <tbody className='t-body'>
        {propertyData?.map(property => (
          <tr key={property.id}>
            <th scope='row'>
              <div className='listing-style1 dashboard-style d-xxl-flex align-items-center mb-0'>
                <div className='list-thumb'>
                  <Image
                    width={110}
                    height={94}
                    className='w-100'
                    src={'http://localhost:3000/media/download-2.jpg'}
                    alt='property'
                  />
                </div>
                <div className='list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4'>
                  <div className='h6 list-title'>
                    <Link href={`/property/${property.id}`}>
                      {property.title}
                    </Link>
                  </div>
                  <p className='list-text mb-0'>{property.location}</p>
                  <div className='list-price'>
                    <a href='#'>{property.price}</a>
                  </div>
                </div>
              </div>
            </th>
            <td className='vam'>{property.datePublished}</td>
            <td className='vam'>
              <span className={getStatusStyle(property.status)}>
                {property.status}
              </span>
            </td>
            <td className='vam'>{property.datePublished}</td>
            <td className='vam'>
              <div className='d-flex'>
                <button
                  className='icon'
                  style={{ border: 'none' }}
                  data-tooltip-id={`edit-${property.id}`}>
                  <span className='fas fa-pen fa' />
                </button>
                <button
                  className='icon'
                  style={{ border: 'none' }}
                  data-tooltip-id={`delete-${property.id}`}
                  onClick={() => {
                    handleDeleteProperty(property.id)
                  }}>
                  <span className='flaticon-bin' />
                </button>

                <ReactTooltip
                  id={`edit-${property.id}`}
                  place='top'
                  content='Edi'
                />
                <ReactTooltip
                  id={`delete-${property.id}`}
                  place='top'
                  content='Delete'
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PropertyDataTable
