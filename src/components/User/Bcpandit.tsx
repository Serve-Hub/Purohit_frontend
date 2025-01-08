import React from 'react'
import Bctab from '../Bctab'

function Bcpandit() {
  return (
    <>
    <div className="container my-20 ">
    <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-pandit sm:text-5xl lg:text-balance">
            Want to Become a Pandit?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow through the detailed stepwise guidelines to become a verified pandit .What are you waiting for ?
          </p>
        </div>
<div className="flex gap-8 border ps-20">

      <img src="/img/cutepandit.png" alt="" className='w-1/2  object-contain border' />

<Bctab/>
</div>
    </div>
    </>
  )
}

export default Bcpandit