'use client'
import {
  PropertyValidator,
  TPropertyValidator,
} from '@/lib/validators/property-router/property-validator'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'
import Amenities from './Amenities'
import LocationField from './LocationField'
import DetailsFiled from './details-field'
import Floors from './floors-field/Floors'
import PropertyDescription from './property-description'
import UploadMedia from './upload-media'
import NearByPlace from './near-by-places'

const AddPropertyTabContent = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TPropertyValidator>({
    resolver: zodResolver(PropertyValidator),
  })

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'educations',
  })
  const {
    fields: medicalFields,
    append: appendMedical,
    remove: removeMedical,
  } = useFieldArray({
    control,
    name: 'medicals',
  })
  const {
    fields: transportationFields,
    append: appendTransportation,
    remove: removeTransportation,
  } = useFieldArray({
    control,
    name: 'transportations',
  })

  const { mutate: addProperty } = trpc.properties.addProperty.useMutation({
    onError: err => {
      if (err.data?.code === 'NOT_FOUND') {
        toast.error('Account does not exist')

        return
      }
      if (err.data?.code === 'UNAUTHORIZED') {
        // in toast
        toast.error('E-mail or Password incorrect')

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
      toast.success('Login succcessfully')
    },
  })

  const onSubmit = (data: TPropertyValidator, error: any) => {
    console.log('Form Data: ', data)
    console.log('error', error)
    addProperty(data)
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
            id='nav-item7-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item7'
            type='button'
            role='tab'
            aria-controls='nav-item7'
            aria-selected='false'>
            6. Nearby Places
          </button>
          <button
            className='nav-link fw600'
            id='nav-item5-tab'
            data-bs-toggle='tab'
            data-bs-target='#nav-item5'
            type='button'
            role='tab'
            aria-controls='nav-item5'
            aria-selected='false'>
            7. Amenities
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
            <UploadMedia register={register} />
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
              <Floors register={register} />
            </div>
          </div>

          {/* Start tab for Near Places Details */}
          <div
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
                    <div key={field.id}>
                      <input
                        {...register(`educations.${index}.name` as const)}
                      />
                      <input
                        {...register(`educations.${index}.distance` as const)}
                      />

                      <button
                        type='button'
                        onClick={() => removeEducation(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() => appendEducation({ name: '', distance: '' })}>
                    Add Education
                  </button>
                </div>

                <div>
                  <h2>Medical</h2>
                  {medicalFields.map((field: any, index: number) => (
                    <div key={field.id}>
                      <input {...register(`medicals.${index}.name` as const)} />
                      <input
                        {...register(`medicals.${index}.distance` as const)}
                      />
                      <button
                        type='button'
                        onClick={() => removeMedical(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      appendMedical({
                        name: '',
                        distance: '',
                      })
                    }>
                    Add Medical
                  </button>
                </div>

                <div>
                  <h2>Transportation</h2>
                  {transportationFields.map((field: any, index: number) => (
                    <div key={field.id}>
                      <input
                        {...register(`transportations.${index}.name` as const)}
                      />
                      <input
                        {...register(
                          `transportations.${index}.distance` as const,
                        )}
                      />

                      <button
                        type='button'
                        onClick={() => removeTransportation(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      appendTransportation({ name: '', distance: '' })
                    }>
                    Add Transportation
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className='tab-pane fade'
            id='nav-item5'
            role='tabpanel'
            aria-labelledby='nav-item5-tab'>
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
