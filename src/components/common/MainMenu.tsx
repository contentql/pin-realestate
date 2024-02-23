import {
  blogItems,
  homeItems,
  listingItems,
  propertyItems,
} from '@/data/navItems';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState('');
  const [submenu, setSubmenu] = useState('');
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('home');
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split('/')[1] == pathname.split('/')[1]) {
        setTopMenu('blog');
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split('/')[1] == pathname.split('/')[1]) {
          setTopMenu('property');
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split('/')[1] == pathname.split('/')[1]) {
          setTopMenu('listing');
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link: any) => {
    if (link.split('/')[1] == pathname.split('/')[1]) {
      return 'menuActive';
    }
  };
  return (
    <ul className='ace-responsive-menu'>
      <li className='visible_list dropitem'>
        <a className='list-item' href='/'>
          <span className={topMenu == 'home' ? 'title menuActive' : 'title'}>
            Home
          </span>
        </a>
        {/* Level Two*/}
      </li>
      {/* End homeItems */}

      <li className='megamenu_style dropitem'>
        <a className='list-item' href='/properties'>
          <span className={topMenu == 'listing' ? 'title menuActive' : 'title'}>
            Properties
          </span>
        </a>
      </li>
      {/* End listings */}

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "blog" ? "title menuActive" : "title"}>
            Blog
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {blogItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      End blog Items */}

      <li className='megamenu_style dropitem'>
        <a className='list-item' href='/about'>
          <span className={topMenu == 'listing' ? 'title menuActive' : 'title'}>
            About
          </span>
        </a>
      </li>

      <li className='megamenu_style dropitem'>
        <a className='list-item' href='/contact'>
          <span className={topMenu == 'listing' ? 'title menuActive' : 'title'}>
            Contact
          </span>
        </a>
      </li>

      {/* <li className='visible_list dropitem'>
        <a className='list-item' href='#'>
          <span className={topMenu == 'pages' ? 'title menuActive' : 'title'}>
            Pages
          </span>
          <span className='arrow'></span>
        </a>
        <ul className='sub-menu'>
          {pageItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End pages Items */}
    </ul>
  );
};

export default MainMenu;
