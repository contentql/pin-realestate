'use client'
import {
  PropertyValidator,
  TPropertyValidator,
} from '@/lib/validators/property-router/property-validator'
import { trpc } from '@/trpc/client'
import uploadMedia from '@/utilis/uploadMedia'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'
import Amenities from './Amenities'
import LocationField from './LocationField'
import DetailsFiled from './details-field'
import Floors from './floors-field/Floors'
import OwnerFeilds from './owner-details'
import PropertyDescription from './property-description'
import UploadMedia from './upload-media'

const AddPropertyTabContent = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [assets, setAssets] = useState([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TPropertyValidator>({
    resolver: zodResolver(PropertyValidator),
  })

  const { mutate: addProperty } = trpc.properties.addProperty.useMutation({
    onError: err => {
      if (err.data?.code === 'NOT_FOUND') {
        toast.error('Account does not exist')

        return
      }
      if (err.data?.code === 'UNAUTHORIZED') {
        // in toast
        toast.error('You are not authorized')

        return
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message)

        return
      }

      console.error('Something went wrong. Please try again.')
    },
    onSuccess: () => {
      toast.success('Added succcessfully')
    },
  })

  const onSubmit = async (data: TPropertyValidator, error: any) => {
    const doc = await uploadMedia(data.floors.at(0)?.floorImage)

    if (doc?.id) {
      const dummyData = {
        ...data,
        floors: [...data.floors],
        assets,
      }
      dummyData.floors[0].floorImage = doc.id

      await addProperty(dummyData)
    }
  }

  return (
    <>
      <nav>
        <div className='nav nav-tabs' id='nav-tab2' role='tablist'>
          <button
            className='nav-link active fw600 ms-3'
            id='nav-item1-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item1'
            type='button'
            role='tab'
            aria-controls='nav-item1'
            aria-selected='true'>
            1. Description
          </button>
          <button
            className='nav-link fw600'
            id='nav-item2-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item2'
            type='button'
            role='tab'
            aria-controls='nav-item2'
            aria-selected='false'>
            2. Media
          </button>
          <button
            className='nav-link fw600'
            id='nav-item3-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item3'
            type='button'
            role='tab'
            aria-controls='nav-item3'
            aria-selected='false'>
            3. Location
          </button>
          <button
            className='nav-link fw600'
            id='nav-item4-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item4'
            type='button'
            role='tab'
            aria-controls='nav-item4'
            aria-selected='false'>
            4. Detail
          </button>
          <button
            className='nav-link fw600'
            id='nav-item6-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item6'
            type='button'
            role='tab'
            aria-controls='nav-item6'
            aria-selected='false'>
            5. Floors
          </button>
          <button
            className='nav-link fw600'
            id='nav-item8tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item8'
            type='button'
            role='tab'
            aria-controls='nav-item8'
            aria-selected='false'>
            5. Owner Details
          </button>
          {/* <button
            className='nav-link fw600'
            id='nav-item7-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item7'
            type='button'
            role='tab'
            aria-controls='nav-item7'
            aria-selected='false'>
            6. Nearby Places
          </button> */}
          <button
            className='nav-link fw600'
            id='nav-item9-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item9'
            type='button'
            role='tab'
            aria-controls='nav-item9'
            aria-selected='false'>
            6. Amenities
          </button>
        </div>
      </nav>
      {/* End nav tabs */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='tab-content' id='nav-tabContent'>
          <div
            className='tab-pane fade show active'
            id='nav-item1'
            role='tabpanel'
            aria-labelledby='nav-item1-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Property Description</h4>
              <PropertyDescription register={register} />
            </div>
          </div>
          {/* End tab for Property Description */}

          <div
            className='tab-pane fade'
            id='nav-item2'
            role='tabpanel'
            aria-labelledby='nav-item2-tab'>
            <UploadMedia register={register} setAssets={setAssets} />
          </div>
          {/* End tab for Upload photos of your property */}

          <div
            className='tab-pane fade'
            id='nav-item3'
            role='tabpanel'
            aria-labelledby='nav-item3-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Listing Location</h4>
              <LocationField register={register} />
            </div>
          </div>
          {/* End tab for Listing Location */}

          <div
            className='tab-pane fade'
            id='nav-item4'
            role='tabpanel'
            aria-labelledby='nav-item4-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Listing Details</h4>
              <DetailsFiled register={register} />
            </div>
          </div>
          {/* End tab for Listing Details */}

          <div
            className='tab-pane fade'
            id='nav-item6'
            role='tabpanel'
            aria-labelledby='nav-item6-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Listing Details</h4>
              <Floors setFiles={setFiles} register={register} />
            </div>
          </div>

          <div
            className='tab-pane fade'
            id='nav-item8'
            role='tabpanel'
            aria-labelledby='nav-item8-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Listing Details</h4>
              <OwnerFeilds control={control} register={register} />
            </div>
          </div>

          {/* Start tab for Near Places Details */}
          {/* <div
            className='tab-pane fade'
            id='nav-item7'
            role='tabpanel'
            aria-labelledby='nav-item7-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Listing Details</h4>
              <div>
                <div>
                  <h2>Education</h2>
                  {educationFields.map((field: any, index: number) => (
                    <div className='col-sm-4 col-xl-5' key={field.id}>
                      <input
                        className='form-control mb10'
                        placeholder='Name of the nearest educational place'
                        {...register(`educations.${index}.name` as const)}
                      />
                      <input
                        className='form-control mb10 '
                        placeholder='Distance between places'
                        {...register(`educations.${index}.distance` as const)}
                      />

                      <button
                        type='button'
                        className='ud-btn2 right-center btn-thm btn-thm-border btn-dark  mb10'
                        onClick={() => removeEducation(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='custom-btn btn-thm3 btn-dark mb10'
                    onClick={() => appendEducation({ name: '', distance: '' })}>
                    Add Education
                  </button>
                </div>

                <div>
                  <h2>Medical</h2>
                  {medicalFields.map((field: any, index: number) => (
                    <div className='col-sm-4 col-xl-5' key={field.id}>
                      <input
                        className='form-control mb10'
                        placeholder='Name of the nearest hospital place'
                        {...register(`medicals.${index}.name` as const)}
                      />
                      <input
                        className='form-control mb10'
                        placeholder='Distance between'
                        {...register(`medicals.${index}.distance` as const)}
                      />
                      <button
                        type='button'
                        className='ud-btn2 right-center btn-thm mb10'
                        onClick={() => removeMedical(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='custom-btn btn-thm3 btn-dark mb10'
                    onClick={() =>
                      appendMedical({
                        name: '',
                        distance: '',
                      })
                    }>
                    Add Medical
                  </button>
                </div>

                <div className=''>
                  <h2>Transportation</h2>
                  {transportationFields.map((field: any, index: number) => (
                    <div key={field.id} className='col-sm-4 col-xl-5'>
                      <input
                        className='form-control mb10 mt10'
                        {...register(`transportations.${index}.name` as const)}
                        placeholder='Name of your nearest transport facility'
                      />
                      <input
                        className='form-control mb10'
                        {...register(
                          `transportations.${index}.distance` as const,
                        )}
                        placeholder='Distance between'
                      />

                      <button
                        type='button'
                        className='ud-btn2 right-center btn-thm mb10'
                        onClick={() => removeTransportation(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='custom-btn btn-thm3 btn-dark mb10'
                    onClick={() =>
                      appendTransportation({ name: '', distance: '' })
                    }>
                    Add Transportation
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <div
            className='tab-pane fade'
            id='nav-item9'
            role='tabpanel'
            aria-labelledby='nav-item9-tab'>
            <div className='ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative'>
              <h4 className='title fz17 mb30'>Select Amenities</h4>
              <div className='row'>
                <Amenities register={register} />
              </div>
            </div>
          </div>
          {/* End tab for Select Amenities */}
        </div>
      </form>
    </>
  )
}

export default AddPropertyTabContent
