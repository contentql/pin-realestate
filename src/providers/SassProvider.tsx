'use client';
import ScrollToTop from '@/components/common/ScrollTop';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { DM_Sans, Poppins } from 'next/font/google';
import { PropsWithChildren, useEffect } from 'react';
import '../../node_modules/react-modal-video/scss/modal-video.scss';
import '../../public/scss/main.scss';

if (typeof window !== 'undefined') {
  import('bootstrap');
}

// DM_Sans font
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--body-font-family',
});

// Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--title-font-family',
});

export default function SassProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <html lang='en'>
      <body
        className={`body  ${poppins.className} ${dmSans.className}`}
        cz-shortcut-listen='false'
      >
        <div className='wrapper ovh'>{children}</div>

        <ScrollToTop />
      </body>
    </html>
  );
}
