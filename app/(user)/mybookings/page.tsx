
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { format } from "date-fns"
import { redirect } from "next/navigation"


export default async function MyBookingsPage() {
  const user = await currentUser()

  if(!user){
    redirect("/auth/login")
  }
  const bookings = await db.booking.findMany({
    where: { 
      userId: user?.id
  },
    include: { hostel: true },
    orderBy: { startDate: 'desc' },
  })

  return (
    <div className="container min-h-screen dark:bg-primary-foreground mx-auto px-4 py-8">
      <h1 className="text-3xl dark:text-white font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="dark:text-white">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.hostel.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {booking.hostel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                <div className="bg-gray-100 dark:dark:bg-primary-foreground p-4 rounded-md">
            <p className="text-sm font-medium">Booking ID: {booking?.id}</p>
            <p className="text-xs text-gray-500 mt-1">Please save this number for your records.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Check-in</p>
                <p className="text-sm text-gray-500">{format(booking?.startDate  , "MMMM do, yyyy")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Check-out</p>
                <p className="text-sm text-gray-500">{format(booking?.endDate , "MMMM do, yyyy")}</p>
              </div>
            </div>
          </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{booking.guests} guests</span>
                  </div>
                
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Total Price:</span>
                    <span>Shs.{booking.hostel.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/hostel/${booking.hostel.id}`}>View Details</Link>
                </Button>
                
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

