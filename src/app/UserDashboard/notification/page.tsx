'use client';
import DefaultLayout from '@/src/components/User/Layouts/DefaultLaout';
import NotificationFull from '@/src/components/User/NotificationFull'
import React from 'react'
import Breadcrumb from '@/src/components/User/Breadcrumbs/Breadcrumb';
function page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notification" />

        <NotificationFull/>
        
    </DefaultLayout>
  )
}

export default page