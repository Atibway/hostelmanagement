import Link from 'next/link'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {  MapPin,  Calendar } from 'lucide-react'
import { db } from '@/lib/db'

// Mock data for hostels


export default async function HostelsPage() {
    const hostels = await db.hostel.findMany({
        include: { images: true, amenities: true },
      })
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold dark:text-white mb-6"> Hostels Available</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hostels.map((hostel) => (
                <Card key={hostel.id}>
                  <CardHeader>
                    <img src={hostel?.images?.[0]?.url} alt={hostel.name} className="w-full h-48 object-cover rounded-t-lg" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{hostel.name}</CardTitle>
                    <div className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm text-gray-500">{hostel.location}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm text-gray-500 dark:text-white">Available Now</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p className="text-lg font-bold">Shs.{hostel.price} <span className='text-sm text-muted-foreground'>/Semester</span></p>
                    <Link
                    href={`/hostel/${hostel.id}`}
                    >
                    <Button>Book Now</Button>
                    </Link>
                    
                  </CardFooter>
                </Card>
              ))}
      </div>
    </div>
  )
}

