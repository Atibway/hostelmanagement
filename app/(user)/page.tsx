import React from 'react'
import LandingPage from './_component/HomePage'
import { getHostels } from '@/actions/hostels'

const HomePage = async() => {
  const hostels = await getHostels()
  return (
    <LandingPage
    hostels={hostels}
    />
  )
}

export default HomePage