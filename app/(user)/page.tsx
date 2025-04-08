import React from 'react'
import LandingPage from './_component/HomePage'
import { getHostels } from '@/actions/hostels'

type SearchParams = Promise<{ [key: string]: string  }>

const HomePage = async ({ searchParams }: {searchParams: SearchParams}) => {
  const { title } = await searchParams

  const hostels = await getHostels({
    title: title
  });
  
  return (
    <LandingPage hostels={hostels} />
  );
}

export default HomePage;