"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

// Mock data for user bookings
const mockBookings = [
  {
    id: '1',
    hostelName: 'Sunflower Hostel',
    location: 'Berlin, Germany',
    checkIn: '2023-12-01',
    checkOut: '2023-12-05',
    guests: 2,
    status: 'Confirmed',
    totalPrice: 100,
  },
  {
    id: '2',
    hostelName: 'Beachside Bunk',
    location: 'Barcelona, Spain',
    checkIn: '2024-01-15',
    checkOut: '2024-01-20',
    guests: 1,
    status: 'Pending',
    totalPrice: 150,
  },
  {
    id: '3',
    hostelName: 'Mountain View Lodge',
    location: 'Interlaken, Switzerland',
    checkIn: '2024-02-10',
    checkOut: '2024-02-15',
    guests: 3,
    status: 'Cancelled',
    totalPrice: 200,
  },
]

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings)

  useEffect(() => {
    // In a real application, you would fetch the user's bookings here
    // For now, we'll just use the mock data
    setBookings(mockBookings)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'cancelled':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }}

  return (
    <div className="container min-h-screen dark:bg-primary-foreground mx-auto px-4 py-8">
      <h1 className="text-3xl dark:text-white font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.hostelName}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {booking.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {booking.checkIn} to {booking.checkOut}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{booking.guests} guests</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Status:</span>
                    <span className={getStatusColor(booking.status)}>{booking.status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Total Price:</span>
                    <span>€{booking.totalPrice}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/hostel/${booking.id}`}>View Details</Link>
                </Button>
                {booking.status.toLowerCase() !== 'cancelled' && (
                  <Button variant="destructive">Cancel Booking</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

