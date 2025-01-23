'use client';   
import EditProfile from '@/src/components/User/EditProfile'
import DefaultLayout from '@/src/components/User/Layouts/DefaultLaout'
import React from 'react'

function page() {
  return (
<DefaultLayout>

            <EditProfile/>
</DefaultLayout>

  )
}

export default page