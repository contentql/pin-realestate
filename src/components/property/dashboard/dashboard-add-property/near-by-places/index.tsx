// import StructureType from './StructureType'

const NearByPlace = ({
  register,
  educationFields,
  medicalFields,
  transportationFields,
  removeEducation,
  appendEducation,
  removeMedical,
  appendMedical,
  removeTransportation,
  appendTransportation,
}: any) => {
  return (
    <div>
      <div>
        <h2>Education</h2>
        {educationFields.map((field: any, index: number) => (
          <div key={field.id}>
            <input {...register(`educations.${index}.name` as const)} />
            <input
              {...register(`educations.${index}.distance` as const)}
              type='number'
            />
            <input
              {...register(`educations.${index}.rating` as const)}
              type='number'
            />
            <button type='button' onClick={() => removeEducation(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type='button' onClick={() => appendEducation({})}>
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
              type='number'
            />
            <input
              {...register(`medicals.${index}.rating` as const)}
              type='number'
            />
            <button type='button' onClick={() => removeMedical(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type='button' onClick={() => appendMedical({})}>
          Add Medical
        </button>
      </div>

      <div>
        <h2>Transportation</h2>
        {transportationFields.map((field: any, index: number) => (
          <div key={field.id}>
            <input {...register(`transportations.${index}.name` as const)} />
            <input
              {...register(`transportations.${index}.distance` as const)}
              type='number'
            />
            <input
              {...register(`transportations.${index}.rating` as const)}
              type='number'
            />
            <button type='button' onClick={() => removeTransportation(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type='button' onClick={() => appendTransportation({})}>
          Add Transportation
        </button>
      </div>
    </div>
  )
}

export default NearByPlace
