"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Copy, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { AlertModal } from "@/components/modals/AlertModel";
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { deleteBooking } from "@/actions/bookingActions"

export type BookingsColumn = {
  id: string;
  name: string;
  price: number;
  location: string;
  startDate: string;
  endDate: string;
  hostelId: string;
  guests: number;
  username: string;
};

export default function MyBookingsComponent({
  data
}: {
  data: BookingsColumn[]
}) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Booking ID copied to clipboard");
  }

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteBooking(id)
      router.refresh();
      toast.success("Booking Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onPrint = (booking: BookingsColumn) => {
    const printableContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .receipt {
              border: 1px solid #ccc;
              padding: 20px;
              border-radius: 10px;
              max-width: 600px;
              margin: auto;
            }
            .receipt-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .receipt-header h1 {
              margin: 0;
              font-size: 24px;
            }
            .receipt-details {
              margin-bottom: 10px;
            }
            .receipt-details p {
              margin: 5px 0;
            }
            .receipt-footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="receipt-header">
              <h1>Booking Receipt</h1>
              <p>Thank you for your booking, ${booking.username}!</p>
            </div>
            <div class="receipt-details">
              <p><strong>Booking ID:</strong> ${booking.id}</p>
              <p><strong>Name:</strong> ${booking.name}</p>
              <p><strong>Location:</strong> ${booking.location}</p>
              <p><strong>Guests:</strong> ${booking.guests}</p>
              <p><strong>Check-in Date:</strong> ${booking.startDate}</p>
              <p><strong>Check-out Date:</strong> ${booking.endDate}</p>
              <p><strong>Total Price:</strong> Shs.${booking.price}</p>
            </div>
            <div class="receipt-footer">
              <p>Safe stay!</p>
            </div>
          </div>
        </body>
      </html>
    `;
    const newWindow = window.open("", "_blank");
    newWindow?.document.write(printableContent);
    newWindow?.print();
    newWindow?.close();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(id)}
        loading={loading}
      />
      <div className="container min-h-screen dark:bg-primary-foreground mx-auto px-4 py-8">
        <h1 className="text-3xl dark:text-white font-bold mb-6">My Bookings</h1>
        {data.length === 0 ? (
          <p className="dark:text-white">You have no bookings yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                  <CardTitle>{booking.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.location}
                  </CardDescription>
                    </div>
<div>
<Button onClick={() => onPrint(booking)}>Print Receipt</Button>
</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-gray-100 flex justify-between dark:bg-primary-foreground p-4 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Booking ID: {booking?.id}</p>
                        <p className="text-xs text-gray-300 mt-1">Please save this number for your records.</p>
                      </div>
                      <div
                        onClick={() => onCopy(booking?.id)} className="flex cursor-pointer  items-center ">
                        <Copy className="mr-2 h-4 w-4 " />
                        Copy
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Check-in</p>
                          <p className="text-sm text-gray-500">{booking?.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Check-out</p>
                          <p className="text-sm text-gray-500">{booking?.endDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{booking.guests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Total Price:</span>
                      <span>Shs.{booking.price}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/hostel/${booking.hostelId}`}>View Details</Link>
                  </Button>
                  <Button
                    onClick={() => {
                      setId(booking.id)
                      setOpen(true)
                    }}
                    variant="destructive">Cancel Booking</Button>
                 
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}