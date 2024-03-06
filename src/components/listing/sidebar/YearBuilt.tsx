'use client'

const YearBuilt = ({ filterFunctions }: any) => {
  return (
    <div className='space-area'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='form-style1'>
          <input
            type='number'
            onChange={e => {
              const maxFeet2: any = document.getElementById('maxFeet2')
              return filterFunctions?.handleyearBuild(
                [e.target.value || 1800, maxFeet2?.value / 1] || 2050,
              )
            }}
            className='form-control filterInput'
            placeholder='2019'
            id='minFeet2'
          />
        </div>
        <span className='dark-color'>-</span>
        <div className='form-style1'>
          <input
            type='number'
            onChange={e =>
              filterFunctions?.handleyearBuild([
                (document.getElementById('minFeet2') as any)?.value / 1 || 1800,
                e.target.value || 2050,
              ])
            }
            className='form-control filterInput'
            placeholder='2022'
            id='maxFeet2'
          />
        </div>
      </div>
    </div>
  )
}

export default YearBuilt
