'use client';
import Howitworks from '@/src/components/Howitworks'
import Team from '@/src/components/Team'
import Hnavbar from '@/src/components/User/Hnavbar'
import React from 'react'

function page() {
  return (
    <div>
      <Hnavbar/>
    <Howitworks/>
    <Team/>

    </div>
  )
}

export default page