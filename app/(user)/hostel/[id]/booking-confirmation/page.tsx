"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Users, CreditCard, MapPin } from 'lucide-react'

// In a real application, this would come from your backend
const mockBookingData = {
  id: '1234567890',
  hostelName: 'Sunflower Hostel',
  location: 'Berlin, Germany',
  checkIn: '2023-12-01',
  checkOut: '2023-12-05',
  guests: 2,
  totalPrice: 100,
  currency: 'EUR'
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const [bookingData, setBookingData] = useState(mockBookingData)

  useEffect(() => {
    // In a real application, you would fetch the booking data here
    // using the booking ID from the URL parameters
    const bookingId = searchParams.get('id')
    console.log(`Fetching booking data for ID: ${bookingId}`)
    // For now, we'll just use the mock data
    setBookingData(mockBookingData)
  }, [searchParams])

  return (
    <div className="container dark:bg-primary-foreground  mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <CardTitle>Booking Confirmed</CardTitle>
          </div>
          <CardDescription>Your reservation has been successfully made.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <div>
              <h3 className="font-semibold">{bookingData.hostelName}</h3>
              <p className="text-sm text-gray-500">{bookingData.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Check-in</p>
                <p className="text-sm text-gray-500">{bookingData.checkIn}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Check-out</p>
                <p className="text-sm text-gray-500">{bookingData.checkOut}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500" />
            <p className="text-sm">{bookingData.guests} guests</p>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <p className="text-sm">Total: {bookingData.currency} {bookingData.totalPrice.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 dark:dark:bg-primary-foreground p-4 rounded-md">
            <p className="text-sm font-medium">Booking ID: {bookingData.id}</p>
            <p className="text-xs text-gray-500 mt-1">Please save this number for your records.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/my-bookings">View My Bookings</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

