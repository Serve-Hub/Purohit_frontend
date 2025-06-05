import DefaultLayout from '@/src/components/pandit/Layouts/DefaultLaout'
import React from 'react'
import Breadcrumb from '@/src/components/pandit/Breadcrumbs/Breadcrumb'
import BookingPage from '@/src/components/pandit/BookinStats'
function page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bookings" />

      <BookingPage/>

    </DefaultLayout>
  )
}

export default page