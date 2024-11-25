'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db as prisma } from '@/lib/db'
import { currentUser } from '@/lib/auth'

// Define a schema for booking input validation
const BookingSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  guests: z.number().int().positive(),
  telNumber: z.string(),
  hostelId: z.string().uuid(),
})

export async function createBooking(formData: FormData) {
  const validatedFields = BookingSchema.safeParse({
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    guests: Number(formData.get('guests')),
    telNumber: formData.get('telNumber'),
    hostelId: formData.get('hostelId'),
  })

  const user = await currentUser()

  if (!validatedFields.success) {
    return { error: 'Please fill in a valid telephone number' }
  }

  const { startDate, endDate, guests, hostelId,telNumber } = validatedFields.data

  try {
    // Calculate total price (this is a simplified example)
    const hostel = await prisma.hostel.findUnique({ where: { id: hostelId } })
    if (!hostel) {
      return { error: 'Hostel not found' }
    }
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    const totalPrice = hostel.price * nights * guests

    const booking = await prisma.booking.create({
      data: {
        startDate,
        endDate,
        userId: user?.id as string,
        guests,
        telNumber,
        totalPrice,
        hostelId,
      },
    })

    return { booking }
  } catch (error) {
    return { error: 'Failed to create booking' }
  }
}

export async function getBooking(id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { hostel: true },
    })
    return { booking }
  } catch (error) {
    return { error: 'Failed to fetch booking' }
  }
}

export async function updateBooking(id: string, formData: FormData) {
  const validatedFields = BookingSchema.partial().safeParse({
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    guests: Number(formData.get('guests')),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid input' }
  }

  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: validatedFields.data,
    })

    revalidatePath('/bookings')
    return { booking }
  } catch (error) {
    return { error: 'Failed to update booking' }
  }
}

export async function deleteBooking(id: string) {
  try {
    await prisma.booking.delete({ where: { id } })
    revalidatePath('/bookings')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete booking' }
  }
}

export async function getUserBookings() {
    const user = await currentUser()
  try {
    const bookings = await prisma.booking.findMany({
      where: { 
        userId: user?.id
    },
      include: { hostel: true },
      orderBy: { startDate: 'desc' },
    })
    return  {bookings} 
  } catch (error) {
    return { error: 'Failed to fetch user bookings' }
  }
}

export async function getUserBookingsByHostelId({hostelId}:{
  hostelId:string| undefined
}) {
  const user = await currentUser()
  try {
    const bookings = await prisma.booking.findFirst({
      where: { 
        userId: user?.id,
        hostelId
    },

      include: { hostel: true },
      orderBy: { startDate: 'desc' },
    })
    return { bookings }
  } catch (error) {
    return { error: 'Failed to fetch user bookings' }
  }
}

