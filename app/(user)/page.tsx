import React from 'react'
import LandingPage from './_component/HomePage'
import { db } from '@/lib/db'

const HomePage = async() => {
  const hostels = await db.hostel.findMany({
    include: { images: true, amenities: true },
  })
  return (
    <LandingPage
    hostels={hostels}
    />
  )
}

export default HomePage