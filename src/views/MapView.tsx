import DefaultHeader from '@/components/common/DefaultHeader';
import MobileMenu from '@/components/common/mobile-menu';

import PropertyFilteringMapFour from '@/components/listing/map-style/map/PropertyFilteringMapFour';

export const metadata = {
  title: 'Map',
};

const Map = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* start  filter sidebar */}
      <PropertyFilteringMapFour />

      {/* Property Filtering */}
    </>
  );
};

export default Map;
