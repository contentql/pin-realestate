'use client'
import DashboardHeader from '@/components/common/DashboardHeader'
import MobileMenu from '@/components/common/mobile-menu'
import DboardMobileNavigation from '@/components/property/dashboard/DboardMobileNavigation'
import Footer from '@/components/property/dashboard/Footer'
import SidebarDashboard from '@/components/property/dashboard/SidebarDashboard'
import PersonalInfo from '@/components/property/dashboard/dashboard-profile/PersonalInfo'
import ProfileBox from '@/components/property/dashboard/dashboard-profile/ProfileBox'
import {
  TUserProfileValidator,
  UserProfileValidator,
} from '@/lib/validators/auth-router/user-profile-validator'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import uploadMedia from '@/utilis/uploadMedia'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'

export const metadata = {
  title: 'My Profile',
}

const DashboardMyProfileView = () => {
  const { setUser } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TUserProfileValidator>({
    resolver: zodResolver(UserProfileValidator),
  })

  const [uploadedImage, setUploadedImage] = useState<any>()

  const { mutate: updateUserData } = trpc.auth.updateUserData.useMutation({
    onError: err => {
      if (err.data?.code === 'NOT_FOUND') {
        toast.error('Account does not exist')

        return
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message)

        return
      }

      console.error('Something went wrong. Please try again.')
    },
    onSuccess: data => {
      setUploadedImage(null)
      setUser(data.succuss)
      toast.success('Details updated')
    },
  })

  const onSubmit = async (data: TUserProfileValidator) => {
    try {
      if (uploadedImage !== undefined) {
        const doc = await uploadMedia(uploadedImage)
        data.profile_pic = doc?.id
      }

      updateUserData(data)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className='dashboard_content_wrapper'>
        <div className='dashboard dashboard_wrapper pr30 pr0-xl'>
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='dashboard__main pl0-md'>
              <div className='dashboard__content bgc-f7'>
                <div className='row pb40'>
                  <div className='col-lg-12'>
                    <DboardMobileNavigation />
                  </div>
                  {/* End .col-12 */}
                </div>
                {/* End .row */}

                <div className='row align-items-center pb40'>
                  <div className='col-lg-12'>
                    <div className='dashboard_title_area'>
                      <h2>My Profile</h2>
                      <p className='text'>We are glad to see you again!</p>
                    </div>
                  </div>
                </div>
                {/* End .row */}

                <div className='row'>
                  <div className='col-xl-12'>
                    <div className='ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative'>
                      <div className='col-xl-7'>
                        <ProfileBox
                          register={register}
                          uploadedImage={uploadedImage}
                          setUploadedImage={setUploadedImage}
                        />
                      </div>
                      {/* End ProfileBox */}

                      <div className='col-lg-12'>
                        <PersonalInfo register={register} />
                      </div>
                      {/* End PersonalInfo */}
                    </div>
                    {/* End .ps-widget */}
                  </div>
                </div>
                {/* End .row */}
              </div>
              {/* End .dashboard__content */}

              <Footer />
            </div>
          </form>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  )
}

export default DashboardMyProfileView
