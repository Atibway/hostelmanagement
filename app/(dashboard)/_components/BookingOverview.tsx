"use client"

import { useAppContext } from "@/components/providers/app-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BookingOverview() {
  const { bookings, hostels, users, updateBooking } = useAppContext()

  const getHostelName = (hostelId: string) => {
    const hostel = hostels.find(h => h.id === hostelId)
    return hostel ? hostel.name : 'Unknown Hostel'
  }

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : 'Unknown User'
  }

  const handleStatusChange = (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    updateBooking(bookingId, { status: newStatus })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-semibold">{getHostelName(booking.hostelId)}</h3>
                    <p className="text-sm text-gray-500">Booked by: {getUserName(booking.userId)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={booking.status}
                      onValueChange={(value) => handleStatusChange(booking.id, value as 'pending' | 'confirmed' | 'cancelled')}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge>{booking.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

