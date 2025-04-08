
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"

import { redirect } from "next/navigation"
import MyBookingsComponent, { BookingsColumn } from "../_component/mybookings"
import { format } from "date-fns"


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

  const formattedBookings: BookingsColumn[] = bookings.map((item) => ({
    id: item.id,
     name: item.hostel.name,
     price: item.hostel.price,
     location: item.hostel.location,
     startDate: format(item.startDate, "MMMM do, yyyy"),
     endDate: format(item.endDate, "MMMM do, yyyy"),
     guests: item.guests,
     hostelId: item.hostel.id,
     username: item.username as string,
   }))

  return (
    <MyBookingsComponent
    data={formattedBookings}
    />
  )
}

