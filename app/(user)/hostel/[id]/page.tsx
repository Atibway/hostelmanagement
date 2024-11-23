"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BedDouble, Wifi, Coffee, Users } from 'lucide-react'

// This would normally come from a database or API
const hostelData = {
  id: '1',
  name: 'Sunflower Hostel',
  location: 'Berlin, Germany',
  description: 'Sunflower Hostel is a vibrant and friendly place located in the heart of Berlin. We offer comfortable accommodations, a fun atmosphere, and easy access to the city\'s main attractions.',
  price: 25,
  rating: 4.5,
  amenities: ['Free Wi-Fi', 'Communal Kitchen', '24/7 Reception', 'Lounge Area'],
  images: [
    'https://th.bing.com/th/id/R.98d8d625eb4b91165da6856c8df3c33f?rik=gNpq2LxaerHo%2fA&pid=ImgRaw&r=0',
    'https://www.askiitians.com/blog/wp-content/uploads/2014/08/MG_0286.jpg',
    'https://th.bing.com/th/id/R.db9d1d3fa268d30d6319986935172fb2?rik=8EJh1ZTbb2ChbA&riu=http%3a%2f%2fimages.jdmagicbox.com%2fcomp%2fthanjavur%2ff5%2f9999p4362.4362.171210121517.i9f5%2fcatalogue%2fvijayam-ladies-hostel-rajah-serfoji-government-college-thanjavur-hostels-for-women-8zpws.jpg&ehk=dXhh40KVBSa6qoMZWcGhV23dN6uZrcuNJZqOlPoDDj0%3d&risl=&pid=ImgRaw&r=0'
  ]
}

export default function HostelBookingPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [guests, setGuests] = useState(1)
  const router = useRouter()

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', { startDate, endDate, guests })
    // Redirect to a confirmation page (you'll need to create this page)
    router.push('/hostel/34/booking-confirmation')
  }

  return (
    <div className="container dark:bg-primary-foreground mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl text-white font-bold mb-4">{hostelData.name}</h1>
          <p className="text-gray-600 mb-4">{hostelData.location}</p>
          
          <Tabs defaultValue="photos" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>
            <TabsContent value="photos">
              <div className="grid grid-cols-2 gap-4">
                {hostelData.images.map((image, index) => (
                  <img key={index} src={image} alt={`${hostelData.name} - Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="amenities">
              <ul className="grid grid-cols-2 gap-2">
                {hostelData.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Wifi className="mr-2 h-4 w-4" />
                    {amenity}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="description">
              <p>{hostelData.description}</p>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
              <CardDescription>€{hostelData.price} per night</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBooking}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in</Label>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out">Check-out</Label>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
          
                    
 <Button className="w-full" onClick={handleBooking}>Book Now</Button>
                    
             
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

