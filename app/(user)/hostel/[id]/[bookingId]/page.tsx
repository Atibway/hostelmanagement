

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Users, CreditCard, MapPin } from 'lucide-react'
import { db } from '@/lib/db'
import { format } from 'date-fns'


export default async function BookingConfirmationPage(
  props:{
    params: Promise<{bookingId: string}>
  }
) {
  const params = await props.params;

  const booking = await db.booking.findUnique({
    where:{
      id: params.bookingId
    },
    include:{
      hostel: true
    }
  })

  const endDate = booking?.endDate as string | number | Date;
  const startDate = booking?.startDate as string | number | Date;
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
              <h3 className="font-semibold">{booking?.hostel.name}</h3>
              <p className="text-sm text-gray-500">{booking?.hostel.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Check-in</p>
                <p className="text-sm text-gray-500">{format(startDate  , "MMMM do, yyyy")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Check-out</p>
                <p className="text-sm text-gray-500">{format(endDate , "MMMM do, yyyy")}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-500" />
            <p className="text-sm">{booking?.guests} guests</p>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <p className="text-sm">Total: Shs.{booking?.hostel.price.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 dark:dark:bg-primary-foreground p-4 rounded-md">
            <p className="text-sm font-medium">Booking ID: {booking?.id}</p>
            <p className="text-xs text-gray-500 mt-1">Please save this number for your records.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/mybookings">View My Bookings</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

