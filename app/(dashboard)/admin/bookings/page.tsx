
import { db } from '@/lib/db'
import { BookingsColumn } from './_components/columns'
import { format } from 'date-fns'
import { BookingsClient } from './_components/Client'


const page = async() => {
    const bookings = await db.booking.findMany({
        include: { hostel: true },
        orderBy: { startDate: 'desc' },
      })

      const formattedHostels: BookingsColumn[] = bookings.map((item) => ({
 id: item.id,
  name: item.hostel.name,
  price: item.hostel.price,
  location: item.hostel.location,
  startDate: format(item.startDate, "MMMM do, yyyy"),
  endDate: format(item.endDate, "MMMM do, yyyy"),
  telNumber: item.telNumber,
  guests: item.guests
}))
  return (
   
    <div className='flex-col'>
    <div className='flex-1 space-y-4 p-6 '>
    <BookingsClient
    data={formattedHostels}
    />
</div>
</div>
  )
}

export default page