"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  MapPin, Calendar } from 'lucide-react'
import { Amenity, Hostel, Image } from '@prisma/client'
import { SearchInput } from './search-input'


interface HostelWithRelations extends Hostel {
    images: Image[];
    amenities: Amenity[];
  }
  export default function LandingPage({
    hostels,
  }: {
    hostels: HostelWithRelations[];
  }) {
   
   
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center" style={{backgroundImage: 'url("https://png.pngtree.com/background/20230611/original/pngtree-bunk-beds-and-a-window-in-a-green-room-picture-image_3130749.jpg")'}}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Find Your Perfect Hostel
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Discover unique hostels worldwide. Book your adventure today!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <SearchInput/>
              </div>
            </div>
          </div>
        </section>
        <section id="featured" className="w-full dark:bg-primary-foreground py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center dark:text-white mb-12">Featured Hostels</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                      <span className="text-sm text-gray-500">Available Now</span>
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
        </section>
        <section id="about" className="w-full dark:bg-primary py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About HostelWorld</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  HostelWorld connects travelers with unique and affordable accommodations worldwide. Our platform makes it easy to discover, compare, and book hostels for your next adventure.
                </p>
              </div>
              <div className="mx-auto max-w-sm space-y-4">
                <Card className=''>
                  <CardHeader>
                    <CardTitle>Why Choose Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Wide selection of hostels</li>
                      <li>Verified guest reviews</li>
                      <li>Secure booking process</li>
                      <li>24/7 customer support</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 dark:bg-primary-foreground sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 HostelWorld. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

