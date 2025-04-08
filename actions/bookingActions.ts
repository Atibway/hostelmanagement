'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db, db as prisma } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import stripe from '@/lib/stripe'

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
        username: user?.name as string,
        telNumber,
        totalPrice,
        hostelId,
      },
    })


  

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
            quantity: 1,
            price_data: {
                currency: "UGX",
                product_data:{
                    name: hostel.name,
                    description: hostel.description!,
                },
                unit_amount: Math.round(hostel.price! * 100)
            }
        }
    ]

    let stripeCustomer = await db.stripeCustomer.findUnique({
        where:{
            userId: user?.id,
        },
        select:{
            stripeCustomerId: true
        }
    })

    if(!stripeCustomer){
        const customer = await stripe.customers.create({
            email: user?.email as string,
        })

        stripeCustomer = await db.stripeCustomer.create({
            data:{
                userId: user?.id as string,
                stripeCustomerId: customer.id
            }
        })
    }

    if (!stripeCustomer?.stripeCustomerId) {
        throw new Error('Stripe customer ID is undefined');
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/hostel/${hostel.id}/${booking.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/hostel/${hostel.id}?canceled=1`,
        metadata: {
            hostelId: hostel.id,
            userId: user?.id || '',
        },
    });

    return {url: session.url}
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
    revalidatePath('/mybookings')
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

