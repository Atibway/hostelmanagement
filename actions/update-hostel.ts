'use server'

import { revalidatePath } from 'next/cache'
import { db as prisma } from '@/lib/db'

export async function updateHostel(hostelId: string, formData: FormData) {
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
    await prisma.hostel.update({
      where: { id: hostelId },
      data: {
        name,
        location,
        description,
        price,
        amenities: {
          deleteMany: {},
          create: amenities.map(name => ({ name }))
        },
        images: {
          deleteMany: {},
          create: images.map(url => ({ url }))
        }
      }
    })

    revalidatePath('/admin/hostels')
    return { success: true }
  } catch (error) {
    console.error('Failed to update hostel:', error)
    return { error: 'Failed to update hostel. Please try again.' }
  }
}

