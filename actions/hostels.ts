"use server";

import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

import { cache } from 'react'; // Cache function from React


// Caching the function using React's cache function
export const getHostels = cache(async () => {
  const hostels = await db.hostel.findMany({
    include: { images: true, amenities: true }, // Including related data
  });

  return hostels;
});


// export const getHostels = (async () => {
//   return await db.hostel.findMany({
//     include: { images: true, amenities: true }
//   })
// })