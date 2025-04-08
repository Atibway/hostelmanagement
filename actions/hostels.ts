"use server";

import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

import { cache } from 'react'; // Cache function from React


// Caching the function using React's cache function
export const getHostels = cache(async ({
  title
}:{
  title: string
}) => {
  const hostels = await db.hostel.findMany({
    where: {
      name: {
        contains: title, // Using 'contains' for partial matching
        mode: 'insensitive', // Case insensitive search
      },
    },
    include: { images: true, amenities: true }, // Including related data
  });

  return hostels;
});


// export const getHostels = (async () => {
//   return await db.hostel.findMany({
//     include: { images: true, amenities: true }
//   })
// })