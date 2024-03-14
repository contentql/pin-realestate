import { Property } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

const ContactWithAgent = ({ owner }: { owner: Property['_owner'] }) => {
  return (
    <>
      <div className='agent-single d-sm-flex align-items-center pb25'>
        <div className='single-img mb30-sm'>
          <Image
            width={90}
            height={90}
            className='w90'
            src='/images/team/agent-3.png'
            alt='avatar'
          />
        </div>
        <div className='single-contant ml20 ml0-xs'>
          <h6 className='title mb-1'>{owner?.name}</h6>
          <div className='agent-meta mb10 d-md-flex align-items-center'>
            <a className='text fz15' href='#'>
              <i className='flaticon-call pe-1' />
              {owner?.mobileNumber}
            </a>
          </div>
          <Link href='/agent/3' className='text-decoration-underline fw600'>
            View Listings
          </Link>
        </div>
      </div>
      {/* End agent */}

      <div className='d-grid'>
        <Link href='/agent/3' className='ud-btn btn-white2'>
          Contact Agent
          <i className='fal fa-arrow-right-long' />
        </Link>
      </div>
    </>
  )
}

export default ContactWithAgent
