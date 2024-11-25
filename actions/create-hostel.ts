'use server'

import { revalidatePath } from 'next/cache'
import { db as prisma } from '@/lib/db'

export async function createHostel(formData: FormData) {
  const name = formData.get('name') as string
  const location = formData.get('location') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const amenities = formData.getAll('amenities') as string[]
  const images = formData.getAll('images') as string[]

  if (!name || !location || !description || isNaN(price)) {
    return { error: 'Please fill in all required fields' }
  }

  try {
    const hostel = await prisma.hostel.create({
      data: {
        name,
        location,
        description,
        price,
        amenities: {
          create: amenities.map(name => ({ name }))
        },
        images: {
          create: images.map(url => ({ url }))
        }
      }
    })

    revalidatePath('/admin/hostels')
    return { success: true, hostelId: hostel.id }
  } catch (error) {
    console.error('Failed to create hostel:', error)
    return { error: 'Failed to create hostel. Please try again.' }
  }
}

