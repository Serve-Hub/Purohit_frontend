'use client';
import DefaultLayout from '@/src/components/pandit/Layouts/DefaultLaout';
import React from 'react'
import Breadcrumb from '@/src/components/pandit/Breadcrumbs/Breadcrumb';
import PanditPersonalProfile from '@/src/components/pandit/PanditPersonalProfile';
function page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
<PanditPersonalProfile/>
        
    </DefaultLayout>
  )
}

export default page