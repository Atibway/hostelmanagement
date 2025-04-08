import React from 'react'
import LandingPage from './_component/HomePage'
import { getHostels } from '@/actions/hostels'

interface SearchPageProps {
  searchParams: {
    title: string;
  }
}

const HomePage = async ({ searchParams }: SearchPageProps) => {
  // No need to await searchParams since it's already an object.
  const hostels = await getHostels({
    title: searchParams.title
  });
  
  return (
    <LandingPage hostels={hostels} />
  );
}

export default HomePage;