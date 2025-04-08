import React from 'react'
import LandingPage from './_component/HomePage'
import { getHostels } from '@/actions/hostels'

interface SearchPageProps {
  searchParams: {
    title: string;
  }
}

const HomePage = async({
  searchParams
}:SearchPageProps) => {
  const params = await searchParams 
   

  
  const hostels = await getHostels({
    title: params.title 
  })
  return (
    <LandingPage
    hostels={hostels}
    />
  )
}

export default HomePage