'use client';

import React from 'react';
import Link from 'next/link';
import UserFilter from '@/src/components/User/UserFilter';
import AllPujas from '@/src/components/User/Allpujas';
import Breadcrumb from '@/src/components/User/Breadcrumbs/Breadcrumb';

// Breadcrumb Component Imports
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/src/components/ui/breadcrumb';

function ViewPuja() {
  return (
    <div className="mt-10 ">
      {/* Breadcrumb Navigation */}
      <div className="container">

      <Breadcrumb pageName='AllPujas'/>
      </div>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
            Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
             <BreadcrumbItem>
                       <BreadcrumbPage className="text-pandit">All pujas</BreadcrumbPage>
                     </BreadcrumbItem>
     
          
        </BreadcrumbList>
      </Breadcrumb> */}

      {/* Main Content: Filter and Puja Listings */}
      <div className=" mt-10">

          <AllPujas />
      
      </div>
    </div>
  );
}

export default ViewPuja;
