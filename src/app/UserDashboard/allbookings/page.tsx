import DefaultLayout from '@/src/components/User/Layouts/DefaultLaout'
import BookingPage from '@/src/components/User/BookinStats'
import React from 'react'
import Breadcrumb from '@/src/components/User/Breadcrumbs/Breadcrumb'
function page() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bookings" />

      <BookingPage/>

    </DefaultLayout>
  )
}

export default page