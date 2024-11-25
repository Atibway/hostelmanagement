import React from 'react'

import {format} from "date-fns"
import ProductClient from './_components/Client'
import { db } from '@/lib/db'
import { HostelColumn } from './_components/columns'

const HostelsPage = async() => {
const hostels = await db.hostel.findMany({
   
    include: {
        amenities : true,
        images: true,
        bookings: true
    },
    orderBy: {
        createdAt: "desc"
    }
})

    const formattedHostels: HostelColumn[] = hostels.map((item) => ({
        id: item.id,
        name: item.name,
        location: item.location,
        price: item.price,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
}))
  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-6 '>
              <ProductClient
data={formattedHostels}
              />
</div>
    </div>
  )
}

export default HostelsPage

