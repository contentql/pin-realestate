'use client'

import MainMenu from '@/components/common/MainMenu'
import LoginSignupModal from '@/components/common/login-signup-modal'
import SidebarPanel from '@/components/common/sidebar-panel'
import { Media } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const { status, logout, user } = useAuth()

  const {
    isPending: isLogoutPending,
    variables: logoutVariables,
    mutate: logoutMutation,
  } = useMutation({
    mutationKey: ['/api/users/logout', 'post'],
    mutationFn: () => logout(),
    onSuccess: async () => {
      router.push('/login')
    },
    onError: async err => {
      if (err.message === 'CONFLICT') {
        toast.error('User not found.', {
          autoClose: 3000,
          onClose: () => {
            toast.info('Redirecting to login page...', {
              autoClose: 2000,
              onClose: () => router.push('/login'),
            })
          },
        })
      }

      console.error('Something went wrong. Please try again.')
    },
  })

  const handleLogout = () => {
    logoutMutation()
  }

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground)
    return () => {
      window.removeEventListener('scroll', changeBackground)
    }
  }, [])

  const menuItems = [
    {
      title: 'MAIN',
      items: [
        {
          icon: 'flaticon-discovery',
          text: 'Dashboard',
          href: '/dashboard/home',
        },
        {
          icon: 'flaticon-chat-1',
          text: 'Message',
          href: '/dashboard/message',
        },
      ],
    },
    {
      title: 'MANAGE LISTINGS',
      items: [
        {
          icon: 'flaticon-new-tab',
          text: 'Add New Property',
          href: '/dashboard/add-property',
        },
        {
          icon: 'flaticon-home',
          text: 'My Properties',
          href: '/dashboard/my-properties',
        },
        {
          icon: 'flaticon-like',
          text: 'My Favorites',
          href: '/dashboard/my-favourites',
        },
        {
          icon: 'flaticon-search-2',
          text: 'Saved Search',
          href: '/dashboard/saved-search',
        },
        {
          icon: 'flaticon-review',
          text: 'Reviews',
          href: '/dashboard/review',
        },
      ],
    },
    {
      title: 'MANAGE ACCOUNT',
      items: [
        {
          icon: 'flaticon-protection',
          text: 'My Package',
          href: '/dashboard/my-package',
        },
        {
          icon: 'flaticon-user',
          text: 'My Profile',
          href: '/dashboard/my-profile',
        },
        //{ icon: 'flaticon-exit', text: 'Logout', href: '/login' },
      ],
    },
  ]

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? 'sticky slideInDown animated' : ''
        }`}>
        <nav className='posr'>
          <div className='container posr menu_bdrt1'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='logos mr40'>
                    <Link className='header-logo logo1' href='/'>
                      <Image
                        width={138}
                        height={44}
                        src='/images/header-logo2.svg'
                        alt='Header Logo'
                      />
                    </Link>
                    <Link className='header-logo logo2' href='/'>
                      <Image
                        width={138}
                        height={44}
                        src='/images/header-logo2.svg'
                        alt='Header Logo'
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className='col-auto'>
                <div className='d-flex align-items-center'>
                  {status !== 'loggedIn' ? (
                    <a
                      href='/login'
                      className='login-info d-flex align-items-center'
                      role='button'>
                      <i className='far fa-user-circle fz16 me-2' />{' '}
                      <span className='d-none d-xl-block'>
                        Login / Register
                      </span>
                    </a>
                  ) : (
                    <>
                      <Link
                        className='ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4'
                        href='/dashboard/add-property'>
                        Add Property
                        <i className='fal fa-arrow-right-long' />
                      </Link>
                      <>
                        <div className='mr10 text-center text-lg-end header_right_widgets'>
                          <ul className='mb0 d-flex justify-content-center justify-content-sm-end p-0'>
                            <li className=' user_setting'>
                              <div className='dropdown'>
                                <div className='btn' data-bs-toggle='dropdown'>
                                  <Image
                                    width={44}
                                    height={44}
                                    src={
                                      ((user?.profile_pic as Media)?.sizes
                                        ?.userProfileCircleImage
                                        ?.url as string) ||
                                      '/images/resource/user.png'
                                    }
                                    style={{ borderRadius: '50%' }}
                                    alt='user.png'
                                  />
                                </div>
                                <div className='dropdown-menu'>
                                  <div className='user_setting_content'>
                                    {menuItems.map((section, sectionIndex) => (
                                      <div key={sectionIndex}>
                                        <p
                                          className={`fz15 fw400 ff-heading ${
                                            sectionIndex === 0 ? 'mb20' : 'mt30'
                                          }`}>
                                          {section.title}
                                        </p>
                                        {section.items.map(
                                          (item, itemIndex) => (
                                            <Link
                                              key={itemIndex}
                                              className={`dropdown-item ${
                                                pathname == item.href
                                                  ? '-is-active'
                                                  : ''
                                              } `}
                                              href={item.href}>
                                              <i
                                                className={`${item.icon} mr10`}
                                              />
                                              {item.text}
                                            </Link>
                                          ),
                                        )}
                                      </div>
                                    ))}
                                    <div onClick={handleLogout}>
                                      <Link className='dropdown-item' href='#'>
                                        <i className='flaticon-logout mr10' />
                                        Logouttt
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </>
                    </>
                  )}
                  {/* <a
                    className='sidemenu-btn filter-btn-right'
                    href='#'
                    data-bs-toggle='offcanvas'
                    data-bs-target='#SidebarPanel'
                    aria-controls='SidebarPanelLabel'>
                    <Image
                      width={25}
                      height={9}
                      className='img-1'
                      src='/images/dark-nav-icon.svg'
                      alt='humberger menu'
                    />
                    <Image
                      width={25}
                      height={9}
                      className='img-2'
                      src='/images/dark-nav-icon.svg'
                      alt='humberger menu'
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className='signup-modal'>
        <div
          className='modal fade'
          id='loginSignupModal'
          tabIndex={-1}
          aria-labelledby='loginSignupModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog  modal-dialog-scrollable modal-dialog-centered'>
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className='offcanvas offcanvas-end'
        tabIndex={-1}
        id='SidebarPanel'
        aria-labelledby='SidebarPanelLabel'>
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  )
}

export default DefaultHeader
