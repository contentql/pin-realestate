import mobileMenuItems from '@/data/mobileMenuItems'
import { isParentActive } from '@/utilis/isMenuActive'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'

const ProSidebarContent = () => {
  const path = usePathname()

  return (
    <Sidebar width='100%' backgroundColor='#fff' className='my-custom-class'>
      <Menu>
        {mobileMenuItems.map((item: any, index: any) => (
          <SubMenu
            key={index}
            className={isParentActive(item.subMenu, path) ? 'active' : ''}
            label={item.label}
          >
            {item.subMenu.map((subItem: any, subIndex: any) =>
              subItem.subMenu ? (
                <SubMenu
                  key={subIndex}
                  label={subItem.label}
                  className={
                    isParentActive(subItem.subMenu, path) ? 'active' : ''
                  }
                >
                  {subItem.subMenu.map((nestedItem: any, nestedIndex: any) => (
                    <MenuItem
                      key={nestedIndex}
                      component={
                        <Link
                          className={nestedItem.path == path ? 'active' : ''}
                          href={nestedItem.path}
                        />
                      }
                    >
                      {nestedItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  key={subIndex}
                  component={
                    <Link
                      className={subItem.path == path ? 'active' : ''}
                      href={subItem.path}
                    />
                  }
                >
                  {subItem.label}
                </MenuItem>
              ),
            )}
          </SubMenu>
        ))}
      </Menu>
    </Sidebar>
  )
}

export default ProSidebarContent
