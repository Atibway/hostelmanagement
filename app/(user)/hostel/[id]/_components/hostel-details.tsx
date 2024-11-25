"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Wifi} from 'lucide-react'
import { createBooking } from '@/actions/bookingActions'
import { Amenity, Booking, Hostel, Image } from '@prisma/client'
import { useToast } from "@/hooks/use-toast"
import { useCurrentUser } from '@/hooks/use-current-user'


// This would normally come from a database or API
interface HostelDetailsProps extends Hostel {
    images: Image[];
    amenities: Amenity[];
  }
  


export default function HostelDetails({
    hostelData,
    HostelBookedByUserId
}:{
    hostelData: HostelDetailsProps;
    HostelBookedByUserId: string | undefined
}) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [guests, setGuests] = useState(1)
  const [telNumber, setTelNumber] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const user = useCurrentUser()


  const handleBooking = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('startDate', startDate?.toISOString() || '')
    formData.append('endDate', endDate?.toISOString() || '')
    formData.append('guests', guests.toString())
    formData.append('telNumber', telNumber)
    formData.append('hostelId', hostelData.id)
    if(!user){
      router.push("/auth/login")
      }else {
        if(telNumber.length < 10){
            toast({
                variant:"destructive",
                description: `tel number must be atleast 10 digits`,
            }) 
        } else {
            const result = await createBooking(formData)
            if (result.error) {
                toast({
                    variant:"destructive",
                    description: `${result.error}`,
                })
                console.error(result.error)
            } else {
                toast({
                    
                    description: `You Have Successfully booked ${hostelData.name}`,
                  })
              // Redirect to a confirmation page
              router.push(`/hostel/${hostelData.id}/${result.booking?.id}`)
            }
          }
      }
      
    
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl dark:text-white font-bold mb-4">{hostelData.name}</h1>
          <p className="text-gray-600 dark:text-white mb-4">{hostelData.location}</p>
          
          <Tabs defaultValue="photos" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
            </TabsList>
            <TabsContent value="photos">
              <div className="grid grid-cols-2 gap-4">
                {hostelData.images?.map((image, index) => (
                  <img key={index} src={image.url} alt={`${hostelData.name} - Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="amenities">
              <ul className="grid grid-cols-2 gap-2 dark:text-white">
                {hostelData.amenities?.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Wifi className="mr-2 h-4 w-4" />
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="description">
              <p className='dark:text-white'>{hostelData.description}</p>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
              <CardDescription>Shs.{hostelData.price} per Semester</CardDescription>
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
                  <div className="space-y-2">
                    <Label htmlFor="guests">Tel Number</Label>
                    <Input
                      id="telNumber"
                      type="number"
                
                      value={telNumber}
                      onChange={(e) => setTelNumber(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              {!user? (
                <Button
                onClick={handleBooking} 
                >
Login To Book
                </Button>
              ):(
                <>
{hostelData.id === HostelBookedByUserId? (
<Button variant={"destructive"}>You Already Booked It</Button>
              ):(
              <Button className="w-full" onClick={handleBooking}>Book Now</Button>
              )}
                </>
              )}
              
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

